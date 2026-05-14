import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BarChart3, Bell, Globe, Layout, Shield, Zap, TrendingUp, Cpu } from 'lucide-react';
import { Logo } from './Logo';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-blob" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px] animate-blob animation-delay-2000" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-purple-600/10 rounded-full blur-[120px] animate-blob animation-delay-4000" />
        <div className="absolute inset-0 bg-grid-white bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-slate-800/50 bg-slate-950/50 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold tracking-tight">Chain<span className="text-primary">Pulse</span></span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Features</a>
            <a href="#stats" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Market</a>
            <a href="#security" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Security</a>
          </nav>
          <button 
            onClick={() => navigate('/dashboard')}
            className="px-5 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-xl text-sm font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/25"
          >
            Launch App
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-24 pb-32 px-6">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <Zap className="w-3 h-3" />
            <span>THE FUTURE OF CRYPTO ASSET MANAGEMENT</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-100">
            Track Assets with <br />
            <span className="text-gradient">Precision Intelligence</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            Experience the most powerful real-time portfolio dashboard. Institutional-grade tools for every investor, right in your browser.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
            <button 
              onClick={() => navigate('/dashboard')}
              className="w-full sm:w-auto px-8 py-4 bg-white text-slate-950 hover:bg-slate-200 rounded-2xl text-lg font-bold transition-all hover:scale-105 flex items-center justify-center gap-2 group"
            >
              Start Trading Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-slate-900 border border-slate-800 hover:bg-slate-800 rounded-2xl text-lg font-bold transition-all">
              View Live Demo
            </button>
          </div>

          {/* Hero Visual */}
          <div className="mt-20 relative animate-in fade-in zoom-in-95 duration-1000 delay-500">
            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full transform scale-75 opacity-50" />
            <div className="relative bg-slate-900/50 backdrop-blur-2xl border border-slate-800 rounded-3xl p-4 md:p-8 shadow-2xl overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
              <img 
                src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=2000" 
                alt="Dashboard Preview" 
                className="rounded-xl w-full h-auto object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
              />
              {/* Floating Elements Over Image */}
              <div className="absolute top-1/4 -right-10 bg-slate-900/90 border border-slate-700 p-4 rounded-2xl shadow-xl animate-float hidden lg:block">
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-500/20 p-2 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase">Portfolio Profit</p>
                    <p className="text-lg font-bold text-white">+$12,482.00</p>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-1/4 -left-10 bg-slate-900/90 border border-slate-700 p-4 rounded-2xl shadow-xl animate-float animation-delay-2000 hidden lg:block">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/20 p-2 rounded-lg">
                    <Bell className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase">Alert Triggered</p>
                    <p className="text-lg font-bold text-white">BTC &gt; $65,000</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="relative z-10 py-32 bg-slate-950/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Engineered for Performance</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Our platform combines speed, reliability, and sophisticated analysis tools to give you an edge in the market.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                icon: <BarChart3 className="w-8 h-8" />, 
                title: "Advanced Analytics", 
                desc: "Real-time charts with multi-indicator support for deep technical analysis." 
              },
              { 
                icon: <Layout className="w-8 h-8" />, 
                title: "Custom Dashboard", 
                desc: "Personalize your workspace with modular widgets and real-time feeds." 
              },
              { 
                icon: <Globe className="w-8 h-8" />, 
                title: "Global Market Data", 
                desc: "Aggregated data from 100+ exchanges for the most accurate pricing." 
              },
              { 
                icon: <Shield className="w-8 h-8" />, 
                title: "Bank-Grade Security", 
                desc: "Your data is encrypted and secure with military-grade protocols." 
              },
              { 
                icon: <Bell className="w-8 h-8" />, 
                title: "Smart Alerts", 
                desc: "Never miss a move with customized price and volume notifications." 
              },
              { 
                icon: <Cpu className="w-8 h-8" />, 
                title: "Neural Insights", 
                desc: "AI-driven market sentiment analysis and predictive trends." 
              }
            ].map((feature, i) => (
              <div 
                key={i}
                className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800/50 hover:border-primary/50 transition-all group"
              >
                <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary/10 transition-all">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-32">
        <div className="container mx-auto px-6">
          <div className="relative rounded-[40px] bg-primary overflow-hidden p-12 md:p-24 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent)]" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">Ready to master the market?</h2>
              <p className="text-primary-dark/90 text-lg md:text-xl font-medium max-w-2xl mx-auto mb-12">
                Join 50,000+ traders using ChainPulse to manage over $2B in crypto assets worldwide.
              </p>
              <button 
                onClick={() => navigate('/dashboard')}
                className="px-10 py-5 bg-slate-950 text-white rounded-2xl text-xl font-bold transition-all hover:scale-105 hover:shadow-2xl active:scale-95"
              >
                Get Started for Free
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-20 border-t border-slate-800">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-2">
              <Logo className="w-6 h-6 text-primary" />
              <span className="text-lg font-bold tracking-tight">ChainPulse</span>
            </div>
            <p className="text-slate-500 text-sm">
              &copy; {new Date().getFullYear()} ChainPulse. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">Twitter</a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">Discord</a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
