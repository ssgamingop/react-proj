import React, { useEffect, useState } from 'react';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { cryptoApi } from '../services/api';
import { Plus, Trash2, TrendingDown, TrendingUp, Wallet } from 'lucide-react';

export const PortfolioDashboard: React.FC = () => {
  const { assets, addAsset, removeAsset } = usePortfolioStore();
  const [currentPrices, setCurrentPrices] = useState<Record<string, number>>({});
  
  const [isAdding, setIsAdding] = useState(false);
  
  const [newAsset, setNewAsset] = useState({ symbol: '', amount: '', price: '' });

  useEffect(() => {
    const fetchPrices = async () => {
      const symbols = [...new Set(assets.map(a => a.coinSymbol))];
      if (symbols.length === 0) return;
      
      
      try {
        const data = await cryptoApi.getPrices(symbols);
        if (data.RAW) {
          const prices: Record<string, number> = {};
          for (const [symbol, info] of Object.entries(data.RAW)) {
             // @ts-ignore
            prices[symbol] = info.USD.PRICE;
          }
          setCurrentPrices(prices);
        }
      } catch (error) {
        console.error("Failed to fetch portfolio prices", error);
      } finally {
        
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 60000); // update every minute
    return () => clearInterval(interval);
  }, [assets]);

  const handleAddAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAsset.symbol || !newAsset.amount || !newAsset.price) return;
    
    addAsset({
      coinSymbol: newAsset.symbol.toUpperCase(),
      amount: parseFloat(newAsset.amount),
      buyPrice: parseFloat(newAsset.price),
    });
    
    setNewAsset({ symbol: '', amount: '', price: '' });
    setIsAdding(false);
  };

  const totalValue = assets.reduce((total, asset) => {
    const currentPrice = currentPrices[asset.coinSymbol] || asset.buyPrice;
    return total + (currentPrice * asset.amount);
  }, 0);

  const totalCost = assets.reduce((total, asset) => total + (asset.buyPrice * asset.amount), 0);
  const totalProfit = totalValue - totalCost;
  const profitPercentage = totalCost > 0 ? (totalProfit / totalCost) * 100 : 0;
  const isProfitPositive = totalProfit >= 0;

  return (
    <div className="bg-slate-800 rounded-lg shadow-lg p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Wallet className="w-6 h-6 text-primary" />
          Portfolio
        </h2>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-primary hover:bg-primary/90 text-white p-2 rounded-lg transition-colors flex items-center gap-1 text-sm font-medium"
        >
          <Plus className="w-4 h-4" /> Add Asset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-700">
          <p className="text-slate-400 text-sm mb-1">Total Balance</p>
          <p className="text-2xl font-bold text-white">
            ${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
        <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-700 md:col-span-2">
          <p className="text-slate-400 text-sm mb-1">Total Profit/Loss</p>
          <div className="flex items-center gap-3">
            <p className={`text-2xl font-bold ${isProfitPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
              {isProfitPositive ? '+' : ''}${totalProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <div className={`flex items-center text-sm font-medium px-2 py-1 rounded ${isProfitPositive ? 'bg-emerald-400/10 text-emerald-400' : 'bg-rose-400/10 text-rose-400'}`}>
              {isProfitPositive ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
              {Math.abs(profitPercentage).toFixed(2)}%
            </div>
          </div>
        </div>
      </div>

      {isAdding && (
        <form onSubmit={handleAddAsset} className="bg-slate-700/30 p-4 rounded-lg border border-slate-600 mb-6 flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[120px]">
            <label className="block text-xs text-slate-400 mb-1">Coin Symbol</label>
            <input 
              type="text" 
              placeholder="e.g. BTC" 
              value={newAsset.symbol}
              onChange={e => setNewAsset({...newAsset, symbol: e.target.value})}
              className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              required 
            />
          </div>
          <div className="flex-1 min-w-[120px]">
            <label className="block text-xs text-slate-400 mb-1">Amount</label>
            <input 
              type="number" 
              placeholder="0.00" 
              step="any"
              value={newAsset.amount}
              onChange={e => setNewAsset({...newAsset, amount: e.target.value})}
              className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              required 
            />
          </div>
          <div className="flex-1 min-w-[120px]">
            <label className="block text-xs text-slate-400 mb-1">Buy Price ($)</label>
            <input 
              type="number" 
              placeholder="0.00" 
              step="any"
              value={newAsset.price}
              onChange={e => setNewAsset({...newAsset, price: e.target.value})}
              className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              required 
            />
          </div>
          <button type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2 px-4 rounded h-[42px] transition-colors">
            Save
          </button>
        </form>
      )}

      {assets.length === 0 ? (
        <div className="text-center text-slate-500 py-8">
          No assets in your portfolio. Add some to start tracking!
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="text-xs uppercase text-slate-500 border-b border-slate-700">
              <tr>
                <th className="pb-3 font-medium">Asset</th>
                <th className="pb-3 font-medium">Balance</th>
                <th className="pb-3 font-medium">Price</th>
                <th className="pb-3 font-medium">Avg. Buy</th>
                <th className="pb-3 font-medium">Profit/Loss</th>
                <th className="pb-3 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {assets.map((asset) => {
                const currentPrice = currentPrices[asset.coinSymbol];
                const value = asset.amount * (currentPrice || asset.buyPrice);
                const cost = asset.amount * asset.buyPrice;
                const profit = value - cost;
                const profitPct = cost > 0 ? (profit / cost) * 100 : 0;
                const isAssetProfit = profit >= 0;

                return (
                  <tr key={asset.id} className="group hover:bg-slate-700/20">
                    <td className="py-3 font-bold text-white">{asset.coinSymbol}</td>
                    <td className="py-3">
                      <div>${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                      <div className="text-xs text-slate-500">{asset.amount} {asset.coinSymbol}</div>
                    </td>
                    <td className="py-3">
                      {currentPrice ? `$${currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}` : 'Loading...'}
                    </td>
                    <td className="py-3">${asset.buyPrice.toLocaleString()}</td>
                    <td className={`py-3 font-medium ${isAssetProfit ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {isAssetProfit ? '+' : ''}${profit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      <span className="text-xs ml-1 opacity-70">({isAssetProfit ? '+' : ''}{profitPct.toFixed(2)}%)</span>
                    </td>
                    <td className="py-3 text-right">
                      <button 
                        onClick={() => removeAsset(asset.id)}
                        className="text-slate-500 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-all p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
