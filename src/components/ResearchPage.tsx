import { TerminalLayout } from './TerminalLayout';
import { BookOpen, Search, Filter, ArrowRight } from 'lucide-react';
import { NewsWidget } from './NewsWidget';

export const ResearchPage = () => {
  return (
    <TerminalLayout>
      <div className="flex flex-col gap-6 max-w-[1600px] mx-auto h-full animate-in fade-in duration-500">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3 tracking-tight mb-2">
              <div className="bg-primary/10 dark:bg-primary/20 p-2.5 rounded-2xl">
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
              Research Hub
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-bold">Deep dives, fundamental analysis, and institutional reports.</p>
          </div>
          
          <div className="flex gap-3">
             <div className="relative">
               <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
               <input type="text" placeholder="Search reports..." className="bg-white/80 dark:bg-[#131722]/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800/60 rounded-xl pl-9 pr-4 py-2 text-sm font-bold outline-none focus:border-primary transition-colors" />
             </div>
             <button className="bg-white/80 dark:bg-[#131722]/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800/60 rounded-xl px-4 py-2 text-sm font-bold flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
               <Filter className="w-4 h-4" /> Filter
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          <div className="xl:col-span-8 flex flex-col gap-6">
            <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-3xl p-8 relative overflow-hidden shadow-xl border border-slate-800/60 group">
               <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none group-hover:bg-primary/30 transition-colors" />
               <div className="relative z-10">
                 <span className="bg-white/10 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg">Featured Report</span>
                 <h3 className="text-4xl font-extrabold text-white tracking-tight mt-6 mb-4 max-w-2xl">The State of Layer 2 Ecosystems in Q3</h3>
                 <p className="text-slate-300 font-medium max-w-xl mb-8 leading-relaxed">An in-depth analysis of rollup adoption, sequencer revenue, and the upcoming EIPs that will shape the future of Ethereum scaling.</p>
                 <button className="bg-white text-slate-900 px-6 py-3 rounded-xl font-extrabold flex items-center gap-2 hover:scale-105 transition-transform">
                    Read Full Report <ArrowRight className="w-4 h-4" />
                 </button>
               </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {[1, 2, 3, 4].map(i => (
                 <div key={i} className="bg-white/80 dark:bg-[#131722]/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800/60 rounded-3xl p-6 hover:shadow-md transition-all group cursor-pointer">
                    <span className="text-primary text-[10px] font-bold uppercase tracking-widest">Fundamental Analysis</span>
                    <h4 className="text-xl font-extrabold text-slate-900 dark:text-white mt-2 mb-3 group-hover:text-primary transition-colors">Tokenomics Review: Project XYZ</h4>
                    <p className="text-sm text-slate-500 font-medium line-clamp-3 mb-4">Examining the emission schedule, VC unlock cliffs, and utility drivers for the newest DeFi primitive on Solana.</p>
                    <div className="flex items-center justify-between mt-auto">
                       <span className="text-xs font-bold text-slate-400">Oct 24, 2026</span>
                       <span className="text-xs font-bold text-primary group-hover:underline">Read →</span>
                    </div>
                 </div>
               ))}
            </div>
          </div>
          
          <div className="xl:col-span-4 flex flex-col gap-6">
            <div className="h-full min-h-[600px]">
              <NewsWidget />
            </div>
          </div>
        </div>
      </div>
    </TerminalLayout>
  );
};
