// Speech recognition and transcription services

export interface SpeechRecognitionResult {
  transcript: string;
  confidence: number;
}

// Browser Speech Recognition (existing functionality)
export const startSpeechRecognition = (): Promise<SpeechRecognitionResult> => {
  return new Promise((resolve, reject) => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      reject(new Error('Speech recognition not supported'));
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const result = event.results[0][0];
      resolve({
        transcript: result.transcript,
        confidence: result.confidence
      });
    };

    recognition.onerror = (event) => {
      reject(new Error(event.error));
    };

    recognition.onend = () => {
      // Recognition ended
    };

    recognition.start();
  });
};

// Audio recording utilities
export const startRecording = (): Promise<MediaRecorder> => {
  return new Promise(async (resolve, reject) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      resolve(mediaRecorder);
    } catch (error) {
      reject(new Error('Microphone access denied or not available'));
    }
  });
};

export const stopRecording = (mediaRecorder: MediaRecorder): Promise<Blob> => {
  return new Promise((resolve) => {
    const audioChunks: Blob[] = [];

    mediaRecorder.ondataavailable = (event) => {
      audioChunks.push(event.data);
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
      resolve(audioBlob);
    };

    mediaRecorder.stop();
    mediaRecorder.stream.getTracks().forEach(track => track.stop());
  });
};

// Whisper Integration Placeholder
export async function transcribeWithWhisper(audioBlob: Blob): Promise<string> {
  try {
    // TODO: Connect to local Whisper backend
    // 
    // To implement this:
    // 1. Set up a local Whisper server (e.g., using whisper-api or openai-whisper)
    // 2. Run it on http://localhost:5000 or your preferred port
    // 3. Uncomment and modify the code below:
    
    /*
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.wav');
    
    const response = await fetch('http://localhost:5000/transcribe', {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('Transcription failed');
    }
    
    const result = await response.json();
    return result.text || result.transcription;
    */
    
    // Placeholder response for now
    console.log('Whisper transcription requested for audio blob:', audioBlob);
    return "Transcription pending (connect Whisper backend)";
    
  } catch (error) {
    console.error('Whisper transcription error:', error);
    throw new Error('Failed to transcribe audio with Whisper');
  }
}

// Advanced recording with Whisper integration
export const recordAndTranscribeWithWhisper = async (): Promise<string> => {
  try {
    const mediaRecorder = await startRecording();
    
    // Start recording
    mediaRecorder.start();
    
    // For demo purposes, record for 5 seconds
    // In a real implementation, you'd have start/stop controls
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    const audioBlob = await stopRecording(mediaRecorder);
    const transcription = await transcribeWithWhisper(audioBlob);
    
    return transcription;
  } catch (error) {
    console.error('Recording and transcription error:', error);
    throw error;
  }
};

// Extend the Window interface for TypeScript
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}