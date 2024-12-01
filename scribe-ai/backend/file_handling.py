from fastapi import UploadFile
from fastapi.exceptions import HTTPException
from model_processing import process_audio_with_whisper, process_video_with_whisper
from firestore_integration import store_transcript_in_firestore

async def upload_multimedia_file(file: UploadFile, model_type: str):
    """
    Handles file uploads and routes to appropriate model processing.

    Args:
        file: Uploaded multimedia file
        model_type: Specifies whether to use Whisper (audio/video)

    Returns:
        Processed text transcript
    """
    try:
        # Validate file type and size
        content = await file.read()
        file_extension = file.filename.split('.')[-1].lower()

        # Route to appropriate model based on file type and model_type
        if model_type == 'whisper':
            if file_extension in ['mp3', 'wav', 'm4a']:
                # Call audio processing
                transcript = await process_audio_with_whisper(content)
            elif file_extension in ['mp4', 'avi', 'mov']:
                # Call video processing
                transcript = await process_video_with_whisper(content)
            else:
                raise HTTPException(status_code=400, detail="Invalid file type")
        else:
            raise HTTPException(status_code=400, detail="Invalid model type")

        # Store transcript in Firestore
        await store_transcript_in_firestore(transcript)

        return transcript

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
