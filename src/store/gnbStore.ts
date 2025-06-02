import { create } from 'zustand';

interface GnbStore {
  backAction: (() => void) | null;
  title: string;
  rightButtons: React.ReactNode[];

  setBackAction: (action: (() => void) | null) => void;
  setTitle: (title: string) => void;
  setRightButtons: (buttons: React.ReactNode[]) => void;
  addRightButton: (button: React.ReactNode) => void;
  resetGnb: () => void;
}

const DEFAULT_BACK_ACTION = () => {
  if (typeof window !== 'undefined') {
    window.history.back();
  }
};

export const useGnbStore = create<GnbStore>((set) => ({
  backAction: DEFAULT_BACK_ACTION,
  title: '어디가냥',
  rightButtons: [],

  setBackAction: (action) => set({ backAction: action }),
  setTitle: (title) => set({ title }),
  setRightButtons: (buttons) => set({ rightButtons: buttons.slice(0, 2) }),
  addRightButton: (button) =>
    set((state) => ({ rightButtons: [...state.rightButtons, button].slice(0, 2) })),
  resetGnb: () =>
    set({
      backAction: DEFAULT_BACK_ACTION,
      title: '어디가냥',
      rightButtons: [],
    }),
}));
