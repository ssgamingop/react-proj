# 🚀 ChainPulse Terminal

A professional-grade, real-time financial terminal designed for high-frequency cryptocurrency monitoring, portfolio management, and advanced market intelligence. Built with **React 19**, **Vite**, and **Tailwind CSS v4**, ChainPulse delivers a premium, low-latency experience for modern traders.

---

## ✨ Core Features

- 🚀 **Cinematic Landing Page**: High-impact entry point with premium animations, glassmorphism, and immersive hero visuals.
- ⚡ **Live Binance Streaming**: Integrated **WebSocket** connectivity providing sub-second price updates directly from Binance.
- 📊 **Real-time Market Dashboard**: Track top cryptocurrencies by market cap with live volatility indicators and price pulse animations.
- 💼 **Professional Portfolio Hub**: Simulate and manage complex portfolios with real-time balance tracking, average buy price analysis, and dynamic P/L calculations.
- 🔍 **Advanced Research Terminal**: Deep-dive into specific asset metrics, technical data, and historical performance.
- 🛰️ **Activity Monitoring**: Stay ahead of the curve with a live feed of the latest crypto news and on-chain activity.
- 🚦 **Automated Trading Signals**: Access real-time technical indicators and automated signals to identify market opportunities.
- 🔭 **Professional Asset Screener**: Powerful filtering tools to discover assets based on custom criteria and performance metrics.
- 👥 **Community Pulse**: Integrated community hub for sharing insights and tracking social sentiment.
- ⭐ **Favorites Watchlist**: Curate a personalized list of assets for focused monitoring across the entire terminal.
- 📈 **Interactive Data Visualization**: Analyze market movements with dynamic area charts (7D, 30D, 90D) powered by **Recharts**.
- 🔔 **Intelligent Price Alerts**: Set custom threshold alerts and receive instant notifications via **React Hot Toast**.
- 💾 **Reliable persistence**: All user configurations, portfolios, and alerts are securely persisted via **LocalStorage**.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) (Functional Components, Hooks)
- **Build Tool**: [Vite 8](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (Modern CSS configuration)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) (Flux-based store)
- **Real-time Data**: [Binance WebSocket API](https://binance-docs.github.io/apidocs/spot/en/#websocket-market-streams)
- **Rest API**: [CryptoCompare Data API](https://min-api.cryptocompare.com/) []
- **Visualization**: [Recharts](https://recharts.org/)
- **Networking**: [Axios](https://axios-http.com/)
- **UI Components**: [Lucide React](https://lucide.dev/) & [React Hot Toast](https://react-hot-toast.com/)

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ssgamingop/react-proj.git
   cd proj
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Launch development server**:
   ```bash
   npm run dev
   ```

4. **Access the App**:
   Navigate to `http://localhost:5173` in your browser.

---

## 👥 Contributors

This project was developed as a collaborative effort for our college coursework.

| Name | Role | Key Contributions |
| :--- | :--- | :--- |
| **Somyajeet** | State & Persistence | Architected global state with Zustand and implemented LocalStorage data persistence. |
| **Krishiv** | API & Services | Integrated CryptoCompare API, handled Axios networking, and News Feed logic. |
| **Sushant** | Charts & Alerts | Developed interactive Recharts visualization and the real-time Price Alert system. |
| **Kaustubh** | UI/UX & Documentation | Lead UI design using Tailwind CSS, Logo branding, and Technical Documentation. |

---

## 📝 Usage Notes

- **Real-time Data**: WebSocket connections are initialized on app mount and automatically handle reconnection logic.
- **API Rate Limits**: The application uses the CryptoCompare free tier. Polling intervals are optimized for efficiency.
- **Browser Storage**: All personal data is stored locally. Clearing site data will reset your portfolio and alerts.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.


