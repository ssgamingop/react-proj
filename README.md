# Crypto Tracker

A modern, real-time financial dashboard to monitor cryptocurrency prices, manage a mock portfolio, and track market trends. Built with React, Vite, Tailwind CSS, and the CryptoCompare API.

## Features

- 📊 **Market Overview**: View the top 100 cryptocurrencies by market cap with real-time price updates and 24h change indicators.
- 💼 **Portfolio Tracker**: Manage a mock investment portfolio. Track your total balance, average buy prices, and calculate real-time profit/loss.
- ⭐ **Favorites Watchlist**: Keep a close eye on your preferred coins with a dedicated real-time watchlist widget.
- 📈 **Interactive Price Charts**: Visualize historical price data (7D, 30D, 90D) using beautiful area charts powered by Recharts.
- 🔔 **Custom Price Alerts**: Set target price conditions (above/below) and receive instant toast notifications when the market hits your marks.
- 📰 **Live News Feed**: Stay updated with the latest cryptocurrency headlines directly within the dashboard.
- 💾 **Local Persistence**: Your portfolio, watchlist, and alerts are saved automatically to LocalStorage so you never lose your data.

## Tech Stack

- **Framework**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Charting**: [Recharts](https://recharts.org/)
- **Data Provider**: [CryptoCompare API](https://min-api.cryptocompare.com/) (Free Tier)
- **Icons**: [Lucide React](https://lucide.dev/)

## Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (v18 or higher recommended).

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd proj
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173` (or the port provided by Vite).

## Building for Production

To create a production-ready build:

```bash
npm run build
```

This will generate optimized static assets in the `dist` directory. To preview the build:

```bash
npm run preview
```

## Usage Notes

- **API Limits**: This application relies on the free tier of the CryptoCompare API. Real-time polling is set to conservative intervals (e.g., 60s for portfolio, 20s for alerts) to respect rate limits.
- **Persistence**: Clearing your browser's local storage will reset your portfolio, watchlist, and alerts.

## License

MIT License
