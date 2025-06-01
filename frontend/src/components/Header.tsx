import React from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  showSidebar: boolean;
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ showSidebar, toggleSidebar }) => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <header 
      className={`sticky top-0 z-10 py-4 px-4 md:px-6 flex items-center justify-between border-b transition-colors duration-200 ${
        darkMode ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900'
      }`}
    >
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar}
          className="mr-3 md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label={showSidebar ? "Close menu" : "Open menu"}
        >
          {showSidebar ? <X size={20} /> : <Menu size={20} />}
        </button>
        <h1 className="text-xl font-bold">My AI Friend</h1>
      </div>
      
      <button
        onClick={toggleDarkMode}
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </header>
  );
};

export default Header;