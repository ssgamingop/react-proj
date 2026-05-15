import { TerminalLayout } from './TerminalLayout';
import { PortfolioDashboard } from './PortfolioDashboard';

export const PortfolioPage = () => {
  return (
    <TerminalLayout>
      <div className="max-w-[1600px] mx-auto h-full animate-in fade-in duration-500">
        <div className="bg-white/80 dark:bg-[#131722]/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800/60 rounded-3xl p-6 lg:p-10 shadow-sm min-h-[80vh]">
          <PortfolioDashboard />
        </div>
      </div>
    </TerminalLayout>
  );
};
