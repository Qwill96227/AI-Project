from fastapi import FastAPI, Body, Request
from fastapi.middleware.cors import CORSMiddleware
import firebase_admin
from firebase_admin import credentials, initialize_app
from firebase_admin import firestore
from firebase_admin import auth

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
        user_record = await auth.create_user(email=email, password=password)

        # Store user data in Firestore
        user_doc = db.collection("users").document(user_record.uid)
        await user_doc.set({
            "username": username,
            "email": email,
            "uid": user_record.uid
        })

        return {"message": "User registered successfully"}
    except auth.AuthError as e:
        return {"error": f"Firebase Authentication error: {e.code}"}
    except Exception as e:
        return {"error": f"Error registering user: {str(e)}"}

@app.get("/users/{uid}")
async def get_user(uid: str):
    # Retrieve user data from Firestore
    doc_ref = db.collection('users').document(uid)
    doc = doc_ref.get()
    if doc.exists:
        return doc.to_dict()
    else:
        return {"error": "User not found"}