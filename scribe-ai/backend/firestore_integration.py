# firestore_integration.py
from firebase_admin import firestore

async def store_transcript_in_firestore(transcript):
    """
    Store processed transcript in Firestore.

    Args:
        transcript (str): Processed text transcript.
    """
    db = firestore.client()
    doc_ref = db.collection('transcripts').document()
    await doc_ref.set({
        'text': transcript,
        'created_at': firestore.SERVER_TIMESTAMP
    })