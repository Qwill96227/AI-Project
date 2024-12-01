from fastapi import FastAPI, Body, Request
from fastapi.middleware.cors import CORSMiddleware
import firebase_admin
from file_handling import upload_multimedia_file
from firebase_admin import credentials, initialize_app
from firebase_admin import firestore
from firebase_admin import auth
from jose import jwt

# Initialize the Firebase Admin SDK
cred = credentials.Certificate(r'C:\Users\qwill\Downloads\scribe-ai-fe9d2-firebase-adminsdk-gnevq-85fd73a6da.json')
firebase_admin.initialize_app(cred, {
    'projectId': 'scribe-ai-fe9d2',
})

db = firestore.client()

app = FastAPI()

# CORS Middleware to allow frontend connections
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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

        # Decode the Firebase ID token
        decoded_token = await auth.verify_id_token(id_token)
        user_uid = decoded_token["user_id"]  # Correctly access the user ID

        # Create user in Firestore
        user_doc = db.collection("users").document(user_uid)
        await user_doc.set({
            "username": data.get("username"),
            "email": data.get("email"),
            "uid": user_uid
        })

        return {"message": "User registered successfully"}
    except Exception as e:
        return {"error": str(e)}

@app.get("/users/{uid}")
async def get_user(uid: str):
    # Retrieve user data from Firestore
    doc_ref = db.collection('users').document(uid)
    doc = await doc_ref.get()
    if doc.exists:
        return doc.to_dict()
    else:
        return {"error": "User not found"}
