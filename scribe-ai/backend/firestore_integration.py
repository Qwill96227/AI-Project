# firestore_integration.py
from firebase_admin import firestore

def store_transcript_in_firestore(transcript):
    """
    Store processed transcript in Firestore document.
    
    Args:
        transcript: Processed text from Whisper or BLIP
    """
    db = firestore.client()
    db.collection('transcripts').add({
        'text': transcript,
        'created_at': firestore.SERVER_TIMESTAMP
    })