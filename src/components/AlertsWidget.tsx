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
                `${alert.coinSymbol} has gone ${alert.condition} $${alert.targetPrice}! (Current: $${currentPrice})`,
                { duration: 6000, icon: '🔔' }
              );
              toggleAlertActive(alert.id); // Deactivate after triggering
            }
          });
        }
      } catch (error) {
        console.error("Failed to check alerts", error);
      }
    };

    const interval = setInterval(checkAlerts, 20000); // Check every 20 seconds
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
    <div className="bg-slate-800 rounded-lg shadow-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Bell className="w-5 h-5 text-primary" /> Alerts
        </h2>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="text-slate-400 hover:text-white transition-colors"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="bg-slate-700/30 p-3 rounded-lg border border-slate-600 mb-4 text-sm">
          <div className="grid grid-cols-2 gap-2 mb-2">
            <input
              type="text"
              placeholder="Coin (e.g. BTC)"
              value={newSymbol}
              onChange={e => setNewSymbol(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded px-2 py-1.5 text-white w-full"
              required
            />
            <input
              type="number"
              placeholder="Price ($)"
              step="any"
              value={newPrice}
              onChange={e => setNewPrice(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded px-2 py-1.5 text-white w-full"
              required
            />
          </div>
          <div className="flex gap-2 items-center">
            <select
              value={newCondition}
              onChange={e => setNewCondition(e.target.value as 'above' | 'below')}
              className="bg-slate-900 border border-slate-700 rounded px-2 py-1.5 text-white flex-1"
            >
              <option value="above">Goes Above</option>
              <option value="below">Goes Below</option>
            </select>
            <button type="submit" className="bg-primary hover:bg-primary/90 text-white px-3 py-1.5 rounded transition-colors">
              Add
            </button>
          </div>
        </form>
      )}

      {alerts.length === 0 ? (
        <div className="text-center text-slate-500 py-4 text-sm">
          No active alerts.
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {alerts.map(alert => (
            <div key={alert.id} className="flex items-center justify-between p-2 bg-slate-700/30 rounded border border-slate-700/50 text-sm">
              <div className="flex items-center gap-2">
                <button onClick={() => toggleAlertActive(alert.id)} className={`${alert.isActive ? 'text-emerald-400' : 'text-slate-500'}`}>
                  {alert.isActive ? <BellRing className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
                </button>
                <span className="font-bold text-white">{alert.coinSymbol}</span>
                <span className="text-slate-400">{alert.condition === 'above' ? '>' : '<'} ${alert.targetPrice.toLocaleString()}</span>
              </div>
              <button onClick={() => removeAlert(alert.id)} className="text-slate-500 hover:text-rose-400">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
