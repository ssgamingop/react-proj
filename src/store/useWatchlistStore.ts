import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WatchlistState {
  favorites: string[]; // Array of coin symbols
  addFavorite: (symbol: string) => void;
  removeFavorite: (symbol: string) => void;
  toggleFavorite: (symbol: string) => void;
}

export const useWatchlistStore = create<WatchlistState>()(
  persist(
    (set) => ({
      favorites: [],
      addFavorite: (symbol) =>
        set((state) => ({
          favorites: state.favorites.includes(symbol)
            ? state.favorites
            : [...state.favorites, symbol],
        })),
      removeFavorite: (symbol) =>
        set((state) => ({
          favorites: state.favorites.filter((s) => s !== symbol),
        })),
      toggleFavorite: (symbol) =>
        set((state) => ({
          favorites: state.favorites.includes(symbol)
            ? state.favorites.filter((s) => s !== symbol)
            : [...state.favorites, symbol],
        })),
    }),
    {
      name: 'watchlist-storage',
    }
  )
);
