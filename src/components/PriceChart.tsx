import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { cryptoApi } from '../services/api';

interface PriceChartProps {
  symbols?: string[];
}

const SYMBOL_COLORS: Record<string, string> = {
  'BTC': '#f59e0b', // Orange
  'ETH': '#6366f1', // Indigo
  'SOL': '#14b8a6', // Teal
  'BNB': '#eab308', // Yellow
  'ADA': '#3b82f6', // Blue
  'XRP': '#06b6d4', // Cyan
  'DOGE': '#d97706', // Amber
};

const PriceChartComponent: React.FC<PriceChartProps> = ({ symbols = ['BTC', 'ETH', 'SOL'] }) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState(30);

  useEffect(() => {
    const fetchChartData = async () => {
      if (data.length === 0) setLoading(true);
      try {
        const promises = symbols.map(s => cryptoApi.getHistoricalData(s, timeRange));
        const results = await Promise.all(promises);
        
        const combinedData: Record<number, any> = {};
        
        results.forEach((result, index) => {
          const symbol = symbols[index];
          if (result.Data && result.Data.Data) {
            const rawData = result.Data.Data;
            const startPrice = rawData[0]?.close || 1;

            rawData.forEach((item: any) => {
              const timestamp = item.time;
              if (!combinedData[timestamp]) {
                const date = new Date(timestamp * 1000);
                combinedData[timestamp] = {
                  date: date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
                };
              }
              // Calculate percentage change from start of period
              const pctChange = ((item.close - startPrice) / startPrice) * 100;
              combinedData[timestamp][symbol] = parseFloat(pctChange.toFixed(2));
            });
          }
        });

        const formattedData = Object.values(combinedData).sort((a: any, b: any) => 
          new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        
        setData(formattedData);
      } catch (error) {
        console.error("Failed to fetch comparison data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, [symbols, timeRange]);

  return (
    <div className="bg-white dark:bg-[#131722] border border-slate-200 dark:border-slate-800/60 rounded-3xl shadow-sm p-6 h-[480px] flex flex-col transition-all">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2 tracking-tight">
            Competitive Performance
          </h2>
          <p className="text-xs text-slate-500 mt-1 font-bold uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            Normalized to % Change over {timeRange} Days
          </p>
        </div>
        <div className="bg-slate-50 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800 flex gap-1 self-end sm:self-auto">
          {[7, 30, 90].map((days) => (
            <button
              key={days}
              onClick={() => setTimeRange(days)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                timeRange === days
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
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
          <div className="absolute inset-0 flex items-center justify-center text-slate-400 bg-white/50 dark:bg-[#131722]/50 backdrop-blur-[4px] z-10 rounded-2xl">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Synchronizing</span>
            </div>
          </div>
        ) : null}
        
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.1} vertical={false} />
            <XAxis 
              dataKey="date" 
              stroke="#64748b" 
              fontSize={10} 
              tickLine={false}
              axisLine={false}
              minTickGap={30}
              dy={10}
              fontWeight="bold"
            />
            <YAxis 
              stroke="#64748b" 
              fontSize={10}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value > 0 ? '+' : ''}${value}%`}
              dx={-5}
              fontWeight="bold"
            />
            <Tooltip
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                backdropFilter: 'blur(8px)',
                border: '1px solid #e2e8f0', 
                borderRadius: '16px', 
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                padding: '12px'
              }}
              itemStyle={{ fontWeight: '800', fontSize: '12px' }}
              labelStyle={{ color: '#64748b', marginBottom: '8px', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}
              formatter={(value: any) => [`${value > 0 ? '+' : ''}${value}%`, '']}
            />
            <Legend 
              verticalAlign="top" 
              height={36} 
              iconType="circle"
              wrapperStyle={{ 
                fontSize: '11px', 
                fontWeight: 'bold', 
                textTransform: 'uppercase', 
                letterSpacing: '0.05em',
                paddingBottom: '20px'
              }}
            />
            {symbols.map((s, i) => (
              <Line
                key={s}
                type="monotone"
                dataKey={s}
                stroke={SYMBOL_COLORS[s] || `hsl(${i * 137.5}, 70%, 50%)`}
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6, strokeWidth: 0 }}
                animationDuration={1500}
                connectNulls
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export const PriceChart = React.memo(PriceChartComponent);

