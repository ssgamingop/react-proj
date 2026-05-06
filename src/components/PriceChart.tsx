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
    <div className="bg-slate-800 rounded-lg shadow-lg p-4 h-96 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">{symbol} Price History</h2>
        <div className="flex gap-2">
          {[7, 30, 90].map((days) => (
            <button
              key={days}
              onClick={() => setTimeRange(days)}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                timeRange === days
                  ? 'bg-primary text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {days}D
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex-1 w-full relative">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center text-slate-400 bg-slate-800/50 z-10">
            Loading chart data...
          </div>
        ) : null}
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="date" 
              stroke="#64748b" 
              fontSize={12} 
              tickLine={false}
              axisLine={false}
              minTickGap={30}
            />
            <YAxis 
              domain={['auto', 'auto']} 
              stroke="#64748b" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <Tooltip
              contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
              itemStyle={{ color: '#3b82f6' }}
              formatter={(value: any) => [`$${Number(value).toLocaleString()}`, 'Price']}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke="var(--color-primary)"
              fillOpacity={1}
              fill="url(#colorPrice)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
