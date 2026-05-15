import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { Sun, Moon } from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (document.documentElement.classList.contains('dark')) {
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 p-4 sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between">
          <Link 
            to="/"
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="bg-primary/10 p-2 rounded-xl group-hover:bg-primary/20 transition-colors">
              <Logo className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Chain<span className="text-primary">Pulse</span>
            </h1>
          </Link>
          <nav className="hidden md:flex gap-4 lg:gap-8">
            {[
              { label: 'Dashboard', id: 'dashboard' },
              { label: 'Portfolio', id: 'portfolio' },
              { label: 'Watchlist', id: 'watchlist' },
              { label: 'Market', id: 'market' }
            ].map((item) => (
              <button 
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-xs lg:text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors relative group uppercase tracking-widest"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <div className="hidden sm:block text-right">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Network</p>
              <p className="text-xs font-bold text-emerald-500 dark:text-emerald-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-500 dark:bg-emerald-400 rounded-full animate-pulse"></span>
                Connected
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 md:px-6 lg:px-8 max-w-7xl">
        {children}
      </main>

      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-8 text-center text-slate-500 text-sm mt-12 transition-colors duration-300">
        <div className="container mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8 text-left mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Logo className="w-5 h-5 opacity-80" />
              <h3 className="text-slate-900 dark:text-white font-bold">ChainPulse</h3>
            </div>
            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">The ultimate companion for tracking your crypto assets and market movements with real-time precision.</p>
          </div>
          <div>
            <h3 className="text-slate-900 dark:text-white font-bold mb-4">Resources</h3>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => scrollToSection('market')} className="hover:text-primary transition-colors text-slate-600 dark:text-slate-400">Market Data</button></li>
              <li><button onClick={() => scrollToSection('portfolio')} className="hover:text-primary transition-colors text-slate-600 dark:text-slate-400">Portfolio Tracker</button></li>
              <li><button onClick={() => scrollToSection('watchlist')} className="hover:text-primary transition-colors text-slate-600 dark:text-slate-400">Watchlist</button></li>
            </ul>
          </div>
          <div>
            <h3 className="text-slate-900 dark:text-white font-bold mb-4">Legal</h3>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-primary text-slate-600 dark:text-slate-400">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary text-slate-600 dark:text-slate-400">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary text-slate-600 dark:text-slate-400">Disclaimer</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-500">
          <p>&copy; {new Date().getFullYear()} ChainPulse. Data provided by CryptoCompare.</p>
        </div>
      </footer>
    </div>
  );
};