import os
import requests
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize FastAPI router
router = APIRouter()

# Define input schema
class CallRequest(BaseModel):
    number: str  # Recipient phone number


@router.post("/initiate-call")
async def initiate_call(request: CallRequest):
    """API to initiate a call via the Bolna API"""
    try:
        # Define API URL and payload
        url = "https://api.bolna.dev/call"
        payload = {
            "agent_id": os.getenv("agent_id"),
            "recipient_phone_number": request.number,

        }
        headers = {
            "Authorization": f"Bearer {os.getenv('bolna_api')}",
            "Content-Type": "application/json",
        }

        # Make the API call
        response = requests.post(url, json=payload, headers=headers)
        if response.status_code == 200:
            return {"message": "Call initiated successfully. It will be initiated soon."}
        elif response.status_code == 403:  # Assuming 403 indicates no tokens left
            return {"message": "No tokens left to initiate the call."}
        else:
            # Handle unexpected status codes
            return {"message": "Failed to initiate the call. Please try again later.", "details": response.text}

    except Exception as e:
        # Handle any exceptions that occur during the process
        raise HTTPException(status_code=500, detail=f"Error initiating call: {str(e)}")