import { Layout } from './Layout';
import { MarketTable } from './MarketTable';
import { NewsWidget } from './NewsWidget';
import { WatchlistWidget } from './WatchlistWidget';
import { PortfolioDashboard } from './PortfolioDashboard';
import { PriceChart } from './PriceChart';
import { AlertsWidget } from './AlertsWidget';
import { Toaster } from 'react-hot-toast';

export const DashboardPage = () => {
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
      
      <div id="dashboard" className="flex flex-col gap-8 max-w-7xl mx-auto scroll-mt-24">
        <section id="portfolio" className="animate-in fade-in slide-in-from-bottom-4 duration-700 scroll-mt-24">
          <PortfolioDashboard />
        </section>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-8">
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
              <PriceChart symbol="BTC" />
            </section>
            
            <section id="market" className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 scroll-mt-24">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">Market Overview</h2>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mt-1">Real-time assets performance</p>
                </div>
              </div>
              <MarketTable />
            </section>
          </div>
          
          <div className="flex flex-col gap-8">
            <aside id="watchlist" className="animate-in fade-in slide-in-from-right-4 duration-700 delay-300 scroll-mt-24">
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
