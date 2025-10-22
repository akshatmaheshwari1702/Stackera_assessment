import React, { useEffect, useState } from 'react';

/**
 * TradingChart Component
 * Handles TradingView chart integration with proper loading and theme support
 */
const TradingChart = ({ theme }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  
  const cardBg = theme === 'light' ? 'bg-white' : 'bg-gray-800';
  const textSecondary = theme === 'light' ? 'text-gray-600' : 'text-gray-400';
  const borderColor = theme === 'light' ? 'border-gray-200' : 'border-gray-700';

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    const initTradingView = () => {
      // Clear existing chart
      const chartContainer = document.getElementById('tradingview_chart');
      if (chartContainer) {
        chartContainer.innerHTML = '';
      }

      // Load TradingView script if not already loaded
      if (!window.TradingView) {
        console.log('Loading TradingView script...');
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/tv.js';
        script.async = true;
        script.onload = () => {
          console.log('TradingView script loaded successfully');
          setTimeout(createWidget, 100);
        };
        script.onerror = () => {
          console.error('Failed to load TradingView script');
          setHasError(true);
          setIsLoading(false);
        };
        document.head.appendChild(script);
      } else {
        console.log('TradingView already loaded, creating widget...');
        createWidget();
      }
    };

    const createWidget = () => {
      if (window.TradingView && document.getElementById('tradingview_chart')) {
        try {
          console.log('Creating TradingView widget...');
          const widget = new window.TradingView.widget({
            autosize: true,
            symbol: "BYBIT:BTCUSDT",
            interval: "5",
            timezone: "Etc/UTC",
            theme: theme,
            style: "1",
            locale: "en",
            toolbar_bg: theme === 'light' ? '#f1f3f6' : '#1a1a1a',
            enable_publishing: false,
            allow_symbol_change: true,
            container_id: "tradingview_chart",
            hide_side_toolbar: false,
            studies: ["STD;SMA"],
            show_popup_button: true,
            popup_width: "1000",
            popup_height: "650"
          });
          
          // Check if chart is loaded by monitoring the container
          const checkChartLoaded = () => {
            const chartContainer = document.getElementById('tradingview_chart');
            if (chartContainer && chartContainer.children.length > 0) {
              setIsLoading(false);
            } else {
              // Retry after a short delay
              setTimeout(checkChartLoaded, 500);
            }
          };
          
          // Start checking after a short delay
          setTimeout(checkChartLoaded, 1000);
          
          // Fallback timeout
          setTimeout(() => {
            if (isLoading) {
              setIsLoading(false);
            }
          }, 5000);
          
        } catch (error) {
          console.error('Error creating TradingView widget:', error);
          setHasError(true);
          setIsLoading(false);
        }
      } else {
        setHasError(true);
        setIsLoading(false);
      }
    };

    // Initialize with a delay to ensure DOM is ready
    const timer = setTimeout(initTradingView, 500);
    
    return () => {
      clearTimeout(timer);
    };
  }, [theme]);

  return (
    <div className={`${cardBg} rounded-3xl p-8 border ${borderColor} shadow-2xl mb-8`}>
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
          <span className="text-white text-xl">📊</span>
        </div>
        <div>
          <h3 className="text-2xl font-bold">Advanced Trading Chart</h3>
          <p className={`${textSecondary}`}>Professional market analysis with TradingView</p>
        </div>
      </div>
      <div className="tradingview-widget-container rounded-2xl overflow-hidden relative" style={{ height: '600px' }}>
        <div id="tradingview_chart" style={{ height: '100%' }}></div>
        
        {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-2xl">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Loading TradingView Chart...</p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">This may take a few seconds</p>
            </div>
          </div>
        )}
        
        {/* Error State */}
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-red-50 dark:bg-red-900/20 rounded-2xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-red-600 text-2xl">⚠️</span>
              </div>
              <p className="text-red-600 dark:text-red-400 font-medium">Failed to load chart</p>
              <p className="text-sm text-red-500 dark:text-red-500 mt-2">Please refresh the page to try again</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TradingChart;
