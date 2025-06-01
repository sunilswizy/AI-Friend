import React, { useEffect, useRef, useState } from 'react';
import { useChat } from '../context/ChatContext';
import MessageBubble from './MessageBubble';
import { Message } from '../types';
import { useTheme } from '../context/ThemeContext';

interface ChatWindowProps {
  showWelcome: boolean;
  personalityId: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ showWelcome, personalityId }) => {
  const { messages, isTyping, addMessage } = useChat();
  const { darkMode } = useTheme();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const welcomeShownRef = useRef(false);
  const [welcomeMsg, setWelcomeMsg] = useState('Hello! I\'m your AI friend. How can I help you today?');
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
      console.log("here", showWelcome)
    if (showWelcome && messages.length === 0) {
      welcomeShownRef.current = true;
      
      switch (personalityId) {
        case 'friendly':
          setWelcomeMsg('Hello! I\'m so happy to meet you. How are you feeling today?');
          break;
        case 'wise':
          setWelcomeMsg('Greetings. It\'s a pleasure to connect with you. What\'s on your mind today?')
          break;
        case 'creative':
          setWelcomeMsg('Hey there! I\'m excited to chat with you. What shall we create together today?')
          break;
        case 'analytical':
          setWelcomeMsg('Welcome. I\'m here to help you analyze and solve any challenges you\'re facing.')
          break;
      }
    }
  }, [showWelcome, personalityId, addMessage, messages.length]);

  const typingMessage: Message = {
    id: 'typing-indicator',
    content: '',
    sender: 'ai',
    timestamp: new Date(),
    isTyping: true
  };

  return (
    <div 
      className={`flex-1 overflow-y-auto p-4 ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      } transition-colors duration-200`}
    >
      {messages.length === 0 && !isTyping ? (
        <div className="h-full flex items-center justify-center">
          <div className="text-center p-6 max-w-md">
            <h2 className="text-2xl font-bold mb-2">Welcome to Your AI Friend</h2>
            <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              { welcomeMsg }
            </p>
          </div>
        </div>
      ) : (
        <>
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          {isTyping && <MessageBubble message={typingMessage} />}
          <div ref={messagesEndRef} />
        </>
      )}
    </div>
  );
};

export default ChatWindow;