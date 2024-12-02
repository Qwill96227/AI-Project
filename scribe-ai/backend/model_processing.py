import whisper
import os
import aiofiles  # For asynchronous file operations

async def process_audio_with_whisper(audio_content):
    """
    Process audio files using OpenAI's Whisper model.

    Args:
        audio_content (bytes): Bytes of the audio file.

    Returns:
        str: Transcribed text.
    """
    temp_audio_path = None
    try:
        # Asynchronously write the audio content to a temporary file
        async with aiofiles.tempfile.NamedTemporaryFile(delete=False, suffix='.mp3') as temp_audio:
            await temp_audio.write(audio_content)
            temp_audio_path = temp_audio.name

        # Load Whisper model and transcribe
        whisper_model = whisper.load_model("base")
        transcript = whisper_model.transcribe(temp_audio_path)
        return transcript["text"]
    finally:
        # Ensure the temporary file is deleted
        if temp_audio_path and os.path.exists(temp_audio_path):
            os.unlink(temp_audio_path)

async def process_video_with_whisper(video_content):
    """
    Process video files using OpenAI's Whisper model for transcription.

    Args:
        video_content (bytes): Bytes of the video file.

    Returns:
        str: Transcribed text.
    """
    temp_video_path = None
    try:
        # Asynchronously write the video content to a temporary file
        async with aiofiles.tempfile.NamedTemporaryFile(delete=False, suffix='.mp4') as temp_video:
            await temp_video.write(video_content)
            temp_video_path = temp_video.name

        # Load Whisper model and transcribe
        whisper_model = whisper.load_model("base")
        transcript = whisper_model.transcribe(temp_video_path)
        return transcript["text"]
    finally:
        # Ensure the temporary file is deleted
        if temp_video_path and os.path.exists(temp_video_path):
            os.unlink(temp_video_path)
