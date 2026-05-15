import { TerminalLayout } from './TerminalLayout';
import { Activity, Server, Database, Globe, Cpu, ShieldCheck } from 'lucide-react';

export const MonitoringPage = () => {
  return (
    <TerminalLayout>
      <div className="flex flex-col gap-6 max-w-[1600px] mx-auto h-full animate-in fade-in duration-500">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3 tracking-tight mb-2">
            <div className="bg-emerald-500/10 dark:bg-emerald-500/20 p-2.5 rounded-2xl">
              <Activity className="w-8 h-8 text-emerald-500" />
            </div>
            Network Monitoring
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-bold">Real-time status of blockchain networks and API providers.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[
            { name: "Bitcoin Core Node", status: "Operational", uptime: "99.99%", ping: "12ms", icon: <Server className="w-5 h-5" /> },
            { name: "Ethereum Mainnet", status: "Operational", uptime: "99.98%", ping: "45ms", icon: <Globe className="w-5 h-5" /> },
            { name: "Solana RPC", status: "Degraded", uptime: "98.50%", ping: "150ms", icon: <Database className="w-5 h-5" /> },
            { name: "Binance WebSocket", status: "Operational", uptime: "100%", ping: "8ms", icon: <Cpu className="w-5 h-5" /> },
            { name: "CoinCap API", status: "Operational", uptime: "99.90%", ping: "32ms", icon: <ShieldCheck className="w-5 h-5" /> },
            { name: "Polygon Validator", status: "Operational", uptime: "99.99%", ping: "18ms", icon: <Server className="w-5 h-5" /> },
            { name: "Arbitrum Sequencer", status: "Operational", uptime: "99.95%", ping: "25ms", icon: <Server className="w-5 h-5" /> },
            { name: "Optimism Gateway", status: "Operational", uptime: "99.99%", ping: "20ms", icon: <Globe className="w-5 h-5" /> }
          ].map((service, i) => (
            <div key={i} className="bg-white/80 dark:bg-[#131722]/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800/60 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all group">
               <div className="flex justify-between items-start mb-4">
                  <div className="bg-slate-100 dark:bg-slate-800 p-2.5 rounded-xl text-slate-500 dark:text-slate-400 group-hover:text-primary transition-colors">
                    {service.icon}
                  </div>
                  <span className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-lg ${service.status === 'Operational' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                    <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${service.status === 'Operational' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                    {service.status}
                  </span>
               </div>
               <h3 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">{service.name}</h3>
               
               <div className="grid grid-cols-2 gap-4 border-t border-slate-100 dark:border-slate-800/60 pt-4">
                 <div>
                   <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Uptime</p>
                   <p className="font-extrabold text-slate-900 dark:text-white">{service.uptime}</p>
                 </div>
                 <div>
                   <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Latency</p>
                   <p className="font-extrabold text-slate-900 dark:text-white">{service.ping}</p>
                 </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </TerminalLayout>
  );
};
