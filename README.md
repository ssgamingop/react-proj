# 🚀 Crypto Tracker

A high-performance, real-time financial dashboard designed to monitor cryptocurrency prices, manage mock portfolios, and analyze market trends. Built with a modern tech stack including **React 19**, **Vite**, and **Tailwind CSS v4**.

---

## ✨ Key Features

- 🚀 **Cinematic Landing Page**: High-impact entry point with premium animations, glassmorphism, and hero visuals.
- 📊 **Real-time Market Overview**: Track the top 100 cryptocurrencies by market cap with live price updates and volatility indicators.
- 💼 **Professional Portfolio Tracker**: Simulate investments with a mock portfolio. Includes real-time balance tracking, average buy price analysis, and P/L calculations.
- ⭐ **Favorites Watchlist**: Curate a personalized list of assets for quick access and real-time monitoring.
- 📈 **Interactive Data Visualization**: Analyze market movements with dynamic area charts (7D, 30D, 90D) powered by Recharts.
- 🔔 **Intelligent Price Alerts**: Set custom threshold alerts and receive instant notifications via React Hot Toast.
- 📰 **Integrated News Hub**: Stay informed with a live feed of the latest crypto news headlines.
- 💾 **Reliable Persistence**: All user data (portfolio, watchlist, alerts) is securely persisted via LocalStorage.

---

## 🛠️ Tech Stack

- **Core**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Visualization**: [Recharts](https://recharts.org/)
- **Networking**: [Axios](https://axios-http.com/)
- **API**: [CryptoCompare Data API](https://min-api.cryptocompare.com/)
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

This project was developed as a group effort for our college coursework. Below are the core contributors and their primary responsibilities:

| Name | Role | Key Contributions |
| :--- | :--- | :--- |
| **Somyajeet** | State & Persistence | Architected global state with Zustand and implemented LocalStorage data persistence. |
| **Krishiv** | API & Services | Integrated CryptoCompare API, handled Axios networking, and News Feed logic. |
| **Sushant** | UI/UX & Documentation | Lead UI design using Tailwind CSS, Logo branding, and Technical Documentation. |
| **Kaustubh** | Charts & Alerts | Developed interactive Recharts visualization and the real-time Price Alert system. |

---

## 📝 Usage Notes

- **API Rate Limits**: The application uses the CryptoCompare free tier. Polling intervals are optimized to stay within limits.
- **Browser Storage**: Clearing browser cache/storage will reset your local portfolio and watchlist data.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

