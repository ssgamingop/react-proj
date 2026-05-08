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

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-sm p-6 h-[420px] flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="bg-primary/20 text-primary px-2 py-0.5 rounded text-sm font-mono">{symbol}</span>
            Price History
          </h2>
          <p className="text-xs text-slate-500 mt-1 font-medium uppercase tracking-wider">Live data via CryptoCompare</p>
        </div>
        <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex gap-1">
          {[7, 30, 90].map((days) => (
            <button
              key={days}
              onClick={() => setTimeRange(days)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                timeRange === days
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                  : 'text-slate-500 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              {days === 7 ? '1W' : days === 30 ? '1M' : '3M'}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex-1 w-full relative">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center text-slate-400 bg-slate-950/20 backdrop-blur-[2px] z-10 rounded-xl">
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-600">Loading</span>
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
              stroke="#475569" 
              fontSize={11} 
              tickLine={false}
              axisLine={false}
              minTickGap={40}
              dy={10}
            />
            <YAxis 
              domain={['auto', 'auto']} 
              stroke="#475569" 
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
              dx={-10}
            />
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <Tooltip
              contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.5)' }}
              itemStyle={{ color: '#818cf8', fontWeight: 'bold' }}
              labelStyle={{ color: '#94a3b8', marginBottom: '4px', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase' }}
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
