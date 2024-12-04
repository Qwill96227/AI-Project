import whisper
import os
import asyncio
import aiofiles
from functools import lru_cache
from concurrent.futures import ThreadPoolExecutor

# Global thread pool for CPU-bound tasks
transcription_executor = ThreadPoolExecutor(max_workers=2 * os.cpu_count())  # Increased pool size

# Define maximum file size (e.g., 10 MB)
MAX_FILE_SIZE = 10 * 1024 * 1024  

@lru_cache(maxsize=1)
def load_whisper_model(model_size="base"):
    """
    Cached model loading to prevent repeated model initialization
    """
    print("Loading Whisper model...")  # Debug log for model loading
    return whisper.load_model(model_size)

async def process_audio_with_whisper(audio_content, model_size="base"):
    """
    Asynchronous audio processing with improved performance
    
    Args:
        audio_content (bytes): Bytes of the audio file
        model_size (str): Whisper model size (default: "base")
    
    Returns:
        str: Transcribed text
    """
    if len(audio_content) > MAX_FILE_SIZE:
        raise RuntimeError("File too large. Maximum allowed size is 10 MB.")  # File size check

    temp_audio_path = None
    try:
        # Async temp file creation
        async with aiofiles.tempfile.NamedTemporaryFile(delete=False, suffix='.wav') as temp_audio:
            await temp_audio.write(audio_content)
            temp_audio_path = temp_audio.name
        print(f"Temporary audio file created at: {temp_audio_path}")  # Debug log

        # Use thread pool for CPU-intensive transcription
        def transcribe_sync():
            print("Starting transcription...")  # Debug log
            model = load_whisper_model(model_size)
            return model.transcribe(temp_audio_path)

        # Run transcription in a separate thread
        transcript_result = await asyncio.to_thread(transcribe_sync)
        print("Transcription completed.")  # Debug log
        
        return transcript_result["text"]
    
    except Exception as e:
        print(f"Error during Whisper transcription: {str(e)}")  # Error log
        raise RuntimeError(f"Whisper transcription failed: {str(e)}")
    
    finally:
        # Ensure temp file cleanup
        if temp_audio_path and os.path.exists(temp_audio_path):
            os.unlink(temp_audio_path)
            print(f"Temporary file deleted: {temp_audio_path}")  # Debug log

async def process_video_with_whisper(video_content, model_size="base"):
    """
    Asynchronous video processing with improved performance
    
    Args:
        video_content (bytes): Bytes of the video file
        model_size (str): Whisper model size (default: "base")
    
    Returns:
        str: Transcribed text
    """
    if len(video_content) > MAX_FILE_SIZE:
        raise RuntimeError("File too large. Maximum allowed size is 10 MB.")  # File size check

    temp_video_path = None
    try:
        # Async temp file creation
        async with aiofiles.tempfile.NamedTemporaryFile(delete=False, suffix='.mp4') as temp_video:
            await temp_video.write(video_content)
            temp_video_path = temp_video.name
        print(f"Temporary video file created at: {temp_video_path}")  # Debug log

        # Use thread pool for CPU-intensive transcription
        def transcribe_sync():
            print("Starting transcription...")  # Debug log
            model = load_whisper_model(model_size)
            return model.transcribe(temp_video_path)

        # Run transcription in a separate thread
        transcript_result = await asyncio.to_thread(transcribe_sync)
        print("Transcription completed.")  # Debug log
        
        return transcript_result["text"]
    
    except Exception as e:
        print(f"Error during Whisper video transcription: {str(e)}")  # Error log
        raise RuntimeError(f"Whisper video transcription failed: {str(e)}")
    
    finally:
        # Ensure temp file cleanup
        if temp_video_path and os.path.exists(temp_video_path):
            os.unlink(temp_video_path)
            print(f"Temporary file deleted: {temp_video_path}")  # Debug log
