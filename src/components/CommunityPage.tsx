import { TerminalLayout } from './TerminalLayout';
import { Users, MessageSquare, Award, TrendingUp } from 'lucide-react';
import toast from 'react-hot-toast';

export const CommunityPage = () => {
  const showDevToast = () => toast('This feature is currently under development.', { icon: '🚧' });

  return (
    <TerminalLayout>
      <div className="flex flex-col gap-6 max-w-[1600px] mx-auto h-full animate-in fade-in duration-500">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3 tracking-tight mb-2">
              <div className="bg-orange-500/10 dark:bg-orange-500/20 p-2.5 rounded-2xl">
                <Users className="w-8 h-8 text-orange-500" />
              </div>
              Community Pulse
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-bold">See what top traders are doing and discuss market trends.</p>
          </div>
          <button onClick={showDevToast} className="bg-primary hover:bg-primary-dark text-white rounded-xl px-6 py-2.5 text-sm font-extrabold flex items-center gap-2 transition-colors shadow-[0_0_15px_rgba(99,102,241,0.3)]">
            <MessageSquare className="w-4 h-4" /> Start Discussion
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 flex flex-col gap-6">
             <div className="bg-white/80 dark:bg-[#131722]/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800/60 rounded-3xl p-6 shadow-sm">
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-500" /> Top Analyst Predictions
                </h3>
                
                <div className="space-y-4">
                   {[1, 2, 3].map(i => (
                     <div key={i} className="flex gap-4 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-white/[0.02] hover:bg-slate-100 dark:hover:bg-white/[0.04] transition-colors cursor-pointer group">
                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full shrink-0 border-2 border-white dark:border-slate-800 flex items-center justify-center text-white font-bold shadow-md">
                          A{i}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-extrabold text-slate-900 dark:text-white tracking-tight">Analyst_{i}00</h4>
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{i * 2}h ago</span>
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-300 font-medium mt-1 mb-3">If BTC holds the 4H 200 EMA here, we're likely looking at a breakout towards the $72k liquidity pool before the weekend. Volume is starting to pick up on the perp exchanges.</p>
                          <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                            <span className="flex items-center gap-1 hover:text-emerald-500 transition-colors"><TrendingUp className="w-4 h-4" /> Bullish (124)</span>
                            <span className="flex items-center gap-1 hover:text-primary transition-colors"><MessageSquare className="w-4 h-4" /> 32 Replies</span>
                          </div>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          </div>
          
          <div className="flex flex-col gap-6">
            <div className="bg-gradient-to-br from-orange-500/10 to-rose-500/10 dark:from-orange-500/5 dark:to-rose-500/5 backdrop-blur-xl border border-orange-500/20 rounded-3xl p-6 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 p-6 opacity-10">
                 <Award className="w-32 h-32 text-orange-500" />
               </div>
               <div className="relative z-10">
                 <h3 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">Trader Leaderboard</h3>
                 <p className="text-xs font-bold text-slate-500 mb-6">Top performing public portfolios this week.</p>
                 
                 <div className="space-y-4">
                   {[
                     { name: "CryptoWhale", pnl: "+42.5%", color: "text-emerald-500" },
                     { name: "DeFi_Degen", pnl: "+28.1%", color: "text-emerald-500" },
                     { name: "Satoshi_Nakamoto", pnl: "+15.3%", color: "text-emerald-500" },
                     { name: "Bear_Market_Survivor", pnl: "-4.2%", color: "text-rose-500" },
                   ].map((trader, i) => (
                     <div key={i} className="flex items-center justify-between">
                       <div className="flex items-center gap-3">
                         <div className="text-[10px] font-extrabold text-slate-400 w-4 text-center">{i + 1}</div>
                         <div className="font-extrabold text-sm text-slate-900 dark:text-white">{trader.name}</div>
                       </div>
                       <div className={`font-extrabold text-sm ${trader.color}`}>{trader.pnl}</div>
                     </div>
                   ))}
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </TerminalLayout>
  );
};
