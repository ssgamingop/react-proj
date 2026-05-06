import React, { useEffect, useState } from 'react';
import { cryptoApi } from '../services/api';
import { useWatchlistStore } from '../store/useWatchlistStore';
import { Star, StarOff } from 'lucide-react';

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
    return <div className="p-4 text-center">Loading market data...</div>;
  }

  return (
    <div className="overflow-x-auto bg-slate-800 rounded-lg shadow-lg">
      <table className="w-full text-left text-sm text-slate-300">
        <thead className="bg-slate-700/50 text-xs uppercase">
          <tr>
            <th className="px-4 py-3">#</th>
            <th className="px-4 py-3">Coin</th>
            <th className="px-4 py-3">Price</th>
            <th className="px-4 py-3">24h Change</th>
            <th className="px-4 py-3">Market Cap</th>
            <th className="px-4 py-3">Volume (24h)</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-700">
          {coins.map((coin, index) => {
            const isFavorite = favorites.includes(coin.CoinInfo.Name);
            const price = coin.DISPLAY?.USD?.PRICE || '$0.00';
            const rawChange = coin.RAW?.USD?.CHANGEPCT24HOUR || 0;
            const changeStr = coin.DISPLAY?.USD?.CHANGEPCT24HOUR || '0.00';
            const mktCap = coin.DISPLAY?.USD?.MKTCAP || '$0.00';
            const volume = coin.DISPLAY?.USD?.VOLUME24HOURTO || '$0.00';
            const isPositive = rawChange >= 0;

            return (
              <tr key={coin.CoinInfo.Id} className="hover:bg-slate-700/30 transition-colors">
                <td className="px-4 py-3">
                  <button 
                    onClick={() => toggleFavorite(coin.CoinInfo.Name)}
                    className="focus:outline-none flex items-center justify-center w-6 h-6"
                  >
                    {isFavorite ? (
                      <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ) : (
                      <StarOff className="w-5 h-5 text-slate-500 hover:text-slate-300" />
                    )}
                  </button>
                </td>
                <td className="px-4 py-3 flex items-center gap-3">
                  <span className="w-6 text-slate-500">{index + 1}</span>
                  <img 
                    src={`https://www.cryptocompare.com${coin.CoinInfo.ImageUrl}`} 
                    alt={coin.CoinInfo.Name} 
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex flex-col">
                    <span className="font-bold text-white">{coin.CoinInfo.FullName}</span>
                    <span className="text-xs text-slate-400">{coin.CoinInfo.Name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 font-medium">{price}</td>
                <td className={`px-4 py-3 font-medium ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {isPositive ? '+' : ''}{changeStr}%
                </td>
                <td className="px-4 py-3 text-slate-300">{mktCap}</td>
                <td className="px-4 py-3 text-slate-400">{volume}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
