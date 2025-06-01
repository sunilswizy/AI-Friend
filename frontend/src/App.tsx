import React, { useState, useEffect } from 'react';
import { ChatProvider } from './context/ChatContext';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';
import WelcomeScreen from './components/WelcomeScreen';

function App() {
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedPersonality, setSelectedPersonality] = useState('friendly');
  const [showNewChatWelcome, setShowNewChatWelcome] = useState(true);

  // Check if the user has visited before
  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisitedBefore');
    if (hasVisited) {
      setShowWelcomeScreen(false);
    }
  }, []);

  const handleSelectPersonality = (id: string) => {
    setSelectedPersonality(id);
    setShowWelcomeScreen(false);
    localStorage.setItem('hasVisitedBefore', 'true');
    localStorage.setItem('selectedPersonality', id);
  };

  const handleSkipWelcome = () => {
    setShowWelcomeScreen(false);
    localStorage.setItem('hasVisitedBefore', 'true');
  };

  if (showWelcomeScreen) {
    return (
      <ThemeProvider>
        <WelcomeScreen 
          onSelectPersonality={handleSelectPersonality}
          onSkip={handleSkipWelcome}
        />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <ChatProvider>
        <div className="flex h-screen w-screen overflow-hidden">
          <Sidebar 
            isOpen={showSidebar}
            onClose={() => setShowSidebar(false)}
            selectedPersonality={selectedPersonality}
            setSelectedPersonality={setSelectedPersonality}
          />
          
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header 
              showSidebar={showSidebar}
              toggleSidebar={() => setShowSidebar(!showSidebar)}
            />
            
            <div className="flex-1 flex flex-col overflow-hidden">
              <ChatWindow 
                showWelcome={showNewChatWelcome}
                personalityId={selectedPersonality}
              />
              <ChatInput personality={selectedPersonality} />
            </div>
          </div>
        </div>
      </ChatProvider>
    </ThemeProvider>
  );
}

export default App;