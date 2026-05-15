import React, { useEffect, useState } from 'react';
import { useWatchlistStore } from '../store/useWatchlistStore';
import { cryptoApi } from '../services/api';
import { Trash2, Star } from 'lucide-react';

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

  return (
    <div className="bg-white dark:bg-[#131722] border border-slate-200 dark:border-slate-800/60 rounded-2xl shadow-sm p-6 transition-colors">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
        <Star className="w-5 h-5 text-primary fill-primary/20" />
        Watchlist
      </h2>
      
      {favorites.length === 0 ? (
        <div className="text-center py-8 px-4 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
          <p className="text-slate-500 text-sm font-medium">Your watchlist is empty</p>
          <p className="text-xs text-slate-400 dark:text-slate-600 mt-2">Star coins in the market table to track them here</p>
        </div>
      ) : (
        <div className="space-y-3">
          {favorites.map((symbol) => {
            const priceData = prices[symbol];
            const price = priceData ? `$${priceData.PRICE.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '---';
            const change = priceData ? priceData.CHANGEPCT24HOUR : 0;
            const isPositive = change >= 0;

            return (
              <div key={symbol} className="group flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-slate-300 dark:hover:border-slate-700 transition-all overflow-hidden shadow-sm">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="bg-white dark:bg-slate-900 w-10 h-10 rounded-lg flex items-center justify-center font-bold text-slate-900 dark:text-white shadow-sm border border-slate-200 dark:border-transparent shrink-0">
                    {symbol.charAt(0)}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-bold text-slate-900 dark:text-white leading-tight truncate">{symbol}</span>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5 truncate">Crypto</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right whitespace-nowrap">
                    <div className="font-bold text-slate-900 dark:text-slate-200">{price}</div>
                    <div className={`text-xs font-bold ${isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                      {isPositive ? '+' : ''}{change.toFixed(2)}%
                    </div>
                  </div>
                  <button 
                    onClick={() => removeFavorite(symbol)}
                    className="p-1.5 text-slate-400 dark:text-slate-600 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
          {loading && <div className="text-center text-[10px] text-slate-400 dark:text-slate-600 font-bold uppercase tracking-widest pt-2">Updating...</div>}
        </div>
      )}
    </div>
  );
};
