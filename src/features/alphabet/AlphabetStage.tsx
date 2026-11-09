import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import { useSpeech } from '../../hooks/useSpeech';
import { useSound } from '../../hooks/useSound';
import { ALPHABET_DATA } from '../../data/alphabetData';
import confetti from 'canvas-confetti';
import clsx from 'clsx';
// Import type separately to avoid runtime issues if bundler is strict
import type { WordData } from '../../data/alphabetData';

// Helper to shuffle array
function shuffle<T>(array: T[]): T[] {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
}

interface SourceItem {
    id: string; // Unique ID for keying (e.g. "A-0", "P-1")
    value: string; // The char or word
}

export const AlphabetStage: React.FC = () => {
    const { currentItem } = useGameStore();
    const { speak } = useSpeech();
    const soundUtils = useSound();

    // Game State
    const [stageLevel, setStageLevel] = useState<number>(1);
    const [selectedWordData, setSelectedWordData] = useState<WordData | null>(null);
    const [l1Filled, setL1Filled] = useState(false);

    // Progress State
    const [level2Filled, setLevel2Filled] = useState<boolean[]>([]);
    const [level3Filled, setLevel3Filled] = useState<boolean[]>([]);

    // Shuffled Sources
    const [l2Sources, setL2Sources] = useState<SourceItem[]>([]);
    const [l3Sources, setL3Sources] = useState<SourceItem[]>([]);

    // Safe Options Retrieval
    const wordOptions = useMemo(() => {
        if (!currentItem) return [];
        const letter = String(currentItem).toUpperCase();
        return ALPHABET_DATA[letter] || [];
    }, [currentItem]);

    // Reset logic on letter change
    useEffect(() => {
        setStageLevel(1);
        setL1Filled(false);
        setSelectedWordData(null);
        if (currentItem) {
            speak(`Letter ${currentItem}`);
        }
    }, [currentItem]);

    // --- Handlers ---

    // Level 1: Letter Fill
    const handleLevel1Drop = () => {
        try {
            setL1Filled(true);
            soundUtils.playSuccess();
            speak(String(currentItem));
            confetti({ particleCount: 50, spread: 50, origin: { y: 0.6 } });
            setTimeout(() => setStageLevel(1.5), 1500);
        } catch (e) {
            console.error("Level 1 Drop Error", e);
        }
    };

    // Level 1.5: Word Selection -> Start L2
    const handleWordSelect = (wordData: WordData) => {
        try {
            setSelectedWordData(wordData);

            // Prepare L2 Targets (empty)
            setLevel2Filled(new Array(wordData.word.length).fill(false));

            // Prepare L2 Sources (Shuffled Chars)
            const chars = wordData.word.split('').map((c, i) => ({ id: `${c}-${i}`, value: c }));
            setL2Sources(shuffle(chars));

            // Prepare L3 Targets (empty)
            setLevel3Filled(new Array(wordData.phrase.length).fill(false));

            // Prepare L3 Sources (Shuffled Words)
            const words = wordData.phrase.map((w, i) => ({ id: `${w}-${i}`, value: w }));
            setL3Sources(shuffle(words));

            soundUtils.playPop();
            speak(wordData.word);
            setStageLevel(2);
        } catch (e) {
            console.error("Error selecting word", e);
        }
    };

    // Level 2: Drag End Logic
    const onLevel2DragEnd = (sourceId: string, char: string, point: { x: number, y: number }) => {
        if (!selectedWordData) return;

        // Check collision with ANY matching empty target
        const word = selectedWordData.word;
        let matchIndex = -1;

        for (let i = 0; i < word.length; i++) {
            // Is this slot expecting this char? AND Is it empty?
            if (word[i] === char && !level2Filled[i]) {
                const target = document.getElementById(`l2-slot-${i}`);
                if (target && doCollide(target, point)) {
                    matchIndex = i;
                    break; // Found a valid slot
                }
            }
        }

        if (matchIndex !== -1) {
            // Success
            const newFilled = [...level2Filled];
            newFilled[matchIndex] = true;
            setLevel2Filled(newFilled);

            // Remove from source list
            setL2Sources(prev => prev.filter(item => item.id !== sourceId));

            soundUtils.playDing();
            speak(char);

            // Check Win
            if (newFilled.every(Boolean)) {
                setTimeout(() => {
                    soundUtils.playSuccess();
                    speak(selectedWordData.word);
                    confetti({ particleCount: 50 });
                    setTimeout(() => setStageLevel(3), 2000);
                }, 500);
            }
        }
    };

    // Level 3: Drag End Logic
    const onLevel3DragEnd = (sourceId: string, wordVal: string, point: { x: number, y: number }) => {
        if (!selectedWordData) return;

        const phrase = selectedWordData.phrase;
        let matchIndex = -1;

        for (let i = 0; i < phrase.length; i++) {
            if (phrase[i] === wordVal && !level3Filled[i]) {
                const target = document.getElementById(`l3-slot-${i}`);
                if (target && doCollide(target, point)) {
                    matchIndex = i;
                    break;
                }
            }
        }

        if (matchIndex !== -1) {
            const newFilled = [...level3Filled];
            newFilled[matchIndex] = true;
            setLevel3Filled(newFilled);

            setL3Sources(prev => prev.filter(item => item.id !== sourceId));

            soundUtils.playDing();
            speak(wordVal);

            if (newFilled.every(Boolean)) {
                setTimeout(() => {
                    soundUtils.playSuccess();
                    speak(selectedWordData.phrase.join(' '));
                    confetti({ particleCount: 150, zIndex: 100 });
                }, 800);
            }
        }
    };

    if (!currentItem) {
        return <div className="h-full flex items-center justify-center"><h1 className="text-4xl text-pastel-blue font-bold">Select a Letter!</h1></div>;
    }

    return (
        <div className="flex flex-col items-center justify-center h-full gap-8 w-full max-w-4xl mx-auto relative overflow-hidden">

            {/* Header Emoji */}
            <AnimatePresence mode="popLayout">
                {stageLevel >= 2 && selectedWordData && (
                    <motion.div
                        key="header-emoji"
                        className="text-8xl drop-shadow-xl mb-4"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                    >
                        {selectedWordData.emoji}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- LEVEL 1 --- */}
            {stageLevel === 1 && (
                <div className="flex items-center justify-center gap-8 md:gap-24 relative p-8 w-full">
                    {/* Target */}
                    <div id="l1-target" className="relative flex items-center justify-center select-none">
                        {l1Filled ? (
                            <motion.span
                                layoutId="l1-filled"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-[150px] md:text-[250px] font-black text-pastel-yellow drop-shadow-lg leading-none"
                                style={{ fontFamily: '"Varela Round", sans-serif' }}
                            >
                                {currentItem}
                            </motion.span>
                        ) : (
                            <span
                                className="text-[150px] md:text-[250px] font-black text-transparent"
                                style={{ WebkitTextStroke: '8px #AEC6CF', fontFamily: '"Varela Round", sans-serif' }}
                            >
                                {currentItem}
                            </span>
                        )}
                        {!l1Filled && <div className="absolute -bottom-8 md:-bottom-12 text-pastel-blue/50 font-bold animate-pulse text-lg md:text-xl">Fill the Shape!</div>}
                    </div>

                    {/* Source */}
                    {!l1Filled && (
                        <motion.div
                            drag
                            dragSnapToOrigin
                            whileDrag={{ scale: 1.1, zIndex: 50 }}
                            onDragStart={() => speak(String(currentItem))}
                            onDragEnd={(_, info) => {
                                const target = document.getElementById('l1-target');
                                if (target && doCollide(target, info.point)) handleLevel1Drop();
                            }}
                            className="cursor-move z-10 text-[150px] md:text-[250px] font-black text-pastel-yellow drop-shadow-lg leading-none hover:text-pastel-orange"
                            style={{ fontFamily: '"Varela Round", sans-serif' }}
                        >
                            {currentItem}
                        </motion.div>
                    )}
                </div>
            )}

            {/* --- LEVEL 1.5 --- */}
            {stageLevel === 1.5 && (
                <div className="flex flex-col items-center gap-8 w-full animate-in fade-in slide-in-from-bottom duration-500">
                    <h2 className="text-3xl font-bold text-pastel-blue">Choose a word!</h2>
                    <div className="grid grid-cols-2 gap-4 p-4">
                        {wordOptions.map((opt, i) => (
                            <motion.button
                                key={`opt-${i}`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleWordSelect(opt)}
                                className="bg-white p-6 rounded-3xl shadow-lg border-4 border-slate-100 flex flex-col items-center gap-2 hover:border-pastel-yellow"
                            >
                                <span className="text-6xl">{opt.emoji}</span>
                                <span className="text-2xl font-black text-slate-700">{opt.word}</span>
                            </motion.button>
                        ))}
                    </div>
                </div>
            )}

            {/* --- LEVEL 2 --- */}
            {stageLevel === 2 && selectedWordData && (
                <div className="flex flex-col gap-12 w-full items-center">
                    {/* Targets (Fixed Order) */}
                    <div className="flex gap-2 flex-wrap justify-center">
                        {selectedWordData.word.split('').map((char, i) => (
                            <div
                                key={`target-${i}`}
                                id={`l2-slot-${i}`}
                                className="w-16 h-20 md:w-20 md:h-24 flex items-center justify-center text-5xl md:text-6xl font-black relative"
                            >
                                {level2Filled[i] ? (
                                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-slate-800">{char}</motion.span>
                                ) : (
                                    <span className="text-transparent absolute inset-0 flex items-center justify-center opacity-40"
                                        style={{ WebkitTextStroke: '4px #cbd5e1', fontFamily: '"Varela Round", sans-serif' }}>
                                        {char}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Sources (Shuffled) */}
                    <div className="flex gap-4 flex-wrap justify-center p-4 min-h-[100px]">
                        <AnimatePresence>
                            {l2Sources.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                    drag
                                    dragSnapToOrigin
                                    whileDrag={{ scale: 1.2, zIndex: 100 }}
                                    onDragStart={() => speak(item.value)}
                                    // Pass ID and Value
                                    onDragEnd={(_, info) => onLevel2DragEnd(item.id, item.value, info.point)}
                                    className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-2xl shadow-xl border-b-4 border-slate-200 flex items-center justify-center text-4xl md:text-5xl font-black text-pastel-blue cursor-grab"
                                >
                                    {item.value}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            )}

            {/* --- LEVEL 3 --- */}
            {stageLevel === 3 && selectedWordData && (
                <div className="flex flex-col gap-8 w-full items-center">
                    <h2 className="text-2xl text-pastel-blue font-bold">Build the sentence!</h2>

                    {/* Phrase Targets */}
                    <div className="flex flex-wrap gap-4 justify-center">
                        {selectedWordData.phrase.map((word, i) => (
                            <div
                                key={`p-slot-${i}`}
                                id={`l3-slot-${i}`}
                                className={clsx(
                                    "px-6 py-4 rounded-xl border-2 border-dashed flex items-center justify-center min-w-[100px]",
                                    level3Filled[i] ? "bg-pastel-green text-white border-transparent" : "bg-white/50 border-pastel-green/30"
                                )}
                            >
                                {level3Filled[i] ? (
                                    <span className="text-xl font-black">{word}</span>
                                ) : (
                                    <span className="text-xl font-black text-slate-300 opacity-50">{word}</span>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Shuffled Phrase Sources */}
                    <div className="flex flex-wrap gap-4 justify-center min-h-[80px]">
                        <AnimatePresence>
                            {l3Sources.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                    drag
                                    dragSnapToOrigin
                                    whileDrag={{ scale: 1.1 }}
                                    onDragStart={() => speak(item.value)}
                                    onDragEnd={(_, info) => onLevel3DragEnd(item.id, item.value, info.point)}
                                    className="px-6 py-4 bg-white rounded-xl shadow-lg border-2 border-pastel-blue text-xl font-bold text-pastel-blue cursor-grab"
                                >
                                    {item.value}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            )}

        </div>
    );
};

function doCollide(element: HTMLElement, point: { x: number; y: number }) {
    if (!element) return false;
    const rect = element.getBoundingClientRect();
    const margin = 50;
    return (
        point.x >= rect.left - margin &&
        point.x <= rect.right + margin &&
        point.y >= rect.top - margin &&
        point.y <= rect.bottom + margin
    );
}
