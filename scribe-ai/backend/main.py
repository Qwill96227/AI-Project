from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

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

@app.post("/register")
async def register_user(user: dict = Body(...)):
    # Create a new user document in Firestore
    doc_ref = db.collection('users').document(user['uid'])
    doc_ref.set(user)
    return {"message": "User registered successfully"}

@app.get("/users/{uid}")
async def get_user(uid: str):
    # Retrieve user data from Firestore
    doc_ref = db.collection('users').document(uid)
    doc = doc_ref.get()
    if doc.exists:
        return doc.to_dict()
    else:
        return {"error": "User not found"}