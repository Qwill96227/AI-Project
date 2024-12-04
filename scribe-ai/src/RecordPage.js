import React, { useState, useRef } from 'react';
import { Loader2 } from 'lucide-react';

const RecordPage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [transcription, setTranscription] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });  // Change to wav
        setAudioBlob(audioBlob);
        audioChunksRef.current = [];
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      setError('Error accessing microphone');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleSubmit = async () => {
    if (!audioBlob) {
      setError('No audio recording available to submit.');
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setTranscription(null);

    try {
      const formData = new FormData();
      formData.append('uploaded_file', audioBlob, 'recording.wav');  // Change file name to .wav

      console.log('Submitting FormData:', formData);  // Debug log

      const response = await fetch('http://localhost:8000/upload', {
        method: 'POST',
        body: formData
      });

      console.log('Received response:', response);  // Debug log

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server error response:', errorText);
        setError(`Server error: ${errorText}`);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.status === 'success') {
        setTranscription(data.transcript);
      } else {
        throw new Error(data.message || 'Unknown transcription error');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to transcribe recording';
      setError(errorMessage);
      console.error('Transcription error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 flex flex-col items-center justify-center text-gray-200 p-4">
      <h1 className="text-4xl font-bold mb-8 text-gray-100">Record Your Speech</h1>
      <div className="space-y-4">
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={`px-6 py-3 rounded-full font-semibold text-lg transition duration-300 ${
            isRecording
              ? 'bg-gray-600 hover:bg-gray-700'
              : 'bg-gray-500 hover:bg-gray-600'
          }`}
        >
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </button>
        {audioBlob && (
          <div className="flex flex-col items-center space-y-4">
            <audio src={URL.createObjectURL(audioBlob)} controls className="bg-gray-700 rounded" />
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-6 py-3 rounded-full font-semibold text-lg bg-gray-600 hover:bg-gray-700 transition duration-300 flex items-center"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit for Transcription'
              )}
            </button>
          </div>
        )}
        {error && (
          <div className="text-red-500 mt-4 text-center">
            Error: {error}
          </div>
        )}
        {transcription && (
          <div className="mt-4 p-4 bg-gray-700 rounded-md">
            <h3 className="text-xl font-semibold mb-2">Transcription:</h3>
            <p>{transcription}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecordPage;
