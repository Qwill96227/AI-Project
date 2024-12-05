from fastapi import FastAPI, Body, Request, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import firebase_admin
from firebase_admin import credentials, initialize_app
from firebase_admin import firestore
from firebase_admin import auth
from jose import jwt
from concurrent.futures import ThreadPoolExecutor
from async_utils import run_async_firebase_op
from file_handling import upload_multimedia_file
from model_processing import process_audio_with_whisper  # Import Whisper utility functions
import asyncio

# Initialize the Firebase Admin SDK
cred = credentials.Certificate(r'C:\Users\qwill\Downloads\scribe-ai-fe9d2-firebase-adminsdk-gnevq-ee66973f53.json')
firebase_admin.initialize_app(cred, {'projectId': 'scribe-ai-fe9d2'})

# Initialize Firestore client
db = firestore.client()

# FastAPI application
app = FastAPI()

# CORS Middleware to allow frontend connections
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def preload_whisper_model():
    """
    Preload Whisper model on application startup to improve response times.
    """
    print("Preloading Whisper model...")
    await asyncio.to_thread(process_audio_with_whisper, b"")  # Trigger model caching
    print("Whisper model preloaded successfully.")

@app.post("/upload")
async def upload_file(uploaded_file: UploadFile = None):
    """
    Endpoint to upload and process multimedia files.
    """
    if not uploaded_file:
        raise HTTPException(status_code=422, detail="File is required")

    try:
        # Validate file type
        allowed_types = ["audio/wav", "audio/mp3", "audio/mp4", "audio/m4a", "audio/x-m4a"]
        if uploaded_file.content_type not in allowed_types:
            raise HTTPException(status_code=400, detail=f"Invalid file type: {uploaded_file.content_type}")

        # Read file content
        audio_content = await uploaded_file.read()
        print(f"Received file: {uploaded_file.filename}, Type: {uploaded_file.content_type}")

        # Transcribe the file using Whisper
        transcript = await process_audio_with_whisper(audio_content)

        return {"status": "success", "transcript": transcript}
    
    except RuntimeError as e:
        # Handle file size or model errors
        print(f"Upload Error: {str(e)}")
        raise HTTPException(status_code=422, detail=f"Processing failed: {str(e)}")
    except Exception as e:
        # Handle any unexpected errors
        print(f"Unexpected Error: {type(e).__name__}, Details: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")

@app.get("/")
async def root():
    return {"message": "Welcome to ScribeAI Backend"}

@app.post("/signup")
async def signup(request: Request):
    try:
        data = await request.json()
        id_token = data.get("id_token")

        if not id_token:
            return {"error": "Missing id_token"}

        # Verify ID token using async-friendly approach
        decoded_token = await run_async_firebase_op(auth.verify_id_token, id_token)
        user_uid = decoded_token["user_id"]

        # Create user in Firestore using async-friendly approach
        user_data = {
            "username": data.get("username"),
            "email": data.get("email"),
            "uid": user_uid
        }
        await run_async_firebase_op(
            db.collection("users").document(user_uid).set, 
            user_data
        )

        return {"message": "User registered successfully"}
    except Exception as e:
        print(f"Signup error: {e}")
        return {"error": str(e)}

@app.get("/users/{uid}")
async def get_user(uid: str):
    try:
        # Retrieve user data from Firestore using async-friendly approach
        doc = await run_async_firebase_op(
            db.collection('users').document(uid).get
        )

        if doc.exists:
            return doc.to_dict()
        else:
            return {"error": "User not found"}
    except Exception as e:
        print(f"Get user error: {e}")
        return {"error": str(e)}    
