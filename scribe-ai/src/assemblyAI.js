const express = require('express');
const multer = require('multer');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = 5000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

// Route for handling file uploads and transcription
app.post('/transcribe', upload.single('audio'), async (req, res) => {
  try {
    const audioPath = path.join(__dirname, req.file.path);
    const transcript = await transcribeAudio(audioPath);

    // Send the transcript to the client
    res.json({ transcript });
  } catch (error) {
    console.error('Error transcribing audio:', error);
    res.status(500).json({ error: 'Error transcribing audio' });
  }
});

// Function to transcribe audio using AssemblyAI
async function transcribeAudio(audioPath) {
  // Step 1: Upload the audio file to AssemblyAI
  const uploadResponse = await axios({
    method: 'post',
    url: 'https://api.assemblyai.com/v2/upload',
    headers: { authorization: process.env.ASSEMBLYAI_API_KEY },
    data: fs.createReadStream(audioPath),
  });

  // Step 2: Submit the uploaded audio file for transcription
  const transcriptResponse = await axios({
    method: 'post',
    url: 'https://api.assemblyai.com/v2/transcript',
    headers: { authorization: process.env.ASSEMBLYAI_API_KEY },
    data: { audio_url: uploadResponse.data.upload_url },
  });

  // Step 3: Poll for transcription completion
  const transcriptId = transcriptResponse.data.id;
  let transcriptionResult;
  while (true) {
    const pollingResponse = await axios({
      method: 'get',
      url: `https://api.assemblyai.com/v2/transcript/${transcriptId}`,
      headers: { authorization: process.env.ASSEMBLYAI_API_KEY },
    });

    if (pollingResponse.data.status === 'completed') {
      transcriptionResult = pollingResponse.data.text;
      break;
    } else if (pollingResponse.data.status === 'failed') {
      throw new Error('Transcription failed');
    }
    await new Promise((resolve) => setTimeout(resolve, 3000)); // Wait 3 seconds between polls
  }

  // Delete the audio file after transcription
  fs.unlinkSync(audioPath);

  return transcriptionResult;
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
