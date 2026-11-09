import React from 'react';
import { useGameStore } from '../../store/gameStore';
import type { GameMode } from '../../store/gameStore';
import clsx from 'clsx';
import { motion } from 'framer-motion';

const MODES: { id: GameMode; label: string; icon: string }[] = [
    { id: 'alphabet', label: 'ABC', icon: '🅰️' },
    { id: 'numbers', label: '123', icon: '🔢' },
    { id: 'math', label: 'Math', icon: '➕' },
];

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const NUMBERS = Array.from({ length: 10 }, (_, i) => (i + 1).toString());

export const Sidebar: React.FC = () => {
    const { currentMode, currentItem, setMode, setCurrentItem } = useGameStore();

    const handleModeChange = (mode: GameMode) => {
        setMode(mode);
    };

    const items = currentMode === 'alphabet' ? ALPHABET : currentMode === 'numbers' ? NUMBERS : [];

    return (
        <aside className="w-24 md:w-32 bg-white/80 backdrop-blur-md h-full flex flex-col border-r-4 border-pastel-blue/30 shadow-xl z-20">
            {/* Mode Switcher */}
            <div className="flex flex-col gap-2 p-2 border-b-4 border-pastel-blue/20 bg-white/50">
                {MODES.map((mode) => (
                    <button
                        key={mode.id}
                        onClick={() => handleModeChange(mode.id)}
                        className={clsx(
                            "p-2 rounded-xl text-xl font-bold transition-all border-2",
                            currentMode === mode.id
                                ? "bg-pastel-yellow border-pastel-orange text-slate-800 scale-105 shadow-md"
                                : "bg-white border-transparent text-slate-400 hover:bg-white/50"
                        )}
                        aria-label={`Switch to ${mode.label}`}
                    >
                        {mode.label}
                    </button>
                ))}
            </div>

            {/* Item List */}
            <div className="flex-1 overflow-y-auto no-scrollbar p-2 flex flex-col gap-3 pb-8">
                {currentMode === 'math' ? (
                    <div className="text-center p-4 text-slate-500 font-bold">
                        Tap Start
                    </div>
                ) : (
                    items.map((item) => (
                        <motion.button
                            key={item}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setCurrentItem(item)}
                            className={clsx(
                                "p-4 rounded-2xl text-3xl font-black shadow-sm transition-colors border-2",
                                currentItem === item
                                    ? "bg-pastel-green border-green-400 text-white"
                                    : "bg-white border-slate-100 text-slate-700 hover:border-pastel-blue"
                            )}
                        >
                            {item}
                        </motion.button>
                    ))
                )}
            </div>
        </aside>
    );
};
