import { create } from 'zustand';

export interface GnbStore {
  backAction: (() => void) | null;
  title: string;
  subtitle: string;
  isSearching: boolean;
  rightButtons: React.ReactNode[];

  setBackAction: (action: (() => void) | null) => void;
  setTitle: (title: string) => void;
  setIsSearching: (isSearching: boolean) => void;
  setSubtitle: (subtitle: string) => void;
  setRightButtons: (buttons: React.ReactNode[]) => void;
  addRightButton: (button: React.ReactNode) => void;
  resetGnb: () => void;
}

export const useGnbStore = create<GnbStore>((set) => ({
  backAction: null,
  title: '어디가냥',
  isSearching: false,
  subtitle: '',
  rightButtons: [],

  setBackAction: (action) => set({ backAction: action }),
  setTitle: (title) => set({ title }),
  setIsSearching: (isSearching) => set({ isSearching }),
  setSubtitle: (subtitle) => set({ subtitle }),
  setRightButtons: (buttons) => set({ rightButtons: buttons.slice(0, 2) }),
  addRightButton: (button) =>
    set((state) => ({ rightButtons: [...state.rightButtons, button].slice(0, 2) })),
  resetGnb: () =>
    set({
      backAction: null,
      title: '어디가냥',
      isSearching: false,
      subtitle: '',
      rightButtons: [],
    }),
}));
