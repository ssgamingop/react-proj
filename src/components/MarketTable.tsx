import React, { useEffect, useState } from 'react';
import { cryptoApi } from '../services/api';
import { useWatchlistStore } from '../store/useWatchlistStore';
import { Star, TrendingUp, TrendingDown, ChevronLeft, ChevronRight } from 'lucide-react';

interface MarketData {
  CoinInfo: {
    Id: string;
    Name: string;
    FullName: string;
    ImageUrl: string;
  };
  DISPLAY?: {
    USD: {
      PRICE: string;
      CHANGE24HOUR: string;
      CHANGEPCT24HOUR: string;
      MKTCAP: string;
      VOLUME24HOURTO: string;
    }
  };
  RAW?: {
    USD: {
      PRICE: number;
      CHANGE24HOUR: number;
      CHANGEPCT24HOUR: number;
      MKTCAP: number;
      VOLUME24HOURTO: number;
    }
  }
}

export const MarketTable: React.FC = () => {
  const [coins, setCoins] = useState<MarketData[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const itemsPerPage = 10;
  const { favorites, toggleFavorite } = useWatchlistStore();

  useEffect(() => {
    const fetchTopCoins = async () => {
      try {
        setLoading(true);
        const data = await cryptoApi.getTopCoins(itemsPerPage, page);
        if (data && data.Data) {
          setCoins(data.Data);
        }
      } catch (error) {
        console.error("Failed to fetch top coins", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopCoins();
  }, [page]);

  if (loading) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center text-slate-500 dark:text-slate-400 font-medium animate-pulse shadow-sm transition-colors">
        Fetching live market data...
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="table-container bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm transition-colors">
        <table className="w-full text-left text-sm border-collapse min-w-[600px]">
          <thead className="bg-slate-50 dark:bg-slate-800/40 text-[10px] font-bold uppercase tracking-widest text-slate-500 border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="px-6 py-4 w-12 text-center"></th>
              <th className="px-6 py-4 w-12 text-center">#</th>
              <th className="px-6 py-4 whitespace-nowrap">Coin</th>
              <th className="px-6 py-4 text-right whitespace-nowrap">Price</th>
              <th className="px-6 py-4 text-right whitespace-nowrap">24h Change</th>
              <th className="px-6 py-4 text-right hidden lg:table-cell whitespace-nowrap">Market Cap</th>
              <th className="px-6 py-4 text-right hidden xl:table-cell whitespace-nowrap">Volume (24h)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {coins.map((coin, index) => {
              const isFavorite = favorites.includes(coin.CoinInfo.Name);
              const price = coin.DISPLAY?.USD?.PRICE || '$0.00';
              const rawChange = coin.RAW?.USD?.CHANGEPCT24HOUR || 0;
              const changeStr = coin.DISPLAY?.USD?.CHANGEPCT24HOUR || '0.00';
              const mktCap = coin.DISPLAY?.USD?.MKTCAP || '$0.00';
              const volume = coin.DISPLAY?.USD?.VOLUME24HOURTO || '$0.00';
              const isPositive = rawChange >= 0;

              return (
                <tr key={coin.CoinInfo.Id} className="group hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors cursor-pointer">
                  <td className="px-6 py-4 text-center">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(coin.CoinInfo.Name);
                      }}
                      className="focus:outline-none transition-transform hover:scale-110 active:scale-95"
                    >
                      {isFavorite ? (
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 shadow-sm" />
                      ) : (
                        <Star className="w-4 h-4 text-slate-400 dark:text-slate-600 hover:text-slate-600 dark:hover:text-slate-400" />
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-center font-mono text-slate-500 text-[10px] font-bold">
                    {(page * itemsPerPage) + index + 1}
                  </td>
                  <td className="px-6 py-4 no-wrap-cell">
                    <div className="flex items-center gap-3">
                      <div className="relative shrink-0">
                        <img 
                          src={`https://www.cryptocompare.com${coin.CoinInfo.ImageUrl}`} 
                          alt={coin.CoinInfo.Name} 
                          className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 p-0.5"
                        />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-bold text-slate-900 dark:text-white truncate max-w-[100px] sm:max-w-none">{coin.CoinInfo.FullName}</span>
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{coin.CoinInfo.Name}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right no-wrap-cell font-bold text-slate-900 dark:text-slate-200">
                    {price}
                  </td>
                  <td className={`px-6 py-4 text-right no-wrap-cell font-bold ${isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                    <div className="inline-flex items-center gap-1">
                      {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      <span>{Math.abs(parseFloat(changeStr)).toFixed(2)}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right no-wrap-cell text-slate-600 dark:text-slate-400 hidden lg:table-cell font-bold text-[11px]">
                    {mktCap}
                  </td>
                  <td className="px-6 py-4 text-right no-wrap-cell text-slate-500 dark:text-slate-500 hidden xl:table-cell font-mono text-[10px] font-bold">
                    {volume}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-2">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
          Page {page + 1}
        </p>
        <div className="flex gap-2">
          <button 
            onClick={() => setPage(Math.max(0, page - 1))}
            disabled={page === 0}
            className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setPage(page + 1)}
            className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all shadow-sm"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};