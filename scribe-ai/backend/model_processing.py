import whisper
import tempfile
import os

def process_audio_with_whisper(audio_content):
    """
    Process audio files using OpenAI's Whisper model.

    Args:
        audio_content (bytes): Bytes of the audio file.

    Returns:
        str: Transcribed text.
    """
    # Create a temporary file to save the audio content
    with tempfile.NamedTemporaryFile(delete=False, suffix='.mp3') as temp_audio:
        temp_audio.write(audio_content)
        temp_audio_path = temp_audio.name

    try:
        whisper_model = whisper.load_model("base")
        transcript = whisper_model.transcribe(temp_audio_path)
        return transcript["text"]
    finally:
        # Ensure the temporary file is deleted
        os.unlink(temp_audio_path)

def process_video_with_whisper(video_content):
    """
    Process video files using OpenAI's Whisper model for transcription.

    Args:
        video_content (bytes): Bytes of the video file.

    Returns:
        str: Transcribed text.
    """
    # Create a temporary file to save the video content
    with tempfile.NamedTemporaryFile(delete=False, suffix='.mp4') as temp_video:
        temp_video.write(video_content)
        temp_video_path = temp_video.name

    try:
        whisper_model = whisper.load_model("base")
        transcript = whisper_model.transcribe(temp_video_path)
        return transcript["text"]
    finally:
        # Ensure the temporary file is deleted
        os.unlink(temp_video_path)