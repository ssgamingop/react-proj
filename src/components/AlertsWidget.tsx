import React, { useEffect, useState } from 'react';
import { useAlertsStore } from '../store/useAlertsStore';
import { cryptoApi } from '../services/api';
import toast from 'react-hot-toast';
import { Bell, BellRing, Plus, Trash2 } from 'lucide-react';

export const AlertsWidget: React.FC = () => {
  const { alerts, addAlert, removeAlert, toggleAlertActive } = useAlertsStore();
  const [newSymbol, setNewSymbol] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newCondition, setNewCondition] = useState<'above' | 'below'>('above');
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const checkAlerts = async () => {
      const activeAlerts = alerts.filter(a => a.isActive);
      if (activeAlerts.length === 0) return;

      const symbols = [...new Set(activeAlerts.map(a => a.coinSymbol))];
      try {
        const data = await cryptoApi.getPrices(symbols);
        if (data.RAW) {
          activeAlerts.forEach(alert => {
            // @ts-ignore
            const currentPrice = data.RAW[alert.coinSymbol]?.USD?.PRICE;
            if (!currentPrice) return;

            const triggered = 
              (alert.condition === 'above' && currentPrice >= alert.targetPrice) ||
              (alert.condition === 'below' && currentPrice <= alert.targetPrice);

            if (triggered) {
              toast.success(
                `${alert.coinSymbol} has gone ${alert.condition} $${alert.targetPrice}!`,
                { duration: 6000, icon: '🔔' }
              );
              toggleAlertActive(alert.id);
            }
          });
        }
      } catch (error) {
        console.error("Failed to check alerts", error);
      }
    };

    const interval = setInterval(checkAlerts, 20000);
    return () => clearInterval(interval);
  }, [alerts, toggleAlertActive]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSymbol || !newPrice) return;

    addAlert({
      coinSymbol: newSymbol.toUpperCase(),
      targetPrice: parseFloat(newPrice),
      condition: newCondition,
    });
    setNewSymbol('');
    setNewPrice('');
    setIsAdding(false);
  };

  return (
    <div className="bg-white/80 dark:bg-[#131722]/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800/60 rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.02)] dark:shadow-none p-6 transition-colors hover:shadow-md duration-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2 tracking-tight">
          <div className="bg-emerald-100 dark:bg-emerald-400/10 p-1.5 rounded-xl">
            <Bell className="w-5 h-5 text-emerald-500 fill-emerald-500/20" />
          </div>
          Price Alerts
        </h2>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="p-2 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 rounded-full transition-colors"
        >
          {isAdding ? <X className="w-4 h-4 text-slate-500" /> : <Plus className="w-4 h-4 text-slate-500" />}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="mb-6 p-5 bg-slate-50/50 dark:bg-black/20 border border-slate-200 dark:border-slate-800/80 rounded-2xl space-y-4 animate-in slide-in-from-top-2 shadow-sm">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Symbol</label>
              <input
                type="text"
                placeholder="BTC"
                value={newSymbol}
                onChange={e => setNewSymbol(e.target.value)}
                className="bg-white dark:bg-[#131722] border border-slate-200 dark:border-slate-800/60 rounded-xl px-4 py-2 text-slate-900 dark:text-white w-full outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-bold shadow-inner"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Target ($)</label>
              <input
                type="number"
                placeholder="0.00"
                step="any"
                value={newPrice}
                onChange={e => setNewPrice(e.target.value)}
                className="bg-white dark:bg-[#131722] border border-slate-200 dark:border-slate-800/60 rounded-xl px-4 py-2 text-slate-900 dark:text-white w-full outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-bold shadow-inner"
                required
              />
            </div>
          </div>
          <div className="flex gap-3">
            <select
              value={newCondition}
              onChange={e => setNewCondition(e.target.value as 'above' | 'below')}
              className="bg-white dark:bg-[#131722] border border-slate-200 dark:border-slate-800/60 rounded-xl px-4 py-2 text-slate-900 dark:text-white flex-1 outline-none text-xs font-bold appearance-none cursor-pointer shadow-inner"
            >
              <option value="above">Above Target</option>
              <option value="below">Below Target</option>
            </select>
            <button type="submit" className="bg-gradient-to-r from-primary to-indigo-600 hover:from-primary-dark hover:to-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold text-xs transition-all shadow-[0_0_15px_rgba(99,102,241,0.3)] hover:-translate-y-0.5">
              Create
            </button>
          </div>
        </form>
      )}

      {alerts.length === 0 ? (
        <div className="text-center py-6 px-4 border-2 border-dashed border-slate-200 dark:border-slate-800/60 rounded-xl">
          <p className="text-slate-500 dark:text-slate-600 text-xs font-bold uppercase tracking-widest">No Active Alerts</p>
        </div>
      ) : (
        <div className="space-y-3">
          {alerts.map(alert => (
            <div 
              key={alert.id} 
              className={`group flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer ${
                alert.isActive 
                  ? 'bg-emerald-50 dark:bg-emerald-400/5 border-emerald-100 dark:border-emerald-500/20' 
                  : 'bg-slate-50/50 dark:bg-black/20 border-slate-100 dark:border-slate-800/80 hover:bg-white dark:hover:bg-white/5 shadow-sm'
              }`}
              onClick={() => toggleAlertActive(alert.id)}
            >
              <div className="flex items-center gap-4">
                <button 
                  className={`w-10 h-10 flex items-center justify-center rounded-xl transition-colors shrink-0 ${
                    alert.isActive 
                      ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]' 
                      : 'bg-white dark:bg-[#131722] text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-800/60'
                  }`}
                >
                  {alert.isActive ? <BellRing className="w-4 h-4 fill-emerald-500/20" /> : <Bell className="w-4 h-4" />}
                </button>
                <div className="flex flex-col">
                  <span className="font-extrabold text-slate-900 dark:text-white text-base tracking-tight leading-none">{alert.coinSymbol}</span>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">
                    {alert.condition === 'above' ? 'Higher than' : 'Lower than'} <span className="text-slate-700 dark:text-slate-300">${alert.targetPrice.toLocaleString()}</span>
                  </span>
                </div>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  removeAlert(alert.id);
                }} 
                className="p-2 text-slate-400 hover:text-rose-600 dark:text-slate-600 dark:hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl transition-all opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
