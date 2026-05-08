import React, { useEffect, useState } from 'react';
import { cryptoApi } from '../services/api';
import { useWatchlistStore } from '../store/useWatchlistStore';
import { Star, TrendingUp, TrendingDown } from 'lucide-react';

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
  const { favorites, toggleFavorite } = useWatchlistStore();

  useEffect(() => {
    const fetchTopCoins = async () => {
      try {
        setLoading(true);
        const data = await cryptoApi.getTopCoins(100);
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
  }, []);

  if (loading) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-500 font-medium animate-pulse">
        Fetching live market data...
      </div>
    );
  }

  return (
    <div className="overflow-hidden bg-slate-900 border border-slate-800 rounded-2xl shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead className="bg-slate-800/40 text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-800">
            <tr>
              <th className="px-6 py-4 w-12 text-center"></th>
              <th className="px-6 py-4 w-12 text-center">#</th>
              <th className="px-6 py-4">Coin</th>
              <th className="px-6 py-4 text-right">Price</th>
              <th className="px-6 py-4 text-right">24h Change</th>
              <th className="px-6 py-4 text-right hidden lg:table-cell">Market Cap</th>
              <th className="px-6 py-4 text-right hidden xl:table-cell">Volume (24h)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {coins.map((coin, index) => {
              const isFavorite = favorites.includes(coin.CoinInfo.Name);
              const price = coin.DISPLAY?.USD?.PRICE || '$0.00';
              const rawChange = coin.RAW?.USD?.CHANGEPCT24HOUR || 0;
              const changeStr = coin.DISPLAY?.USD?.CHANGEPCT24HOUR || '0.00';
              const mktCap = coin.DISPLAY?.USD?.MKTCAP || '$0.00';
              const volume = coin.DISPLAY?.USD?.VOLUME24HOURTO || '$0.00';
              const isPositive = rawChange >= 0;

              return (
                <tr key={coin.CoinInfo.Id} className="group hover:bg-white/[0.02] transition-all cursor-pointer">
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
                        <Star className="w-4 h-4 text-slate-600 hover:text-slate-400" />
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="font-mono text-slate-500">{index + 1}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img 
                          src={`https://www.cryptocompare.com${coin.CoinInfo.ImageUrl}`} 
                          alt={coin.CoinInfo.Name} 
                          className="w-8 h-8 rounded-full bg-slate-800 p-0.5"
                        />
                        <div className="absolute inset-0 rounded-full shadow-inner shadow-white/10"></div>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-bold text-white truncate">{coin.CoinInfo.FullName}</span>
                        <span className="text-xs text-slate-500 font-medium uppercase tracking-tighter">{coin.CoinInfo.Name}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="font-bold text-slate-200">{price}</span>
                  </td>
                  <td className="px-6 py-4 text-right font-bold">
                    <div className={`inline-flex items-center gap-1 ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      <span>{Math.abs(parseFloat(changeStr)).toFixed(2)}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right text-slate-400 hidden lg:table-cell font-medium">
                    {mktCap}
                  </td>
                  <td className="px-6 py-4 text-right text-slate-500 hidden xl:table-cell font-mono text-xs">
                    {volume}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
