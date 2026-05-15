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
    <div className="bg-white dark:bg-[#131722] border border-slate-200 dark:border-slate-800/60 rounded-2xl shadow-sm p-6 transition-colors">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <div className="bg-emerald-100 dark:bg-emerald-400/10 p-1.5 rounded-lg">
            <Bell className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          Price Alerts
        </h2>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-slate-50 hover:bg-slate-100 dark:bg-white/5 dark:hover:bg-white/10 p-2 rounded-xl border border-slate-200 dark:border-white/5 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-4 rounded-xl mb-6 space-y-4 shadow-sm">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Symbol</label>
              <input
                type="text"
                placeholder="BTC"
                value={newSymbol}
                onChange={e => setNewSymbol(e.target.value)}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-slate-900 dark:text-white w-full outline-none focus:border-primary transition-colors text-sm font-bold"
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
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-slate-900 dark:text-white w-full outline-none focus:border-primary transition-colors text-sm font-bold"
                required
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={newCondition}
              onChange={e => setNewCondition(e.target.value as 'above' | 'below')}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-slate-900 dark:text-white flex-1 outline-none text-xs font-bold appearance-none cursor-pointer"
            >
              <option value="above">Above Target</option>
              <option value="below">Below Target</option>
            </select>
            <button type="submit" className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-bold text-xs transition-all shadow-md">
              Create
            </button>
          </div>
        </form>
      )}

      {alerts.length === 0 ? (
        <div className="text-center py-6 px-4 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
          <p className="text-slate-500 dark:text-slate-600 text-xs font-bold uppercase tracking-widest">No Active Alerts</p>
        </div>
      ) : (
        <div className="space-y-2">
          {alerts.map(alert => (
            <div key={alert.id} className="group flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-sm">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => toggleAlertActive(alert.id)} 
                  className={`p-1 rounded-lg transition-colors ${alert.isActive ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400' : 'bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-600'}`}
                >
                  {alert.isActive ? <BellRing className="w-3.5 h-3.5" /> : <Bell className="w-3.5 h-3.5" />}
                </button>
                <div className="flex flex-col">
                  <span className="font-bold text-slate-900 dark:text-white text-xs leading-none">{alert.coinSymbol}</span>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter mt-1">
                    {alert.condition === 'above' ? 'Higher than' : 'Lower than'} ${alert.targetPrice.toLocaleString()}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => removeAlert(alert.id)} 
                className="p-1.5 text-slate-400 hover:text-rose-600 dark:text-slate-700 dark:hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
