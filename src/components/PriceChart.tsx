import React, { useEffect, useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { cryptoApi } from '../services/api';

interface PriceChartProps {
  symbol?: string;
}

export const PriceChart: React.FC<PriceChartProps> = ({ symbol = 'BTC' }) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState(30);

  useEffect(() => {
    const fetchChartData = async () => {
      setLoading(true);
      try {
        const result = await cryptoApi.getHistoricalData(symbol, timeRange);
        if (result.Data && result.Data.Data) {
          const formattedData = result.Data.Data.map((item: any) => {
            const date = new Date(item.time * 1000);
            return {
              date: date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
              price: item.close,
            };
          });
          setData(formattedData);
        }
      } catch (error) {
        console.error("Failed to fetch historical data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, [symbol, timeRange]);

  // Handle light/dark mode colors for Recharts dynamically or use CSS vars
  // Since Recharts doesn't natively support Tailwind classes well for SVG elements without extra config,
  // we'll rely on the parent wrapper mostly. We'll use slate-400 for text which works in both.

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-6 h-[420px] flex flex-col transition-colors">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="bg-primary/10 dark:bg-primary/20 text-primary px-2 py-0.5 rounded text-sm font-mono">{symbol}</span>
            Price History
          </h2>
          <p className="text-xs text-slate-500 mt-1 font-medium uppercase tracking-wider">Live data via CryptoCompare</p>
        </div>
        <div className="bg-slate-50 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800 flex gap-1">
          {[7, 30, 90].map((days) => (
            <button
              key={days}
              onClick={() => setTimeRange(days)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                timeRange === days
                  ? 'bg-primary text-white shadow-md'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white dark:hover:bg-white/5'
              }`}
            >
              {days === 7 ? '1W' : days === 30 ? '1M' : '3M'}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex-1 w-full relative">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center text-slate-400 bg-white/50 dark:bg-slate-950/20 backdrop-blur-[2px] z-10 rounded-xl">
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-600">Loading</span>
            </div>
          </div>
        ) : null}
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="date" 
              stroke="#64748b" 
              fontSize={11} 
              tickLine={false}
              axisLine={false}
              minTickGap={40}
              dy={10}
            />
            <YAxis 
              domain={['auto', 'auto']} 
              stroke="#64748b" 
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
              dx={-10}
            />
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.5} vertical={false} className="dark:opacity-20" />
            <Tooltip
              contentStyle={{ backgroundColor: 'var(--tw-colors-white, #fff)', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              itemStyle={{ color: '#6366f1', fontWeight: 'bold' }}
              labelStyle={{ color: '#64748b', marginBottom: '4px', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase' }}
              formatter={(value: any) => [`$${Number(value).toLocaleString()}`, 'Price']}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#6366f1"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorPrice)"
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
