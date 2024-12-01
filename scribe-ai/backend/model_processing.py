import whisper
from io import BytesIO

def process_audio_with_whisper(audio_content):
    """
    Process audio files using OpenAI's Whisper model.

    Args:
        audio_content (bytes): Bytes of the audio file.

    Returns:
        str: Transcribed text.
    """
    whisper_model = whisper.load_model("base")
    transcript = whisper_model.transcribe(audio_content)
    return transcript["text"]

def process_video_with_whisper(video_content):
    """
    Process video files using OpenAI's Whisper model for transcription.

    Args:
        video_content (bytes): Bytes of the video file.

    Returns:
        str: Transcribed text.
    """
    whisper_model = whisper.load_model("base")
    result = whisper_model.transcribe(BytesIO(video_content))
    return result["text"]