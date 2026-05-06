import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { PortfolioAsset } from '../types';

interface PortfolioState {
  assets: PortfolioAsset[];
  addAsset: (asset: Omit<PortfolioAsset, 'id' | 'dateAdded'>) => void;
  removeAsset: (id: string) => void;
  updateAsset: (id: string, updates: Partial<PortfolioAsset>) => void;
}

export const usePortfolioStore = create<PortfolioState>()(
  persist(
    (set) => ({
      assets: [],
      addAsset: (asset) =>
        set((state) => ({
          assets: [
            ...state.assets,
            {
              ...asset,
              id: crypto.randomUUID(),
              dateAdded: Date.now(),
            },
          ],
        })),
      removeAsset: (id) =>
        set((state) => ({
          assets: state.assets.filter((a) => a.id !== id),
        })),
      updateAsset: (id, updates) =>
        set((state) => ({
          assets: state.assets.map((a) =>
            a.id === id ? { ...a, ...updates } : a
          ),
        })),
    }),
    {
      name: 'portfolio-storage',
    }
  )
);
