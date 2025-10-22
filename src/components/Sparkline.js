import React from 'react';

/**
 * Sparkline Component
 * Renders a mini chart showing price trends over the last 60 seconds
 */
const Sparkline = ({ priceHistory, theme }) => {
  const textSecondary = theme === 'light' ? 'text-gray-600' : 'text-gray-400';
  const cardBg = theme === 'light' ? 'bg-white' : 'bg-gray-800';
  const borderColor = theme === 'light' ? 'border-gray-200' : 'border-gray-700';

  const renderSparkline = () => {
    if (priceHistory.length < 2) return null;

    // Filter out invalid prices (NaN, null, undefined, 0)
    const validPrices = priceHistory.filter(price => 
      price && !isNaN(price) && isFinite(price) && price > 0
    );

    if (validPrices.length < 2) return null;

    const width = 120;
    const height = 40;
    const padding = 2;
    
    const min = Math.min(...validPrices);
    const max = Math.max(...validPrices);
    const range = max - min;

    // If all prices are the same, create a flat line
    if (range === 0) {
      const y = height / 2;
      const points = validPrices.map((_, i) => {
        const x = (i / (validPrices.length - 1)) * (width - 2 * padding) + padding;
        return `${x},${y}`;
      }).join(' ');
      
      return (
        <svg width={width} height={height} className="mx-auto">
          <polyline
            points={points}
            fill="none"
            stroke="#10b981"
            strokeWidth="2"
          />
        </svg>
      );
    }

    const points = validPrices.map((price, i) => {
      const x = (i / (validPrices.length - 1)) * (width - 2 * padding) + padding;
      const y = height - padding - ((price - min) / range) * (height - 2 * padding);
      return `${x},${y}`;
    }).join(' ');

    const isPositive = validPrices[validPrices.length - 1] >= validPrices[0];

    return (
      <svg width={width} height={height} className="mx-auto">
        <polyline
          points={points}
          fill="none"
          stroke={isPositive ? '#10b981' : '#ef4444'}
          strokeWidth="2"
        />
      </svg>
    );
  };

  return (
    <div className="text-center">
      <div className={`${cardBg} rounded-2xl p-4 border ${borderColor} shadow-lg`}>
        <p className={`text-sm ${textSecondary} mb-3 font-medium`}>Price Trend (60s)</p>
        {renderSparkline()}
      </div>
    </div>
  );
};

export default Sparkline;
