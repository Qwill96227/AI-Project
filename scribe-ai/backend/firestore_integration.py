from async_utils import run_async_firebase_op
from firebase_admin import firestore

async def store_transcript_in_firestore(transcript):
    """
    Store processed transcript in Firestore.

    Args:
        transcript (str): Processed text transcript.
    """
    db = firestore.client()
    doc_ref = db.collection('transcripts').document()
    
    await run_async_firebase_op(
        doc_ref.set, 
        {
            'text': transcript,
            'created_at': firestore.SERVER_TIMESTAMP
        }
    )