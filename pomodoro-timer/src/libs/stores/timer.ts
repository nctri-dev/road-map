import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TimerState {
  focus: number;
  short: number;
  long: number;
  setTimer: ({
    focus,
    short,
    long,
  }: {
    focus: number;
    short: number;
    long: number;
  }) => void;
  setFocus: (min: number) => void;
  setShort: (min: number) => void;
  setLong: (min: number) => void;
}

export const useTimerStore = create<TimerState>()(
  persist(
    (set) => ({
      focus: 25,
      short: 5,
      long: 15,
      setTimer: ({ focus, short, long }) =>
        set((state) => ({ ...state, focus, short, long })),
      setFocus: (min) => set((state) => ({ ...state, focus: min })),
      setShort: (min) => set((state) => ({ ...state, short: min })),
      setLong: (min) => set((state) => ({ ...state, long: min })),
    }),
    {
      name: "timer",
    }
  )
);
