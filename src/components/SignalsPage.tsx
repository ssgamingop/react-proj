import { TerminalLayout } from './TerminalLayout';
import { Radio, Crosshair, TrendingUp, BarChart2 } from 'lucide-react';
import toast from 'react-hot-toast';

export const SignalsPage = () => {
  const showDevToast = () => toast('This feature is currently under development.', { icon: '🚧' });

  return (
    <TerminalLayout>
      <div className="flex flex-col gap-6 max-w-[1600px] mx-auto h-full animate-in fade-in duration-500">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3 tracking-tight mb-2">
              <div className="bg-purple-500/10 dark:bg-purple-500/20 p-2.5 rounded-2xl">
                <Radio className="w-8 h-8 text-purple-500" />
              </div>
              Trading Signals
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-bold">Algorithmic trading signals and momentum indicators.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white/80 dark:bg-[#131722]/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800/60 rounded-3xl p-6 shadow-sm min-h-[500px]">
             <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">Active Signals</h3>
             
             <div className="space-y-4">
                {[
                  { pair: "BTC/USDT", signal: "STRONG BUY", indicator: "MACD Crossover", timeframe: "4H", accuracy: "84%" },
                  { pair: "ETH/USDT", signal: "SELL", indicator: "RSI Divergence", timeframe: "1H", accuracy: "76%" },
                  { pair: "SOL/USDT", signal: "BUY", indicator: "Moving Average Breakout", timeframe: "1D", accuracy: "89%" },
                  { pair: "AVAX/USDT", signal: "NEUTRAL", indicator: "Bollinger Bands Squeeze", timeframe: "4H", accuracy: "65%" },
                ].map((signal, i) => (
                  <div key={i} onClick={showDevToast} className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-white/[0.02] hover:bg-slate-100 dark:hover:bg-white/[0.04] transition-colors group cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="bg-slate-200/50 dark:bg-slate-800 p-3 rounded-xl">
                        <Crosshair className="w-5 h-5 text-slate-500 group-hover:text-primary transition-colors" />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-slate-900 dark:text-white tracking-tight">{signal.pair}</h4>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">{signal.indicator}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="hidden md:block text-right">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Timeframe</p>
                        <p className="font-extrabold text-slate-900 dark:text-white">{signal.timeframe}</p>
                      </div>
                      <div className="hidden md:block text-right">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Historical Accuracy</p>
                        <p className="font-extrabold text-slate-900 dark:text-white">{signal.accuracy}</p>
                      </div>
                      <div className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest ${
                        signal.signal.includes('BUY') ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                        signal.signal.includes('SELL') ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' :
                        'bg-slate-500/10 text-slate-500 border border-slate-500/20'
                      }`}>
                        {signal.signal}
                      </div>
                    </div>
                  </div>
                ))}
             </div>
          </div>
          
          <div className="flex flex-col gap-6">
             <div className="bg-white/80 dark:bg-[#131722]/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800/60 rounded-3xl p-6 shadow-sm">
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" /> Market Sentiment
                </h3>
                <div className="h-48 flex items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-800/60 rounded-2xl">
                  <p className="text-slate-400 font-bold text-sm">Fear & Greed Index Gauge</p>
                </div>
             </div>
             
             <div className="bg-white/80 dark:bg-[#131722]/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800/60 rounded-3xl p-6 shadow-sm flex-1">
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight mb-4 flex items-center gap-2">
                  <BarChart2 className="w-5 h-5 text-indigo-500" /> Volume Profile
                </h3>
                <div className="h-48 flex items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-800/60 rounded-2xl">
                  <p className="text-slate-400 font-bold text-sm">Real-time volume analysis</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </TerminalLayout>
  );
};
