import os
import base64
from io import BytesIO
import requests
from dotenv import load_dotenv
from telegram import Update
from telegram.ext import ApplicationBuilder, CommandHandler, MessageHandler, filters, ContextTypes
from groq import Groq

# Load environment variables
load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")

# Initialize the Groq client
client = Groq(api_key=GROQ_API_KEY)


# Function to download and encode image from Telegram
async def download_and_encode_image(file_path):
    response = requests.get(file_path)
    return base64.b64encode(response.content).decode('utf-8')


# OpenAI function for getting responses (text-only queries)
async def get_openai_response(user_query):
    try:
        response = client.chat.completions.create(
            model="llama3-8b-8192",
            messages=[{"role": "user", "content": user_query}]
        )
        return response.choices[0].message.content
    except Exception as e:
        return "Sorry, I couldn't process that. Please try again later."


# OpenAI function for image analysis
async def analyze_image(base64_image, question="What is in this image?"):
    try:
        response = client.chat.completions.create(
            model="llama-3.2-11b-vision-preview",
            messages=[
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": question,
                        },
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:image/jpeg;base64,{base64_image}"
                            },
                        },
                    ],
                }
            ],
        )
        return response.choices[0].message.content
    except Exception as e:
        return "Sorry, I couldn't analyze the image. Please try again later."


# Function to transcribe audio using Groq
async def transcribe_audio_groq(file_path):
    try:
        # Open the audio file
        with open(file_path, "rb") as file:
            # Create a translation of the audio file
            translation = client.audio.translations.create(
                file=(file_path, file.read()),  # Required audio file
                model="whisper-large-v3",       # Specify the Whisper model
                prompt="Transcribe this audio accurately.",  # Optional prompt for context
                response_format="json",        # Response format
                temperature=0.0                # Temperature for deterministic results
            )
            # Return the transcription text
            return translation.text
    except Exception as e:
        print(f"Error during transcription: {e}")
        return "Sorry, I couldn't transcribe the audio."


# Start command handler
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text(
        "Hello! I am your AI assistant. "
        "You can:\n"
        "1. Send me any image to analyze\n"
        "2. Ask me questions about the image\n"
        "3. Ask any educational questions\n"
        "4. Send a voice message for transcription"
    )


# Help command handler
async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text(
        "Here's how to use this bot:\n"
        "- Send an image to get analysis\n"
        "- Send text questions about the image\n"
        "- Ask any educational questions\n"
        "- Send a voice message for transcription\n"
        "- Use /start to begin\n"
        "- Use /help to see this message"
    )


# Handle text messages
async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_chat_action(action="typing")

    # If we have a recent image in context, treat this as a question about the image
    if 'last_image' in context.user_data:
        response = await analyze_image(context.user_data['last_image'], update.message.text)
    else:
        response = await get_openai_response(update.message.text)

    await update.message.reply_text(response)


# Handle images
async def handle_photo(update: Update, context: ContextTypes.DEFAULT_TYPE):
    try:
        await update.message.reply_chat_action(action="typing")

        # Get the photo file
        photo = update.message.photo[-1]  # Get the largest photo size
        file = await context.bot.get_file(photo.file_id)

        # Download and encode the image
        base64_image = await download_and_encode_image(file.file_path)

        # Store the image in context for follow-up questions
        context.user_data['last_image'] = base64_image

        # Analyze the image
        response = await analyze_image(base64_image)

        await update.message.reply_text(response)
        await update.message.reply_text("You can ask me specific questions about this image!")

    except Exception as e:
        print(f"Error processing image: {e}")
        await update.message.reply_text("Sorry, I couldn't process that image. Please try again.")


# Handle voice messages
async def handle_voice(update: Update, context: ContextTypes.DEFAULT_TYPE):
    try:
        await update.message.reply_chat_action(action="typing")

        # Get the voice file
        voice = await update.message.voice.get_file()
        file_path = f"/tmp/{voice.file_id}.ogg"
        await voice.download_to_drive(file_path)

        # Convert audio to text using Groq
        transcription = await transcribe_audio_groq(file_path)

        answer = await get_openai_response(transcription)

        # Respond with transcription
        await update.message.reply_text(f"Question: {transcription} \nAnswer: {answer}")

    except Exception as e:
        print(f"Error processing voice message: {e}")
        await update.message.reply_text("Sorry, I couldn't process the voice message. Please try again.")


# Main function to set up the bot
def main():
    application = ApplicationBuilder().token(TELEGRAM_BOT_TOKEN).build()

    # Register handlers
    application.add_handler(CommandHandler("start", start))
    application.add_handler(CommandHandler("help", help_command))
    application.add_handler(MessageHandler(filters.PHOTO, handle_photo))
    application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))
    application.add_handler(MessageHandler(filters.VOICE, handle_voice))

    # Run the bot
    print("Bot is running...")
    application.run_polling()


if __name__ == "__main__":
    main()