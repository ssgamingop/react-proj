import { create } from 'zustand';

interface MarketState {
  prices: Record<string, { price: number; timestamp: number; direction: 'up' | 'down' | 'none' }>;
  connectWebSocket: () => void;
  disconnectWebSocket: () => void;
}

let ws: WebSocket | null = null;

export const useMarketStore = create<MarketState>((set, get) => ({
  prices: {},
  
  connectWebSocket: () => {
    if (ws) return;
    
    ws = new WebSocket('wss://stream.binance.com:9443/ws/!miniTicker@arr');
    
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (Array.isArray(data)) {
          const updates: Record<string, { price: number; timestamp: number; direction: 'up' | 'down' | 'none' }> = {};
          const currentPrices = get().prices;
          
          data.forEach((ticker: any) => {
            if (ticker.s && ticker.s.endsWith('USDT')) {
              const symbol = ticker.s.replace('USDT', '');
              const newPrice = parseFloat(ticker.c);
              
              const oldData = currentPrices[symbol];
              let direction: 'up' | 'down' | 'none' = 'none';
              
              if (oldData) {
                if (newPrice > oldData.price) direction = 'up';
                else if (newPrice < oldData.price) direction = 'down';
                else direction = oldData.direction; // keep old direction to maintain color temporarily
              }
              
              // Only update if price changed significantly to prevent too many react renders?
              // Actually for real-time we want to update.
              if (!oldData || oldData.price !== newPrice) {
                 updates[symbol] = {
                  price: newPrice,
                  timestamp: Date.now(),
                  direction: direction === 'none' && oldData ? oldData.direction : direction
                 };
              }
            }
          });
          
          if (Object.keys(updates).length > 0) {
            set((state) => ({
              prices: { ...state.prices, ...updates }
            }));
          }
        }
      } catch (err) {
        console.error("Error parsing websocket data", err);
      }
    };
    
    ws.onclose = () => {
      ws = null;
      // Reconnect after 5 seconds
      setTimeout(() => {
        get().connectWebSocket();
      }, 5000);
    };
  },
  
  disconnectWebSocket: () => {
    if (ws) {
      ws.close();
      ws = null;
    }
  }
}));
