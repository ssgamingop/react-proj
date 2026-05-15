import { TerminalLayout } from './TerminalLayout';
import { MarketTable } from './MarketTable';
import { NewsWidget } from './NewsWidget';
import { WatchlistWidget } from './WatchlistWidget';
import { PriceChart } from './PriceChart';
import { AlertsWidget } from './AlertsWidget';

export const DashboardPage = () => {
  return (
    <TerminalLayout>
            fontSize: '13px',
            fontWeight: '600',
            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
          }
        }} 
      />
      
      <div className="flex flex-col gap-6 max-w-[1600px] mx-auto h-full animate-in fade-in duration-500">
        
        {/* KPI Banner Row (New Full Width row to fix small overview cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
           {/* KPI 1 */}
           <div className="bg-white/80 dark:bg-[#131722]/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800/60 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all group">
             <div className="flex justify-between items-start mb-4">
                <div className="bg-indigo-100 dark:bg-indigo-500/10 p-2.5 rounded-2xl">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                </div>
                <span className="flex items-center gap-1 text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-lg">↑ 2.1%</span>
             </div>
             <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-1">Global Market Cap</p>
             <p className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">$2.84<span className="text-slate-400">T</span></p>
           </div>
           
           {/* KPI 2 */}
           <div className="bg-white/80 dark:bg-[#131722]/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800/60 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all group">
             <div className="flex justify-between items-start mb-4">
                <div className="bg-emerald-100 dark:bg-emerald-500/10 p-2.5 rounded-2xl">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>
                </div>
                <span className="flex items-center gap-1 text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-lg">↑ 34.2%</span>
             </div>
             <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-1">24h Volume</p>
             <p className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">$183.2<span className="text-slate-400">B</span></p>
           </div>

           {/* KPI 3 */}
           <div className="bg-white/80 dark:bg-[#131722]/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800/60 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all group">
             <div className="flex justify-between items-start mb-4">
                <div className="bg-amber-100 dark:bg-amber-500/10 p-2.5 rounded-2xl">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                </div>
                <span className="flex items-center gap-1 text-xs font-bold text-rose-500 bg-rose-500/10 px-2 py-1 rounded-lg">↓ 0.2%</span>
             </div>
             <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-1">BTC Dominance</p>
             <p className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">58.4<span className="text-slate-400">%</span></p>
           </div>

           {/* KPI 4 */}
           <div className="bg-white/80 dark:bg-[#131722]/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800/60 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors" />
             <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="bg-primary/10 dark:bg-primary/20 p-2.5 rounded-2xl">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                </div>
             </div>
             <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-1 relative z-10">Fear & Greed</p>
             <div className="flex items-end gap-3 relative z-10">
                <p className="text-2xl font-extrabold text-emerald-500 tracking-tight">84</p>
                <p className="text-sm font-bold text-slate-400 mb-1">Extreme Greed</p>
             </div>
           </div>
        </div>

        {/* Main Split Row: Chart + News */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 min-h-[450px]">
          {/* Main Chart Area */}
          <div className="xl:col-span-8 flex flex-col">
            <PriceChart symbol="BTC" />
          </div>
          
          {/* Right Sidebar Area */}
          <div className="xl:col-span-4 flex flex-col">
            <div className="flex-1 min-h-[400px]">
              <NewsWidget />
            </div>
          </div>
        </div>

        {/* Middle Row: Market Table & Other Widgets */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          <div className="xl:col-span-8 flex flex-col">
            <div className="bg-white/80 dark:bg-[#131722]/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800/60 rounded-3xl overflow-hidden shadow-sm transition-colors h-full">
              <div className="p-6 border-b border-slate-200 dark:border-slate-800/60 flex items-center justify-between">
                <h3 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">Top Assets</h3>
                <button className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline">View All</button>
              </div>
              <div className="p-0 [&>div>div]:border-none [&>div>div]:shadow-none [&>div>div]:rounded-none">
                <MarketTable />
              </div>
            </div>
          </div>
          
          <div className="xl:col-span-4 flex flex-col gap-6">
            <WatchlistWidget />
            <AlertsWidget />
          </div>
        </div>
      </div>
    </TerminalLayout>
  );
};
