import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Message, ChatContextType } from '../types';
import { v4 as uuidv4 } from 'uuid';

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const addMessage = async (content: string, sender: 'user' | 'ai', personality?: string) => {
    const newMessage: Message = {
      id: uuidv4(),
      content,
      sender,
      timestamp: new Date(),
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    if (sender === 'user') {
      setIsTyping(true);
      try {
        // Only include messages up to the current user message
        const chats = messages.map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.content
        }));
        
        // Add the new user message
        chats.push({ role: 'user', content });

        // Filter out any initial AI messages if this is the first user message
        const filteredChats = chats.length === 1 ? chats : chats.filter((_, index) => {
          if (index === 0 && chats[0].role === 'assistant') {
            return false;
          }
          return true;
        });

        const response = await fetch("http://localhost:8000/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            chats: filteredChats,
            personality: personality || 'friendly' 
          }),
        });

        const data = await response.json();
        
        setIsTyping(false);
        
        if (data.output) {
          const aiResponse: Message = {
            id: uuidv4(),
            content: data.output.content,
            sender: 'ai',
            timestamp: new Date(),
          };
          setMessages(prev => [...prev, aiResponse]);
        }
      } catch (error) {
        console.error('Error:', error);
        setIsTyping(false);
        const errorMessage: Message = {
          id: uuidv4(),
          content: "I apologize, but I'm having trouble connecting to the server.",
          sender: 'ai',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    }
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return (
    <ChatContext.Provider value={{ messages, addMessage, clearMessages, isTyping, setIsTyping }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};