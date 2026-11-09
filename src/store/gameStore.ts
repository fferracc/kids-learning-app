import { create } from 'zustand';

export type GameMode = 'alphabet' | 'numbers' | 'math';

interface GameState {
    currentMode: GameMode;
    score: number;
    currentItem: string | number | null; // The current letter/number being played
    isMuted: boolean;

    setMode: (mode: GameMode) => void;
    setScore: (score: number) => void;
    incrementScore: () => void;
    setCurrentItem: (item: string | number | null) => void;
    toggleMute: () => void;
}

export const useGameStore = create<GameState>((set) => ({
    currentMode: 'alphabet',
    score: 0,
    currentItem: null,
    isMuted: false,

    setMode: (mode) => set({ currentMode: mode, currentItem: null }),
    setScore: (score) => set({ score }),
    incrementScore: () => set((state) => ({ score: state.score + 1 })),
    setCurrentItem: (item) => set({ currentItem: item }),
    toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
}));
