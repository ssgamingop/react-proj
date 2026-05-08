import React from 'react';
import { Activity } from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans">
      <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 p-4 sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="bg-primary/10 p-2 rounded-xl group-hover:bg-primary/20 transition-colors">
              <Activity className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white">
              Chain<span className="text-primary">Pulse</span>
            </h1>
          </div>
          <nav className="hidden md:flex gap-8">
            {['Dashboard', 'Portfolio', 'Watchlist', 'Market'].map((item) => (
              <a 
                key={item}
                href="#" 
                className="text-sm font-medium text-slate-400 hover:text-white transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <button className="text-sm font-medium bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-full border border-white/10 transition-all">
              Connect Wallet
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 md:px-6 lg:px-8 max-w-7xl">
        {children}
      </main>

      <footer className="bg-slate-900 border-t border-slate-800 p-8 text-center text-slate-500 text-sm mt-12">
        <div className="container mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8 text-left mb-8">
          <div>
            <h3 className="text-white font-bold mb-4">ChainPulse</h3>
            <p className="text-xs leading-relaxed">The ultimate companion for tracking your crypto assets and market movements with real-time precision.</p>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Resources</h3>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-primary">Documentation</a></li>
              <li><a href="#" className="hover:text-primary">API Reference</a></li>
              <li><a href="#" className="hover:text-primary">Market Data</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Legal</h3>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary">Disclaimer</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-800">
          <p>&copy; {new Date().getFullYear()} ChainPulse. Data provided by CryptoCompare.</p>
        </div>
      </footer>
    </div>
  );
};
