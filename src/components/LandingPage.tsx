import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BarChart3, Bell, Globe, Layout, Shield, Cpu, Moon, Sun } from 'lucide-react';
import { Logo } from './Logo';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Default to dark mode based on existing classes, or check html element
    if (document.documentElement.classList.contains('dark')) {
      setIsDark(true);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
       document.documentElement.classList.add('dark');
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

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 overflow-x-hidden font-sans">
      {/* Clean Dot Background */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40 dark:opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #cbd5e1 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      {/* Header */}
      <header className="relative z-10 border-b border-slate-200 dark:border-slate-800/50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Chain<span className="text-primary">Pulse</span></span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors">Features</a>
            <a href="#features" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors">Market</a>
            <a href="#features" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors">Security</a>
          </nav>
          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" aria-label="Toggle Theme">
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button 
              onClick={() => navigate('/dashboard')}
              className="hidden sm:block px-5 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl text-sm font-bold transition-all hover:scale-105 active:scale-95 shadow-sm"
            >
              Launch App
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-16 px-6">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Now with Real-time Market Data</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 text-slate-900 dark:text-white animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            Professional Grade <br />
            <span className="text-primary">Crypto Analytics</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            A clean, powerful interface for monitoring assets. Designed for clarity, engineered for speed.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <button 
              onClick={() => navigate('/dashboard')}
              className="w-full sm:w-auto px-8 py-3.5 bg-primary text-white hover:bg-primary-dark rounded-xl text-lg font-bold transition-all shadow-md flex items-center justify-center gap-2 group"
            >
              Start Trading Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => navigate('/dashboard')}
              className="w-full sm:w-auto px-8 py-3.5 bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl text-lg font-bold transition-all shadow-sm"
            >
              View Dashboard
            </button>
          </div>

          {/* Clean Hero Visual */}
          <div className="mt-16 relative animate-in fade-in zoom-in-95 duration-1000 delay-500 max-w-5xl mx-auto">
            <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-2 md:p-4 shadow-2xl overflow-hidden ring-1 ring-slate-900/5 dark:ring-white/10">
              <img 
                src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=2000" 
                alt="Dashboard Preview" 
                className="rounded-xl w-full h-auto object-cover opacity-90 border border-slate-100 dark:border-slate-800"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="relative z-10 py-24 bg-slate-50 dark:bg-slate-950/50 border-t border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">Precision Tools for Traders</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Everything you need to monitor the markets, without the clutter.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                icon: <BarChart3 className="w-6 h-6" />, 
                title: "Advanced Analytics", 
                desc: "Real-time charts with multi-indicator support for deep technical analysis." 
              },
              { 
                icon: <Layout className="w-6 h-6" />, 
                title: "Custom Dashboard", 
                desc: "Personalize your workspace with modular widgets and real-time feeds." 
              },
              { 
                icon: <Globe className="w-6 h-6" />, 
                title: "Global Market Data", 
                desc: "Aggregated data from 100+ exchanges for the most accurate pricing." 
              },
              { 
                icon: <Shield className="w-6 h-6" />, 
                title: "Bank-Grade Security", 
                desc: "Your data is encrypted and secure with military-grade protocols." 
              },
              { 
                icon: <Bell className="w-6 h-6" />, 
                title: "Smart Alerts", 
                desc: "Never miss a move with customized price and volume notifications." 
              },
              { 
                icon: <Cpu className="w-6 h-6" />, 
                title: "Lightning Fast", 
                desc: "Optimized for speed and minimal latency to give you an edge." 
              }
            ].map((feature, i) => (
              <div 
                key={i}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-5">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24">
        <div className="container mx-auto px-6">
          <div className="relative rounded-[32px] bg-slate-900 dark:bg-slate-900 overflow-hidden p-10 md:p-16 text-center shadow-xl border border-slate-800">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Master your portfolio today.</h2>
              <p className="text-slate-400 text-lg max-w-xl mx-auto mb-10">
                Join thousands of professional traders using ChainPulse.
              </p>
              <button 
                onClick={() => navigate('/dashboard')}
                className="px-8 py-3.5 bg-primary hover:bg-primary-dark text-white rounded-xl text-lg font-bold transition-all shadow-md"
              >
                Start for Free
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Logo className="w-6 h-6 text-primary" />
            <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">ChainPulse</span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            &copy; {new Date().getFullYear()} ChainPulse. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors">Twitter</a>
            <a href="#" className="text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
