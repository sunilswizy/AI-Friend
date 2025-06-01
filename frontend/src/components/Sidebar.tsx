import React from 'react';
import { User, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useChat } from '../context/ChatContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPersonality: string;
  setSelectedPersonality: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  onClose,
  selectedPersonality,
  setSelectedPersonality 
}) => {
  const { darkMode } = useTheme();
  const { clearMessages } = useChat();

  const personalities = [
    { id: 'friendly', name: 'Friendly Companion' },
    { id: 'wise', name: 'Wise Mentor' },
    { id: 'creative', name: 'Creative Spirit' },
    { id: 'analytical', name: 'Analytical Mind' }
  ];

  const handlePersonalityChange = (id: string) => {
    setSelectedPersonality(id);
    clearMessages();
    onClose();
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={onClose}
        ></div>
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 w-64 z-30 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} border-r ${
          darkMode ? 'border-gray-700' : 'border-gray-200'
        } flex flex-col md:static`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold">My AI Friend</h2>
          <button 
            onClick={onClose} 
            className="p-1 rounded-full md:hidden hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="flex-1 p-4">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
            AI PERSONALITY
          </h3>
          <div className="space-y-2">
            {personalities.map(personality => (
              <button
                key={personality.id}
                onClick={() => handlePersonalityChange(personality.id)}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-colors ${
                  selectedPersonality === personality.id
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <User size={20} className="mr-3" />
                {personality.name}
              </button>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;