from fastapi import FastAPI, Body, Request
from fastapi.middleware.cors import CORSMiddleware
import firebase_admin
from firebase_admin import credentials, initialize_app
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

@app.post("/signup")
async def signup(request: Request):
    data = await request.json()
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    try:
        # Create new user in Firebase Authentication
        user = await auth.create_user_with_email_and_password(email, password)

        # Store user data in Firestore
        user_doc = db.collection("users").document(user["localId"])
        user_doc.set({
            "username": username,
            "email": email,
            "uid": user["localId"]
        })

        return {"message": "User registered successfully"}
    except Exception as e:
        return {"error": str(e)}

@app.get("/users/{uid}")
async def get_user(uid: str):
    # Retrieve user data from Firestore
    doc_ref = db.collection('users').document(uid)
    doc = doc_ref.get()
    if doc.exists:
        return doc.to_dict()
    else:
        return {"error": "User not found"}