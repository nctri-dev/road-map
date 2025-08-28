import type { ToastProps } from "@/components/ui/Toast";
import { create } from "zustand";

interface ToastsState extends ToastProps {
  id: number;
}

interface ToastsStoreState {
  toasts: ToastsState[];
  addToast: (toast: ToastProps) => void;
  removeToast: (id: number) => void;
}

export const useToastStore = create<ToastsStoreState>((set) => ({
  toasts: [],
  addToast: ({ message, type }) => {
    const newToast = { id: Date.now(), message, type };

    set((state) => {
      return { toasts: [...state.toasts, newToast] };
    });

    setTimeout(() => {
      set((state) => {
        return {
          toasts: state.toasts.filter((toast) => toast.id !== newToast.id),
        };
      });
    }, 3000);
  },
  removeToast: (id) =>
    set((state) => {
      return { toasts: state.toasts.filter((toast) => toast.id !== id) };
    }),
}));
