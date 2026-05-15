import { TerminalLayout } from './TerminalLayout';
import { AlertsWidget } from './AlertsWidget';
import { Bell, ShieldAlert, Zap } from 'lucide-react';

export const AlertsPage = () => {
  return (
    <TerminalLayout>
      <div className="flex flex-col gap-6 max-w-[1600px] mx-auto h-full animate-in fade-in duration-500">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3 tracking-tight mb-2">
            <div className="bg-rose-500/10 dark:bg-rose-500/20 p-2.5 rounded-2xl">
              <Bell className="w-8 h-8 text-rose-500" />
            </div>
            Alerts & Notifications
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-bold">Manage price triggers, volatility alerts, and system notifications.</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          <div className="xl:col-span-4 flex flex-col gap-6">
            <AlertsWidget />
          </div>
          
          <div className="xl:col-span-8 flex flex-col gap-6">
            <div className="bg-white/80 dark:bg-[#131722]/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800/60 rounded-3xl p-6 shadow-sm min-h-[400px]">
               <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">Recent Triggered Alerts</h3>
               
               <div className="space-y-4">
                 {[
                   { type: "price", title: "BTC Surpassed $65,000", time: "2 hours ago", icon: <Zap className="w-4 h-4 text-emerald-500" />, bg: "bg-emerald-500/10" },
                   { type: "volatility", title: "ETH High Volatility Detected", time: "5 hours ago", icon: <ShieldAlert className="w-4 h-4 text-amber-500" />, bg: "bg-amber-500/10" },
                   { type: "price", title: "SOL Dropped Below $140", time: "1 day ago", icon: <Zap className="w-4 h-4 text-rose-500" />, bg: "bg-rose-500/10" },
                 ].map((alert, i) => (
                   <div key={i} className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-white/[0.02] hover:bg-slate-100 dark:hover:bg-white/[0.04] transition-colors cursor-pointer group">
                      <div className={`${alert.bg} p-3 rounded-xl shrink-0 group-hover:scale-110 transition-transform`}>
                        {alert.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-extrabold text-slate-900 dark:text-white tracking-tight">{alert.title}</h4>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">{alert.time}</p>
                      </div>
                      <button className="text-[10px] font-bold text-slate-400 hover:text-primary uppercase tracking-widest transition-colors px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl">View Data</button>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </div>
      </div>
    </TerminalLayout>
  );
};
