import React, { useEffect, useState } from 'react';
import { useWatchlistStore } from '../store/useWatchlistStore';
import { cryptoApi } from '../services/api';
import { Trash2 } from 'lucide-react';

interface WatchlistPrice {
  PRICE: number;
  CHANGEPCT24HOUR: number;
}

export const WatchlistWidget: React.FC = () => {
  const { favorites, removeFavorite } = useWatchlistStore();
  const [prices, setPrices] = useState<Record<string, WatchlistPrice>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFavoritePrices = async () => {
      if (favorites.length === 0) return;
      setLoading(true);
      try {
        const data = await cryptoApi.getPrices(favorites);
        if (data.RAW) {
          const formattedPrices: Record<string, WatchlistPrice> = {};
          for (const [symbol, info] of Object.entries(data.RAW)) {
            // @ts-ignore
            formattedPrices[symbol] = info.USD;
          }
          setPrices(formattedPrices);
        }
      } catch (error) {
        console.error("Failed to fetch watchlist prices", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoritePrices();
  }, [favorites]);

  if (favorites.length === 0) {
    return (
      <div className="bg-slate-800 rounded-lg shadow-lg p-4 text-center text-slate-400">
        <p>Your watchlist is empty.</p>
        <p className="text-sm mt-2">Click the star icon in the market table to add coins.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-lg shadow-lg p-4">
      <h2 className="text-xl font-bold text-white mb-4">Watchlist</h2>
      {loading && Object.keys(prices).length === 0 ? (
        <div className="text-center text-slate-400">Loading prices...</div>
      ) : (
        <div className="flex flex-col gap-3">
          {favorites.map((symbol) => {
            const priceData = prices[symbol];
            const price = priceData ? `$${priceData.PRICE.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}` : '---';
            const change = priceData ? priceData.CHANGEPCT24HOUR : 0;
            const isPositive = change >= 0;

            return (
              <div key={symbol} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg border border-slate-700/50">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-white">{symbol}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-end">
                    <span className="font-medium text-slate-200">{price}</span>
                    <span className={`text-xs font-medium ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {isPositive ? '+' : ''}{change.toFixed(2)}%
                    </span>
                  </div>
                  <button 
                    onClick={() => removeFavorite(symbol)}
                    className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
