import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

/**
 * StatsGrid Component
 * Displays a grid of market statistics cards
 */
const StatsGrid = ({ btcData, theme }) => {
  const cardBg = theme === 'light' ? 'bg-white' : 'bg-gray-800';
  const textSecondary = theme === 'light' ? 'text-gray-600' : 'text-gray-400';
  const borderColor = theme === 'light' ? 'border-gray-200' : 'border-gray-700';

  const formatNumber = (num, decimals = 2) => {
    return parseFloat(num).toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  };

  const formatVolume = (num) => {
    const value = parseFloat(num);
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
    if (value >= 1e3) return `$${(value / 1e3).toFixed(2)}K`;
    return `$${value.toFixed(2)}`;
  };

  const stats = [
    {
      icon: '📊',
      label: 'Mark Price',
      value: `$${formatNumber(btcData.markPrice, 2)}`,
      color: 'blue',
      badge: 'MARK'
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-green-600" />,
      label: '24h High',
      value: `$${formatNumber(btcData.high24h, 2)}`,
      color: 'green',
      badge: 'HIGH'
    },
    {
      icon: <TrendingDown className="w-5 h-5 text-red-600" />,
      label: '24h Low',
      value: `$${formatNumber(btcData.low24h, 2)}`,
      color: 'red',
      badge: 'LOW'
    },
    {
      icon: '📈',
      label: '24h Volume',
      value: formatVolume(btcData.turnover24h),
      color: 'purple',
      badge: 'VOL'
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      blue: {
        bg: 'bg-blue-100 dark:bg-blue-900/30',
        text: 'text-blue-600',
        badge: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600'
      },
      green: {
        bg: 'bg-green-100 dark:bg-green-900/30',
        text: 'text-green-500',
        badge: 'bg-green-100 dark:bg-green-900/30 text-green-600'
      },
      red: {
        bg: 'bg-red-100 dark:bg-red-900/30',
        text: 'text-red-500',
        badge: 'bg-red-100 dark:bg-red-900/30 text-red-600'
      },
      purple: {
        bg: 'bg-purple-100 dark:bg-purple-900/30',
        text: 'text-purple-600',
        badge: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600'
      }
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const colors = getColorClasses(stat.color);
        return (
          <div 
            key={index}
            className={`${cardBg} rounded-2xl p-6 border ${borderColor} shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 ${colors.bg} rounded-lg flex items-center justify-center`}>
                {typeof stat.icon === 'string' ? (
                  <span className={`${colors.text} text-lg`}>{stat.icon}</span>
                ) : (
                  stat.icon
                )}
              </div>
              <span className={`text-xs ${colors.badge} px-2 py-1 rounded-full`}>
                {stat.badge}
              </span>
            </div>
            <p className={`text-sm ${textSecondary} mb-2`}>{stat.label}</p>
            <p className={`text-2xl font-bold ${colors.text}`}>{stat.value}</p>
          </div>
        );
      })}
    </div>
  );
};

export default StatsGrid;
