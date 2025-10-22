import React from 'react';
import { Wifi, WifiOff } from 'lucide-react';

/**
 * Header Component
 * Displays the application header with branding, connection status, and theme toggle
 */
const Header = ({ theme, isConnected, onThemeToggle }) => {
  const cardBg = theme === 'light' ? 'bg-white' : 'bg-gray-800';
  const textSecondary = theme === 'light' ? 'text-gray-600' : 'text-gray-400';
  const borderColor = theme === 'light' ? 'border-gray-200' : 'border-gray-700';

  return (
    <header className={`${cardBg} border-b ${borderColor} sticky top-0 z-50 backdrop-blur-lg bg-opacity-95`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo and Brand */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">₿</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
                  Stackera Dashboard
                </h1>
              </div>
            </div>
          </div>
          
          {/* Navigation and Controls */}
          <div className="flex items-center gap-6">
            {/* Connection Status */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-opacity-10 bg-gray-500">
              {isConnected ? (
                <>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-500 font-medium">Live</span>
                </>
              ) : (
                <>
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-red-500 font-medium">Offline</span>
                </>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={onThemeToggle}
              className={`px-4 py-2 rounded-xl ${cardBg} border ${borderColor} hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl`}
            >
              <div className="flex items-center gap-2">
                {theme === 'light' ? (
                  <>
                    <span className="text-lg">🌙</span>
                    <span className="font-medium">Dark</span>
                  </>
                ) : (
                  <>
                    <span className="text-lg">☀️</span>
                    <span className="font-medium">Light</span>
                  </>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
