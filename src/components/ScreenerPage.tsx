import { TerminalLayout } from './TerminalLayout';
import { BarChart2, Filter, Settings2, Download } from 'lucide-react';
import { MarketTable } from './MarketTable';
import toast from 'react-hot-toast';

export const ScreenerPage = () => {
  const showDevToast = () => toast('This feature is currently under development.', { icon: '🚧' });

  return (
    <TerminalLayout>
      <div className="flex flex-col gap-6 max-w-[1600px] mx-auto h-full animate-in fade-in duration-500">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3 tracking-tight mb-2">
              <div className="bg-blue-500/10 dark:bg-blue-500/20 p-2.5 rounded-2xl">
                <BarChart2 className="w-8 h-8 text-blue-500" />
              </div>
              Market Screener
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-bold">Filter, sort, and discover cryptocurrency assets based on advanced metrics.</p>
          </div>
          
          <div className="flex gap-3">
             <button onClick={showDevToast} className="bg-white/80 dark:bg-[#131722]/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800/60 rounded-xl px-4 py-2 text-sm font-bold flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-slate-700 dark:text-slate-300">
               <Settings2 className="w-4 h-4" /> Columns
             </button>
             <button onClick={showDevToast} className="bg-white/80 dark:bg-[#131722]/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800/60 rounded-xl px-4 py-2 text-sm font-bold flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-slate-700 dark:text-slate-300">
               <Filter className="w-4 h-4" /> Filters
             </button>
             <button onClick={showDevToast} className="bg-primary hover:bg-primary-dark text-white rounded-xl px-4 py-2 text-sm font-bold flex items-center gap-2 transition-colors shadow-[0_0_15px_rgba(99,102,241,0.3)]">
               <Download className="w-4 h-4" /> Export CSV
             </button>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-[#131722]/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800/60 rounded-3xl overflow-hidden shadow-sm transition-colors flex-1 min-h-[600px]">
          <div className="p-0 [&>div>div]:border-none [&>div>div]:shadow-none [&>div>div]:rounded-none">
            {/* Reusing MarketTable but in a real app this would be a highly customizable DataGrid */}
            <MarketTable />
          </div>
        </div>
      </div>
    </TerminalLayout>
  );
};
