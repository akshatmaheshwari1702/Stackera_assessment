import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import Sparkline from './Sparkline';

/**
 * PriceCard Component
 * Displays the main Bitcoin price with change indicators and sparkline
 */
const PriceCard = ({ btcData, priceChange, priceHistory, theme }) => {
  const cardBg = theme === 'light' ? 'bg-white' : 'bg-gray-800';
  const textPrimary = theme === 'light' ? 'text-gray-900' : 'text-white';
  const textSecondary = theme === 'light' ? 'text-gray-600' : 'text-gray-400';
  const borderColor = theme === 'light' ? 'border-gray-200' : 'border-gray-700';

  const formatNumber = (num, decimals = 2) => {
    return parseFloat(num).toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  };

  const priceChangePercent = parseFloat(btcData.priceChangePercent) * 100;
  const isPositiveChange = priceChangePercent >= 0;

  return (
    <div className={`${cardBg} rounded-3xl p-8 mb-8 border ${borderColor} shadow-2xl relative overflow-hidden`}>
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-yellow-500/5"></div>
      
      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">₿</span>
              </div>
              <div>
                <h2 className={`text-xl font-bold ${textPrimary}`}>Bitcoin / USDT</h2>
                <p className={`text-sm ${textSecondary}`}>Real-time market data</p>
              </div>
            </div>
            
            <div className="flex items-baseline gap-6 mb-4">
              <span 
                className={`text-6xl font-black transition-all duration-500 ${
                  priceChange === 'up' ? 'text-green-500 scale-105' : 
                  priceChange === 'down' ? 'text-red-500 scale-105' : 'text-gray-800 dark:text-white'
                }`}
              >
                ${formatNumber(btcData.lastPrice, 2)}
              </span>
              <div className="flex items-center gap-3">
                {isPositiveChange ? (
                  <div className="flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <span className="text-green-600 font-bold text-lg">
                      +{priceChangePercent.toFixed(2)}%
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 rounded-full">
                    <TrendingDown className="w-5 h-5 text-red-600" />
                    <span className="text-red-600 font-bold text-lg">
                      {priceChangePercent.toFixed(2)}%
                    </span>
                  </div>
                )}
              </div>
            </div>
            <p className={`${textSecondary} text-lg`}>24h Performance</p>
          </div>
          
          {/* Enhanced Sparkline */}
          <Sparkline priceHistory={priceHistory} theme={theme} />
        </div>
      </div>
    </div>
  );
};

export default PriceCard;
