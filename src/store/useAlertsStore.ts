import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { PriceAlert } from '../types';

interface AlertsState {
  alerts: PriceAlert[];
  addAlert: (alert: Omit<PriceAlert, 'id' | 'isActive'>) => void;
  removeAlert: (id: string) => void;
  toggleAlertActive: (id: string) => void;
}

export const useAlertsStore = create<AlertsState>()(
  persist(
    (set) => ({
      alerts: [],
      addAlert: (alert) =>
        set((state) => ({
          alerts: [
            ...state.alerts,
            {
              ...alert,
              id: crypto.randomUUID(),
              isActive: true,
            },
          ],
        })),
      removeAlert: (id) =>
        set((state) => ({
          alerts: state.alerts.filter((a) => a.id !== id),
        })),
      toggleAlertActive: (id) =>
        set((state) => ({
          alerts: state.alerts.map((a) =>
            a.id === id ? { ...a, isActive: !a.isActive } : a
          ),
        })),
    }),
    {
      name: 'alerts-storage',
    }
  )
);
