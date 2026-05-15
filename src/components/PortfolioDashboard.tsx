import React, { useEffect, useState, useMemo } from 'react';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { useMarketStore } from '../store/useMarketStore';
import { cryptoApi } from '../services/api';
import { Plus, Trash2, TrendingDown, TrendingUp, Wallet, PieChart as PieChartIcon, BarChart3 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#06b6d4'];

export const PortfolioDashboard: React.FC = () => {
  const { assets, addAsset, removeAsset } = usePortfolioStore();
  const { prices: wsPrices } = useMarketStore();
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
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);
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

  const totals = useMemo(() => {
    const value = assets.reduce((total, asset) => {
      const currentPrice = wsPrices[asset.coinSymbol]?.price || currentPrices[asset.coinSymbol] || asset.buyPrice;
      return total + (currentPrice * asset.amount);
    }, 0);

    const cost = assets.reduce((total, asset) => total + (asset.buyPrice * asset.amount), 0);
    const profit = value - cost;
    const profitPct = cost > 0 ? (profit / cost) * 100 : 0;

    return { value, cost, profit, profitPct };
  }, [assets, currentPrices, wsPrices]);

  const chartData = useMemo(() => {
    return assets.map(asset => {
      const currentPrice = wsPrices[asset.coinSymbol]?.price || currentPrices[asset.coinSymbol] || asset.buyPrice;
      return {
        name: asset.coinSymbol,
        value: asset.amount * currentPrice
      };
    }).sort((a, b) => b.value - a.value);
  }, [assets, currentPrices, wsPrices]);

  const isProfitPositive = totals.profit >= 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3 tracking-tight">
            <div className="bg-primary/10 dark:bg-primary/20 p-2 rounded-xl">
              <Wallet className="w-6 h-6 text-primary" />
            </div>
            Portfolio Overview
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 font-medium">Manage and track your crypto holdings</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-gradient-to-r from-primary to-indigo-600 hover:from-primary-dark hover:to-indigo-700 text-white px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 text-sm font-bold shadow-[0_0_15px_rgba(99,102,241,0.3)] hover:-translate-y-0.5"
        >
          <Plus className="w-4 h-4" /> Add Asset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/80 dark:bg-[#131722]/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800/60 p-6 rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.02)] dark:shadow-none transition-colors hover:shadow-md group">
          <p className="text-[11px] text-slate-500 dark:text-slate-500 font-bold uppercase tracking-widest mb-2">Total Balance</p>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            ${totals.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center gap-2">
            <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">Invested: <span className="text-slate-700 dark:text-slate-300">${totals.cost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></span>
          </div>
        </div>
        
        <div className="bg-white/80 dark:bg-[#131722]/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800/60 p-6 rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.02)] dark:shadow-none md:col-span-2 flex flex-col justify-between transition-colors hover:shadow-md group">
          <p className="text-[11px] text-slate-500 dark:text-slate-500 font-bold uppercase tracking-widest mb-2">Total Profit / Loss</p>
          <div className="flex items-end justify-between">
            <div className="space-y-1">
              <p className={`text-4xl font-extrabold tracking-tight ${isProfitPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
                {isProfitPositive ? '+' : ''}${Math.abs(totals.profit).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <div className={`inline-flex items-center text-sm font-bold px-2.5 py-1 rounded-xl mt-2 ${isProfitPositive ? 'bg-emerald-100/50 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400' : 'bg-rose-100/50 text-rose-600 dark:bg-rose-400/10 dark:text-rose-400'}`}>
                {isProfitPositive ? <TrendingUp className="w-4 h-4 mr-1.5" /> : <TrendingDown className="w-4 h-4 mr-1.5" />}
                {Math.abs(totals.profitPct).toFixed(2)}%
              </div>
            </div>
            
            <div className="h-20 w-32 hidden sm:block relative overflow-hidden rounded-xl bg-slate-50/50 dark:bg-black/20 border border-slate-100 dark:border-slate-800/80 flex items-center justify-center">
               <BarChart3 className={`w-8 h-8 opacity-20 ${isProfitPositive ? 'text-emerald-500' : 'text-rose-500'}`} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white/80 dark:bg-[#131722]/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800/60 rounded-3xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.02)] dark:shadow-none transition-colors">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800/60 flex justify-between items-center">
            <h3 className="font-extrabold text-xl text-slate-900 dark:text-white flex items-center gap-2 tracking-tight">
              <div className="bg-primary/10 p-1.5 rounded-lg">
                 <BarChart3 className="w-5 h-5 text-primary" />
              </div>
              Your Assets
            </h3>
          </div>
          <div className="table-container overflow-x-auto scrollbar-hide">
            <table className="w-full text-left text-sm border-collapse min-w-[500px]">
              <thead className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 bg-slate-50/50 dark:bg-slate-800/20 border-b border-slate-200 dark:border-slate-800/60">
                <tr>
                  <th className="px-6 py-5 whitespace-nowrap">Asset</th>
                  <th className="px-6 py-5 text-right whitespace-nowrap">Balance</th>
                  <th className="px-6 py-5 text-right whitespace-nowrap">Price</th>
                  <th className="px-6 py-5 text-right whitespace-nowrap">Avg. Buy</th>
                  <th className="px-6 py-5 text-right whitespace-nowrap">P/L</th>
                  <th className="px-6 py-5"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40">
                {assets.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center text-slate-500 border-2 border-dashed border-slate-200 dark:border-slate-800/60 m-6 rounded-2xl">
                      <div className="flex flex-col items-center justify-center">
                        <Wallet className="w-8 h-8 mb-3 opacity-20" />
                        <span className="text-sm font-bold tracking-tight">No assets found</span>
                        <span className="text-xs mt-1 text-slate-400">Click "Add Asset" to begin</span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  assets.map((asset) => {
                    const liveData = wsPrices[asset.coinSymbol];
                    const currentPrice = liveData?.price || currentPrices[asset.coinSymbol];
                    const val = asset.amount * (currentPrice || asset.buyPrice);
                    const cost = asset.amount * asset.buyPrice;
                    const profit = val - cost;
                    const profitPct = cost > 0 ? (profit / cost) * 100 : 0;
                    const isAssetProfit = profit >= 0;
                    
                    const priceColor = liveData?.direction === 'up' ? 'text-emerald-500 dark:text-emerald-400' : liveData?.direction === 'down' ? 'text-rose-500 dark:text-rose-400' : 'text-slate-600 dark:text-slate-300';

                    return (
                      <tr key={asset.id} className="group hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                             {asset.coinSymbol}
                             <div className={`w-1.5 h-1.5 rounded-full ${isAssetProfit ? 'bg-emerald-500' : 'bg-rose-500'} ${liveData ? 'animate-pulse' : ''}`}></div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right whitespace-nowrap">
                          <div className="font-extrabold text-slate-900 dark:text-white">${val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                          <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">{asset.amount} {asset.coinSymbol}</div>
                        </td>
                        <td className={`px-6 py-4 text-right whitespace-nowrap font-bold transition-colors duration-300 ${priceColor}`}>
                          {currentPrice ? `$${currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}` : '—'}
                        </td>
                        <td className="px-6 py-4 text-right text-slate-500 dark:text-slate-400 whitespace-nowrap font-bold">
                          ${asset.buyPrice.toLocaleString()}
                        </td>
                        <td className={`px-6 py-4 text-right font-bold whitespace-nowrap ${isAssetProfit ? 'text-emerald-500' : 'text-rose-500'}`}>
                          <div className="flex flex-col items-end">
                            <span className="flex items-center gap-1">{isAssetProfit ? '+' : ''}{profitPct.toFixed(2)}%</span>
                            <span className="text-[10px] opacity-80 font-bold uppercase tracking-widest mt-0.5">
                              {isAssetProfit ? '+' : ''}${Math.abs(profit).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right whitespace-nowrap">
                          <button 
                            onClick={() => removeAsset(asset.id)}
                            className="text-slate-400 dark:text-slate-600 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors p-2 rounded-xl opacity-0 group-hover:opacity-100"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-[#131722]/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800/60 rounded-3xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)] dark:shadow-none transition-colors relative overflow-hidden group">
          <div className="absolute bottom-[-20%] right-[-20%] w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none group-hover:bg-primary/10 transition-colors" />
          <h3 className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white flex items-center gap-2 mb-6 relative z-10">
            <div className="bg-primary/10 p-1.5 rounded-lg">
              <PieChartIcon className="w-5 h-5 text-primary" />
            </div>
            Asset Allocation
          </h3>
          <div className="h-[280px] w-full relative z-10">
            {assets.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={95}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {chartData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--tw-colors-slate-900)', border: '1px solid var(--tw-colors-slate-800)', borderRadius: '12px', color: '#fff', fontWeight: 'bold' }}
                    itemStyle={{ color: '#fff' }}
                    formatter={(value: any) => [`$${Number(value).toLocaleString()}`, 'Value']}
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '11px', fontWeight: 'bold' }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 text-sm">
                <PieChartIcon className="w-12 h-12 mb-3 opacity-20" />
                <p className="font-bold tracking-tight">No allocation data</p>
                <p className="text-xs mt-1 text-slate-400">Add assets to view</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {isAdding && (
        <div className="fixed inset-0 bg-slate-900/50 dark:bg-slate-950/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <form 
            onSubmit={handleAddAsset} 
            className="bg-white dark:bg-[#131722] border border-slate-200 dark:border-slate-800/60 p-8 rounded-3xl shadow-2xl max-w-md w-full space-y-6"
          >
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Add New Asset</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Enter the details of your purchase</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Coin Symbol</label>
                <input 
                  type="text" 
                  placeholder="e.g. BTC" 
                  value={newAsset.symbol}
                  onChange={e => setNewAsset({...newAsset, symbol: e.target.value})}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white outline-none focus:border-primary transition-colors font-medium"
                  required 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Amount</label>
                  <input 
                    type="number" 
                    placeholder="0.00" 
                    step="any"
                    value={newAsset.amount}
                    onChange={e => setNewAsset({...newAsset, amount: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white outline-none focus:border-primary transition-colors font-medium"
                    required 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Buy Price ($)</label>
                  <input 
                    type="number" 
                    placeholder="0.00" 
                    step="any"
                    value={newAsset.price}
                    onChange={e => setNewAsset({...newAsset, price: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white outline-none focus:border-primary transition-colors font-medium"
                    required 
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button 
                type="button"
                onClick={() => setIsAdding(false)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold py-3 px-4 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="flex-1 bg-primary hover:bg-primary-dark text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all"
              >
                Add to Portfolio
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
