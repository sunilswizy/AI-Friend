export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  isTyping?: boolean;
}

export interface ChatContextType {
  messages: Message[];
  addMessage: (content: string, sender: 'user' | 'ai', personality?: string) => void;
  clearMessages: () => void;
  isTyping: boolean;
  setIsTyping: (value: boolean) => void;
}

export interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export interface AiPersonality {
  id: string;
  name: string;
  description: string;
  avatar: string;
  greeting: string;
}