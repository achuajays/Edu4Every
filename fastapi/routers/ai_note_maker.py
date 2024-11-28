import os
from fastapi import APIRouter, HTTPException, UploadFile, File
from fastapi.responses import JSONResponse
from groq import Groq
from dotenv import load_dotenv
import json

# Load environment variables
load_dotenv()

# Initialize the FastAPI router
router = APIRouter()

# Initialize the Groq client with API key from environment variables
client = Groq(api_key=os.getenv("groq_api"))

@router.post("/transcribe-and-summarize")
async def transcribe_and_summarize(file: UploadFile = File(...)):
    """API to upload an audio file, get a transcription using Groq, and generate a summary (topic and notes)"""
    try:
        # Save the uploaded audio file temporarily
        temp_filename = os.path.join(os.getcwd(), "temp_audio_file.m4a")
        with open(temp_filename, "wb") as temp_file:
            temp_file.write(await file.read())

        # Open the saved audio file and send it to Groq for transcription
        with open(temp_filename, "rb") as file:
            transcription = client.audio.transcriptions.create(
                file=(temp_filename, file.read()),  # Required audio file
                model="whisper-large-v3-turbo",  # Model to use for transcription
                prompt="Specify context or spelling",  # Optional
                response_format="json",  # Optional
                language="en",  # Optional
                temperature=0.0  # Optional
            )

        # Remove the temporary file after transcription
        os.remove(temp_filename)

        # Pass the transcription to the chat model for summarization
        chat_completion_notes = client.chat.completions.create(
            messages=[{
                "role": "user",
                "content": f"Please summarize the following transcription :\n{transcription.text}"
            }],
            model="llama3-8b-8192",  # Model for summarization
        )



        chat_completion_topic = client.chat.completions.create(
            messages=[{
                "role": "user",
                "content": f"Please give a suitable topic for the following notes:\n{transcription.text}.remember to give only topic not any supporting answers like 'Here is a suitable topic for the given notes:'`"
            }],
            model="llama3-8b-8192",  # Model for summarization
        )

        # Parse the response to JSON
        response_message_notes = chat_completion_notes.choices[0].message.content
        response_message_topic = chat_completion_topic.choices[0].message.content

        # Return the transcription and the generated summary
        return JSONResponse(content={"topic": response_message_topic.replace("\n", "").replace('\"', ""),
                                     "notes": response_message_notes.replace('\"', "")}, status_code=200)
    except Exception as e:
        # Handle errors during the transcription or chat completion process
        raise HTTPException(status_code=500, detail=f"Error during transcription or summarization: {str(e)}")
