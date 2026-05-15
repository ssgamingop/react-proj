import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { 
  Sun, Moon, Search, Home, Activity, PieChart, 
  BookOpen, Radio, Users, Bell, BarChart2 
} from 'lucide-react';

export const TerminalLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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

  const navItems = [
    { icon: <Home size={18} />, label: 'Home' },
    { icon: <BookOpen size={18} />, label: 'Research' },
    { icon: <Activity size={18} />, label: 'Monitoring' },
    { icon: <PieChart size={18} />, label: 'Portfolio' },
    { icon: <Radio size={18} />, label: 'Signals' },
    { icon: <Bell size={18} />, label: 'Alerts' },
    { icon: <BarChart2 size={18} />, label: 'Screener' },
    { icon: <Users size={18} />, label: 'Community' },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-[#0b0e14] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      {/* Sidebar */}
      <aside className="w-16 md:w-20 lg:w-48 xl:w-56 flex-shrink-0 flex flex-col bg-white dark:bg-[#131722] border-r border-slate-200 dark:border-slate-800/60 z-20 transition-all">
        <div className="h-14 flex items-center px-4 border-b border-slate-200 dark:border-slate-800/60 shrink-0">
          <Link to="/" className="flex items-center gap-2 group cursor-pointer w-full">
            <div className="text-primary group-hover:scale-110 transition-transform">
              <Logo className="w-6 h-6" />
            </div>
            <h1 className="hidden lg:block text-lg font-bold tracking-tight text-slate-900 dark:text-white">
              ChainPulse
            </h1>
          </Link>
        </div>
        <nav className="flex-1 overflow-y-auto py-4 scrollbar-hide">
          <ul className="space-y-1 px-2">
            {navItems.map((item, i) => (
              <li key={i}>
                <a 
                  href="#" 
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    i === 0 
                      ? 'bg-primary/10 text-primary dark:text-blue-400' 
                      : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-slate-200'
                  }`}
                >
                  <div className="shrink-0">{item.icon}</div>
                  <span className="hidden lg:block">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t border-slate-200 dark:border-slate-800/60 flex items-center justify-center lg:justify-start">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-indigo-500 flex items-center justify-center text-white font-bold text-xs">
            JD
          </div>
          <div className="hidden lg:block ml-3">
            <p className="text-xs font-bold text-slate-900 dark:text-white">Pro User</p>
            <p className="text-[10px] text-slate-500">View Profile</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-14 bg-white dark:bg-[#131722] border-b border-slate-200 dark:border-slate-800/60 flex items-center justify-between px-4 shrink-0 z-10">
          <div className="flex-1 max-w-xl">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search or jump to..." 
                className="w-full bg-slate-100 dark:bg-[#0b0e14] border border-slate-200 dark:border-slate-800 rounded-lg pl-10 pr-4 py-1.5 text-sm outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 text-slate-900 dark:text-white transition-all"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                <kbd className="hidden sm:inline-block bg-white dark:bg-[#131722] border border-slate-200 dark:border-slate-700 rounded px-1.5 text-[10px] font-mono text-slate-400">⌘</kbd>
                <kbd className="hidden sm:inline-block bg-white dark:bg-[#131722] border border-slate-200 dark:border-slate-700 rounded px-1.5 text-[10px] font-mono text-slate-400">K</kbd>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 ml-4">
            <button className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm">
              ✨ Ask PulseAI
            </button>
            <button onClick={toggleTheme} className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors border border-transparent dark:border-slate-800/60">
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </header>

        {/* Dashboard Canvas */}
        <main className="flex-1 overflow-y-auto p-2 sm:p-4 scrollbar-hide">
          {children}
        </main>
      </div>
    </div>
  );
};
