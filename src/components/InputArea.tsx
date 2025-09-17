import React, { useState } from 'react';
import { Send, Mic, MicOff, Headphones } from 'lucide-react';
import { startSpeechRecognition } from '../services/speechService';
import { transcribeWithWhisper, recordAndTranscribeWithWhisper } from '../services/speechService';

interface InputAreaProps {
  onSendMessage: (message: string) => void;
  disabled: boolean;
}

const InputArea: React.FC<InputAreaProps> = ({ onSendMessage, disabled }) => {
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() && !disabled) {
      onSendMessage(inputText.trim());
      setInputText('');
    }
  };

  const handleBrowserVoiceInput = async () => {
    try {
      setIsListening(true);
      const result = await startSpeechRecognition();
      setInputText(result.transcript);
    } catch (error) {
      console.error('Speech recognition error:', error);
      alert('Voice input is not supported in your browser or microphone access was denied.');
    } finally {
      setIsListening(false);
    }
  };

  const handleWhisperVoiceInput = async () => {
    try {
      setIsRecording(true);
      const transcription = await recordAndTranscribeWithWhisper();
      setInputText(transcription);
    } catch (error) {
      console.error('Whisper transcription error:', error);
      alert('Whisper transcription failed. Make sure Whisper backend is running.');
    } finally {
      setIsRecording(false);
    }
  };

  return (
    <div className="input-area">
      <form onSubmit={handleSubmit} className="input-form">
        <div className="input-container">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask me anything..."
            className="message-input"
            disabled={disabled}
          />
          <button
            type="button"
            onClick={handleBrowserVoiceInput}
            className={`voice-button ${isListening ? 'listening' : ''}`}
            disabled={disabled || isListening}
            title="Browser Speech Recognition"
          >
            {isListening ? <MicOff size={18} /> : <Mic size={18} />}
          </button>
          <button
            type="button"
            onClick={handleWhisperVoiceInput}
            className={`whisper-button ${isRecording ? 'recording' : ''}`}
            disabled={disabled || isRecording}
            title="Whisper Transcription (requires backend)"
          >
            <Headphones size={18} />
          </button>
          <button
            type="submit"
            className="send-button"
            disabled={!inputText.trim() || disabled}
          >
            <Send size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputArea;