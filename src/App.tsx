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
      <Toaster position="top-right" toastOptions={{
        style: { background: '#1e293b', color: '#fff', border: '1px solid #334155' }
      }} />
      <div className="flex flex-col gap-6">
        <PortfolioDashboard />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <section>
              <PriceChart symbol="BTC" />
            </section>
            <section>
              <h2 className="text-xl font-bold text-white mb-4">Market Overview</h2>
              <MarketTable />
            </section>
          </div>
          <div className="flex flex-col gap-6">
            <aside>
              <WatchlistWidget />
            </aside>
            <aside>
              <AlertsWidget />
            </aside>
            <aside>
              <NewsWidget />
            </aside>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default App;
