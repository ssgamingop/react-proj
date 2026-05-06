import React from 'react';
import { Activity } from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100 font-sans">
      <header className="bg-slate-800 border-b border-slate-700 p-4 sticky top-0 z-10">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold tracking-tight text-white">Crypto Tracker</h1>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#" className="text-slate-300 hover:text-white transition-colors">Dashboard</a>
            <a href="#" className="text-slate-300 hover:text-white transition-colors">Portfolio</a>
            <a href="#" className="text-slate-300 hover:text-white transition-colors">Watchlist</a>
          </nav>
        </div>
      </header>

      <main className="flex-1 container mx-auto p-4 md:p-6 lg:p-8">
        {children}
      </main>

      <footer className="bg-slate-800 border-t border-slate-700 p-6 text-center text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Crypto Tracker. Powered by CryptoCompare API.</p>
      </footer>
    </div>
  );
};
