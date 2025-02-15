from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import requests
import uvicorn
import os
import groq
from dotenv import load_dotenv

load_dotenv()

# Load API keys from environment variables
GROQ_API = os.getenv("GROQ_API")
DEVNAG_API = os.getenv("DEVNAG_API")
TRANSLATION_URL = "https://api.devnagri.com/machine-translation/v2/translate"

# Initialize FastAPI app
app = FastAPI()

# Initialize LLM client
client = groq.Client(api_key=GROQ_API)

# In-memory storage for chat histories (for demonstration purposes)
chat_histories = {}

# Define the request model for incoming chat messages
class ChatRequest(BaseModel):
    message: str
    session_id: str

@app.get("/")
async def root():
    return {"message": "Welcome to the Medical Chatbot API. Use /docs for API documentation."}

@app.post("/chat")
async def chat(request: ChatRequest):
    """
    This endpoint accepts a chat message from the client, maintains context using session_id,
    and returns the chatbot's response.
    """
    session_id = request.session_id

    # Initialize session if it doesn't exist
    if session_id not in chat_histories:
        chat_histories[session_id] = []

    # Retrieve chat history for the session
    memory = chat_histories[session_id]

    # Construct the LLM prompt using memory
    query = request.message
    messages = [{"role": "user", 
                "content": f"{query}, respond as a knowledgeable and friendly doctor in 5-6 lines, and questions. Use '*' to **bold** important details. No extra text."
}]
    
    if memory:
        # Add previous context to the prompt if available
        messages.insert(0, {"role": "assistant", "content": memory[-1]})

    try:
        # Call the LLM to generate a response
        chat_completion = client.chat.completions.create(
            messages=messages,
            model="llama-3.3-70b-versatile",
        )
        output = chat_completion.choices[0].message.content

        # Translate response to Hindi using Devnagri API
        # payload = {
        #     "key": DEVNAG_API,
        #     "sentence": output,
        #     "src_lang": "en",
        #     "dest_lang": "hi"
        # # }
        # translation_response = requests.post(TRANSLATION_URL, data=payload)
        # if translation_response.status_code == 200:
        #     translated_text = translation_response.json().get('translated_text', "Translation error")
        # else:
        #     translated_text = "Translation service is currently unavailable."

        # Generate a summary of the response (optional)
        summary_response = client.chat.completions.create(
            messages = [{
            "role": "user",
            "content":  f"Summarize the following response '{output}' in less than 5 lines, keeping all key points. "
            }],
            model = "llama-3.3-70b-versatile"
        )
        summary = summary_response.choices[0].message.content

        # Update memory with the new response
        memory.append(summary)
        chat_histories[session_id] = memory

        return {"translated_response": output, "summary": summary,"memory":memory}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Adjust based on frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    uvicorn.run("app:app", host="localhost", port=8000, reload=True)
