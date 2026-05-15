import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { DashboardPage } from './components/DashboardPage';
import { PortfolioPage } from './components/PortfolioPage';
import { ResearchPage } from './components/ResearchPage';
import { MonitoringPage } from './components/MonitoringPage';
import { AlertsPage } from './components/AlertsPage';
import { SignalsPage } from './components/SignalsPage';
import { ScreenerPage } from './components/ScreenerPage';
import { CommunityPage } from './components/CommunityPage';
import { useMarketStore } from './store/useMarketStore';

function App() {
  const { connectWebSocket, disconnectWebSocket } = useMarketStore();

  useEffect(() => {
    connectWebSocket();
    return () => disconnectWebSocket();
  }, [connectWebSocket, disconnectWebSocket]);

  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/research" element={<ResearchPage />} />
        <Route path="/monitoring" element={<MonitoringPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/signals" element={<SignalsPage />} />
        <Route path="/alerts" element={<AlertsPage />} />
        <Route path="/screener" element={<ScreenerPage />} />
        <Route path="/community" element={<CommunityPage />} />
      </Routes>
    </Router>
  );
}

export default App;