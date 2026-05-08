import { Layout } from './components/Layout';
import { MarketTable } from './components/MarketTable';
import { NewsWidget } from './components/NewsWidget';
import { WatchlistWidget } from './components/WatchlistWidget';
import { PortfolioDashboard } from './components/PortfolioDashboard';
import { PriceChart } from './components/PriceChart';
import { AlertsWidget } from './components/AlertsWidget';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Layout>
      <Toaster 
        position="top-right" 
        toastOptions={{
          style: { 
            background: '#0f172a', 
            color: '#f8fafc', 
            border: '1px solid #1e293b',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '600',
            boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.5)'
          }
        }} 
      />
      
      <div className="flex flex-col gap-8 max-w-7xl mx-auto">
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <PortfolioDashboard />
        </section>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-8">
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
              <PriceChart symbol="BTC" />
            </section>
            
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">Market Overview</h2>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mt-1">Real-time assets performance</p>
                </div>
                <button className="text-xs font-bold text-primary hover:text-primary-dark transition-colors uppercase tracking-widest">
                  View All
                </button>
              </div>
              <MarketTable />
            </section>
          </div>
          
          <div className="flex flex-col gap-8">
            <aside className="animate-in fade-in slide-in-from-right-4 duration-700 delay-300">
              <WatchlistWidget />
            </aside>
            <aside className="animate-in fade-in slide-in-from-right-4 duration-700 delay-400">
              <AlertsWidget />
            </aside>
            <aside className="animate-in fade-in slide-in-from-right-4 duration-700 delay-500">
              <NewsWidget />
            </aside>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default App;
