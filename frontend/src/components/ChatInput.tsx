import React, { useState, useRef } from 'react';
import { Send, Mic, X } from 'lucide-react';
import { useChat } from '../context/ChatContext';
import { useTheme } from '../context/ThemeContext';

interface ChatInputProps {
  personality?: string;
}

const ChatInput: React.FC<ChatInputProps> = ({ personality = 'friendly' }) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const { addMessage, setIsTyping } = useChat();
  const { darkMode } = useTheme();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() === '') return;
    
    // Send user message with personality
    addMessage(message, 'user', personality);
    setMessage('');
    
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // In a real app, implement voice recording functionality here
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className={`p-4 border-t ${
        darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
      } sticky bottom-0 transition-colors duration-200`}
    >
      <div className="flex items-end space-x-2">
        <div className="relative flex-grow">
          <textarea
            ref={inputRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className={`w-full p-3 pr-10 rounded-lg border resize-none overflow-hidden min-h-[2.5rem] max-h-32 ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500'
            } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
            rows={1}
          />
          <button
            type="button"
            onClick={toggleRecording}
            className={`absolute right-3 bottom-3 text-gray-500 hover:text-gray-700 transition-colors ${
              isRecording ? 'text-red-500 hover:text-red-700' : ''
            }`}
          >
            {isRecording ? <X size={20} /> : <Mic size={20} />}
          </button>
        </div>
        <button
          type="submit"
          disabled={message.trim() === ''}
          className={`p-3 rounded-full bg-blue-500 text-white ${
            message.trim() === '' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
          } transition-colors duration-200 flex items-center justify-center`}
        >
          <Send size={20} />
        </button>
      </div>
      {isRecording && (
        <div className="mt-2 text-sm text-red-500 animate-pulse flex items-center">
          <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
          Recording... (tap mic to stop)
        </div>
      )}
    </form>
  );
};

export default ChatInput;