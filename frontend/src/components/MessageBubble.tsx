import React from 'react';
import { Message } from '../types';
import { useTheme } from '../context/ThemeContext';
import { formatDistanceToNow } from '../utils/dateUtils';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const { darkMode } = useTheme();
  const isAi = message.sender === 'ai';
  
  return (
    <div
      className={`flex ${isAi ? 'justify-start' : 'justify-end'} mb-4 animate-fadeIn`}
    >
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isAi 
            ? `${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'} rounded-bl-none` 
            : 'bg-blue-500 text-white rounded-br-none'
        }`}
      >
        {message.isTyping ? (
          <div className="flex space-x-2 items-center h-6">
            <div className="w-2 h-2 rounded-full bg-current animate-bounce\" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        ) : (
          <>
            <p className="break-words">{message.content}</p>
            <p className={`text-xs mt-1 ${isAi ? 'text-gray-400' : 'text-blue-200'}`}>
              {formatDistanceToNow(message.timestamp)}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;