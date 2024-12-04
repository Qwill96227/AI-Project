import io
import subprocess
import tempfile
from fastapi import UploadFile
from fastapi.exceptions import HTTPException
from model_processing import process_audio_with_whisper, process_video_with_whisper
from firestore_integration import store_transcript_in_firestore

async def convert_audio_for_whisper(content: bytes) -> bytes:
    """
    Convert audio to Whisper-compatible specifications using a temporary file.
    
    Args:
        content: Bytes of the original audio file
    
    Returns:
        Bytes of the converted audio file
    """
    # Create temporary input and output files
    with tempfile.NamedTemporaryFile(suffix='.wav', delete=False) as input_temp, \
         tempfile.NamedTemporaryFile(suffix='.wav', delete=False) as output_temp:
        
        try:
            # Write original content to input temp file
            input_temp.write(content)
            input_temp.flush()
            
            # FFmpeg conversion command
            ffmpeg_command = [
                'ffmpeg',
                '-i', input_temp.name,
                '-ar', '16000',     # 16 kHz sample rate
                '-ac', '1',          # Mono channel
                '-acodec', 'pcm_s16le',  # 16-bit linear PCM
                '-f', 'wav',         # WAV format
                output_temp.name
            ]
            
            # Run FFmpeg conversion
            result = subprocess.run(ffmpeg_command, capture_output=True, text=True)
            
            # Check for conversion errors
            if result.returncode != 0:
                raise Exception(f"Audio conversion failed: {result.stderr}")
            
            # Read converted file
            with open(output_temp.name, 'rb') as converted_file:
                return converted_file.read()
        
        finally:
            # Clean up temporary files
            import os
            os.unlink(input_temp.name)
            os.unlink(output_temp.name)

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
        # Read the uploaded file content asynchronously
        content = await file.read()
        file_extension = file.filename.split('.')[-1].lower()

        # Route to the appropriate model based on file type and model_type
        if model_type == 'whisper':
            if file_extension in ['mp3', 'wav', 'm4a']:
                # Convert audio to Whisper-compatible format
                converted_content = await convert_audio_for_whisper(content)
                # Call audio processing with converted content
                transcript = await process_audio_with_whisper(converted_content)
            elif file_extension in ['mp4', 'avi', 'mov']:
                # Call video processing
                transcript = await process_video_with_whisper(content)
            else:
                raise HTTPException(status_code=400, detail="Invalid file type")
        else:
            raise HTTPException(status_code=400, detail="Invalid model type")

        # Store transcript in Firestore asynchronously
        await store_transcript_in_firestore(transcript)

        return transcript

    except Exception as e:
        raise HTTPException(status_code=422, detail=str(e))