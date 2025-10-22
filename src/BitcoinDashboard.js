import React from 'react';
import Header from './components/Header';
import PriceCard from './components/PriceCard';
import StatsGrid from './components/StatsGrid';
import TradingChart from './components/TradingChart';
import useWebSocket from './hooks/useWebSocket';
import useTheme from './hooks/useTheme';

/**
 * BitcoinDashboard Component
 * Main dashboard component that orchestrates all child components
 * Uses custom hooks for WebSocket data and theme management
 */
const BitcoinDashboard = () => {
  // Custom hooks for state management
  const { theme, toggleTheme } = useTheme();
  const { btcData, priceHistory, isConnected, priceChange } = useWebSocket();

  // Theme-based styling
  const bgColor = theme === 'light' ? 'bg-gray-50' : 'bg-gray-900';

  return (
    <div className={`min-h-screen ${bgColor} transition-colors duration-300`}>
      {/* Header Component */}
      <Header 
        theme={theme} 
        isConnected={isConnected} 
        onThemeToggle={toggleTheme} 
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Price Card Component */}
        <PriceCard 
          btcData={btcData}
          priceChange={priceChange}
          priceHistory={priceHistory}
          theme={theme}
        />

        {/* Stats Grid Component */}
        <StatsGrid 
          btcData={btcData}
          theme={theme}
        />

        {/* Trading Chart Component */}
        <TradingChart theme={theme} />
      </div>
    </div>
  );
};

export default BitcoinDashboard;
