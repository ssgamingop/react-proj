import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { Toaster } from 'react-hot-toast';
import { 
  Sun, Moon, Search, Home, Activity, PieChart, 
  BookOpen, Radio, Users, Bell, BarChart2, Zap
} from 'lucide-react';

export const TerminalLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();

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
    { icon: <Home size={20} />, label: 'Dashboard', path: '/dashboard' },
    { icon: <BookOpen size={20} />, label: 'Research', path: '/research' },
    { icon: <Activity size={20} />, label: 'Monitoring', path: '/monitoring' },
    { icon: <PieChart size={20} />, label: 'Portfolio', path: '/portfolio' },
    { icon: <Radio size={20} />, label: 'Signals', path: '/signals' },
    { icon: <Bell size={20} />, label: 'Alerts', path: '/alerts' },
    { icon: <BarChart2 size={20} />, label: 'Screener', path: '/screener' },
    { icon: <Users size={20} />, label: 'Community', path: '/community' },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-[#0b0e14] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300 relative">
      <Toaster 
        position="bottom-right" 
        toastOptions={{
          style: { 
            background: document.documentElement.classList.contains('dark') ? '#0f172a' : '#ffffff', 
            color: document.documentElement.classList.contains('dark') ? '#f8fafc' : '#0f172a', 
            border: '1px solid ' + (document.documentElement.classList.contains('dark') ? '#1e293b' : '#e2e8f0'),
            borderRadius: '12px',
            fontSize: '13px',
            fontWeight: '600',
            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
          }
        }} 
      />
      {/* Background Glow Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[150px] pointer-events-none z-0 hidden dark:block" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 blur-[150px] pointer-events-none z-0 hidden dark:block" />

      {/* Sidebar */}
      <aside className="w-16 md:w-20 lg:w-56 xl:w-64 flex-shrink-0 flex flex-col bg-white/80 dark:bg-[#131722]/80 backdrop-blur-xl border-r border-slate-200 dark:border-slate-800/60 z-20 transition-all shadow-[4px_0_24px_rgba(0,0,0,0.02)] dark:shadow-none">
        <div className="h-16 flex items-center px-4 lg:px-6 border-b border-slate-200 dark:border-slate-800/60 shrink-0">
          <Link to="/" className="flex items-center gap-3 group cursor-pointer w-full">
            <div className="text-primary group-hover:scale-110 transition-transform bg-primary/10 p-1.5 rounded-xl">
              <Logo className="w-6 h-6" />
            </div>
            <h1 className="hidden lg:block text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              ChainPulse<span className="text-primary">.</span>
            </h1>
          </Link>
        </div>
        
        <div className="px-4 py-4 hidden lg:block">
          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2 px-2">Main Menu</div>
        </div>

        <nav className="flex-1 overflow-y-auto pb-4 scrollbar-hide px-2 lg:px-4">
          <ul className="space-y-1">
            {navItems.map((item, i) => {
              const isActive = location.pathname.includes(item.path) || (location.pathname === '/' && item.path === '/dashboard'); 
              return (
                <li key={i}>
                  <Link 
                    to={item.path} 
                    className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all overflow-hidden group ${
                      isActive 
                        ? 'text-primary dark:text-white bg-primary/10 dark:bg-white/10 shadow-sm' 
                        : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-white/5'
                    }`}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1/2 bg-primary rounded-r-full shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
                    )}
                    <div className={`shrink-0 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                      {item.icon}
                    </div>
                    <span className="hidden lg:block z-10">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="p-4 m-4 border border-slate-200 dark:border-slate-800/60 rounded-2xl flex items-center justify-center lg:justify-start bg-slate-50 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 transition-colors cursor-pointer group shadow-sm">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow-[0_0_15px_rgba(99,102,241,0.4)] group-hover:scale-105 transition-transform">
            JD
          </div>
          <div className="hidden lg:block ml-3 min-w-0 flex-1">
            <p className="text-sm font-bold text-slate-900 dark:text-white truncate">Pro User</p>
            <p className="text-[10px] font-medium text-slate-500 truncate group-hover:text-primary transition-colors">Manage Account</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">
        {/* Top Header */}
        <header className="h-16 bg-white/80 dark:bg-[#131722]/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800/60 flex items-center justify-between px-6 shrink-0 z-10 shadow-[0_4px_24px_rgba(0,0,0,0.02)] dark:shadow-none">
          <div className="flex-1 max-w-2xl">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search assets, news, or jump to..." 
                className="w-full bg-slate-100/80 dark:bg-black/20 border border-slate-200 dark:border-slate-800/80 rounded-xl pl-10 pr-4 py-2 text-sm font-medium outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 text-slate-900 dark:text-white transition-all shadow-inner"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                <kbd className="hidden sm:inline-block bg-white dark:bg-[#131722] border border-slate-200 dark:border-slate-700 rounded px-1.5 py-0.5 text-[10px] font-mono font-bold text-slate-400 shadow-sm">⌘</kbd>
                <kbd className="hidden sm:inline-block bg-white dark:bg-[#131722] border border-slate-200 dark:border-slate-700 rounded px-1.5 py-0.5 text-[10px] font-mono font-bold text-slate-400 shadow-sm">K</kbd>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 ml-4">
            <button className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_25px_rgba(99,102,241,0.5)] hover:-translate-y-0.5">
              <Zap className="w-3.5 h-3.5 fill-current" /> Ask PulseAI
            </button>
            <div className="w-px h-6 bg-slate-200 dark:bg-slate-800"></div>
            <button onClick={toggleTheme} className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white transition-all border border-transparent dark:border-slate-800/60 hover:shadow-sm group">
              {isDark ? <Sun className="w-5 h-5 group-hover:rotate-45 transition-transform" /> : <Moon className="w-5 h-5 group-hover:-rotate-12 transition-transform" />}
            </button>
          </div>
        </header>

        {/* Dashboard Canvas */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 scrollbar-hide">
          {children}
        </main>
      </div>
    </div>
  );
};
