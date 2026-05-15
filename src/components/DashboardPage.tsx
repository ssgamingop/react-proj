import { TerminalLayout } from './TerminalLayout';
import { MarketTable } from './MarketTable';
import { NewsWidget } from './NewsWidget';
import { WatchlistWidget } from './WatchlistWidget';
import { PortfolioDashboard } from './PortfolioDashboard';
import { PriceChart } from './PriceChart';
import { AlertsWidget } from './AlertsWidget';
import { Toaster } from 'react-hot-toast';

export const DashboardPage = () => {
  return (
    <TerminalLayout>
      <Toaster 
        position="bottom-right" 
        toastOptions={{
          style: { 
            background: 'var(--tw-colors-slate-900)', 
            color: '#f8fafc', 
            border: '1px solid var(--tw-colors-slate-800)',
            borderRadius: '8px',
            fontSize: '12px',
            fontWeight: '600',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
          }
        }} 
      />
      
      <div className="flex flex-col gap-4 max-w-[1600px] mx-auto h-full">
        {/* Top Row: Chart (Left 8) + News/Stats (Right 4) */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 min-h-[400px]">
          {/* Main Chart Area */}
          <div className="xl:col-span-8 flex flex-col gap-4">
            <PriceChart symbol="BTC" />
          </div>
          
          {/* Right Sidebar Area */}
          <div className="xl:col-span-4 flex flex-col gap-4">
            <div className="bg-white dark:bg-[#131722] border border-slate-200 dark:border-slate-800/60 rounded-2xl p-6 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Market Overview 24H</h3>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <p className="text-[10px] text-slate-500 font-medium">Marketcap</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">$2.71T</p>
                  <p className="text-[10px] text-rose-500 font-bold">↓ 2.31%</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-medium">Volume</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">$163B</p>
                  <p className="text-[10px] text-emerald-500 font-bold">↑ 31.91%</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-medium">Dominance</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">58.57%</p>
                  <p className="text-[10px] text-rose-500 font-bold">↓ 0.04%</p>
                </div>
              </div>
            </div>
            <div className="flex-1 min-h-[300px]">
              <NewsWidget />
            </div>
          </div>
        </div>

        {/* Bottom Row: Market Table & Other Widgets */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 pb-12">
          <div className="xl:col-span-4 flex flex-col gap-4">
            <WatchlistWidget />
            <AlertsWidget />
          </div>
          <div className="xl:col-span-8 flex flex-col gap-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
              <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Top Assets</h3>
              </div>
              <div className="p-0 border-t-0 border-slate-200 dark:border-slate-800 [&>.bg-white]:border-none [&>.bg-white]:shadow-none [&>.bg-white]:rounded-none">
                <MarketTable />
              </div>
            </div>
            <div className="mt-4">
              <PortfolioDashboard />
            </div>
          </div>
        </div>
      </div>
    </TerminalLayout>
  );
}
