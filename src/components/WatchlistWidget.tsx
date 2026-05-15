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
    <div className="bg-white/80 dark:bg-[#131722]/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800/60 rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.02)] dark:shadow-none p-6 transition-colors hover:shadow-md duration-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2 tracking-tight">
          <div className="bg-amber-100 dark:bg-amber-400/10 p-1.5 rounded-xl">
            <Star className="w-5 h-5 text-amber-500 fill-amber-500/20" />
          </div>
          Watchlist
        </h2>
        <button className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline">View All</button>
      </div>
      
      {favorites.length === 0 ? (
        <div className="text-center py-8 px-4 border-2 border-dashed border-slate-200 dark:border-slate-800/60 rounded-xl">
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
              <div 
                key={symbol} 
                className="group flex items-center justify-between p-4 bg-slate-50/50 dark:bg-black/20 border border-slate-100 dark:border-slate-800/80 rounded-2xl hover:bg-white dark:hover:bg-white/5 transition-all hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="relative">
                    <div className="bg-white dark:bg-[#131722] w-12 h-12 rounded-xl flex items-center justify-center font-extrabold text-slate-900 dark:text-white shadow-sm border border-slate-200 dark:border-slate-800/60 shrink-0 group-hover:scale-110 transition-transform">
                      {symbol.charAt(0)}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white dark:bg-[#131722] rounded-full flex items-center justify-center">
                      <div className={`w-2 h-2 rounded-full ${isPositive ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]'}`}></div>
                    </div>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-extrabold text-slate-900 dark:text-white leading-tight truncate tracking-tight text-base">{symbol}</span>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5 truncate">Crypto</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right whitespace-nowrap">
                    <div className="font-extrabold text-slate-900 dark:text-white text-base tracking-tight">{price}</div>
                    <div className={`text-xs font-bold flex items-center justify-end gap-1 mt-0.5 ${isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {isPositive ? '+' : ''}{change.toFixed(2)}%
                    </div>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFavorite(symbol);
                    }}
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
