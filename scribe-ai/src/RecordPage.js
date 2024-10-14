import React, { useState, useRef } from 'react';

const RecordPage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
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
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setAudioBlob(audioBlob);
        audioChunksRef.current = [];
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleSubmit = () => {
    if (audioBlob) {
      // Here you would typically send the audioBlob to your backend
      console.log('Sending audio to backend for processing...');
      // You can implement the actual API call to your backend here
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-500 to-yellow-400 flex flex-col items-center justify-center text-white p-4">
      <h1 className="text-4xl font-bold mb-8">Record Your Speech</h1>
      <div className="space-y-4">
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={`px-6 py-3 rounded-full font-semibold text-lg transition duration-300 ${
            isRecording
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </button>
        {audioBlob && (
          <div className="flex flex-col items-center space-y-4">
            <audio src={URL.createObjectURL(audioBlob)} controls />
            <button
              onClick={handleSubmit}
              className="px-6 py-3 rounded-full font-semibold text-lg bg-green-600 hover:bg-green-700 transition duration-300"
            >
              Submit for Transcription
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecordPage;