import React, { useState } from 'react';
import { aiPersonalities } from '../data/personalities';
import { useTheme } from '../context/ThemeContext';

interface WelcomeScreenProps {
  onSelectPersonality: (id: string) => void;
  onSkip: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onSelectPersonality, onSkip }) => {
  const { darkMode } = useTheme();
  const [selectedId, setSelectedId] = useState<string>('');

  const handleSelect = () => {
    if (selectedId) {
      onSelectPersonality(selectedId);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-6 ${
      darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <div className={`w-full max-w-4xl p-8 rounded-2xl shadow-xl ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h1 className="text-3xl font-bold text-center mb-2">Welcome to Your AI Friend</h1>
        <p className={`text-center mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Choose a personality for your AI companion to start a conversation
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {aiPersonalities.map((personality) => (
            <div
              key={personality.id}
              onClick={() => setSelectedId(personality.id)}
              className={`cursor-pointer rounded-xl p-4 border-2 transition-all duration-200 transform hover:scale-105 ${
                selectedId === personality.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                  : `border-gray-200 dark:border-gray-700 ${
                      darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                    }`
              }`}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
                  <img
                    src={personality.avatar}
                    alt={personality.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-lg mb-1">{personality.name}</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {personality.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
          <button
            onClick={handleSelect}
            disabled={!selectedId}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              selectedId
                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                : 'bg-gray-300 cursor-not-allowed text-gray-500 dark:bg-gray-700 dark:text-gray-400'
            }`}
          >
            Continue with {selectedId ? aiPersonalities.find(p => p.id === selectedId)?.name : 'selection'}
          </button>
          
          <button
            onClick={onSkip}
            className={`px-6 py-3 rounded-lg font-semibold ${
              darkMode
                ? 'bg-gray-700 hover:bg-gray-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            }`}
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;