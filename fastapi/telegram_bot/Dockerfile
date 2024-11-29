# Use an official Python runtime as the base image
FROM python:3.11-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt .

# Install the dependencies
RUN pip install --no-cache-dir -r requirements.txt



# Copy the rest of the application files
COPY . .

# Expose the port (optional, for local testing with a webhook setup)
EXPOSE 8080

# Command to run the application
CMD ["python", "telegram_aibot.py"]