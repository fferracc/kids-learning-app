import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import { useSpeech } from '../../hooks/useSpeech';
import { useSound } from '../../hooks/useSound';
import confetti from 'canvas-confetti';
import {
    Sun,        // 1
    Car,        // 2
    Apple,      // 3
    Fish,       // 4
    Star,       // 5
    Flower,     // 6
    Bird,       // 7
    Cookie,     // 8
    Leaf,       // 9
    Heart       // 10
} from 'lucide-react';
import clsx from 'clsx';

// Dynamic Items Mapped 1-10 with explicit Plurals
const ITEMS = [
    { id: 'sun', label: 'Sun', plural: 'Suns', Icon: Sun, color: 'text-yellow-500' },
    { id: 'car', label: 'Car', plural: 'Cars', Icon: Car, color: 'text-blue-500' },
    { id: 'apple', label: 'Apple', plural: 'Apples', Icon: Apple, color: 'text-red-500' },
    { id: 'fish', label: 'Fish', plural: 'Fish', Icon: Fish, color: 'text-cyan-500' }, // Fish is its own plural usually
    { id: 'star', label: 'Star', plural: 'Stars', Icon: Star, color: 'text-amber-400' },
    { id: 'flower', label: 'Flower', plural: 'Flowers', Icon: Flower, color: 'text-pink-500' },
    { id: 'bird', label: 'Bird', plural: 'Birds', Icon: Bird, color: 'text-purple-500' },
    { id: 'cookie', label: 'Cookie', plural: 'Cookies', Icon: Cookie, color: 'text-orange-600' },
    { id: 'leaf', label: 'Leaf', plural: 'Leaves', Icon: Leaf, color: 'text-green-500' },
    { id: 'heart', label: 'Heart', plural: 'Hearts', Icon: Heart, color: 'text-rose-500' },
];

interface DraggableItem {
    uid: string; // Unique ID for every single instance (e.g. apple-1, apple-2)
    x: number;
    y: number;
}

export const NumberStage: React.FC = () => {
    const { currentItem } = useGameStore();
    const { speak } = useSpeech();
    const { playPop, playSuccess } = useSound();

    // Game State
    const targetNumber = parseInt(currentItem?.toString() || '0', 10);
    const [filledItems, setFilledItems] = useState<string[]>([]); // Array of UIDs that are dropped
    const [sourceItems, setSourceItems] = useState<DraggableItem[]>([]);

    // Deterministically pick item based on number (1-based index mapped to 0-based array)
    const itemType = useMemo(() => {
        if (targetNumber > 0 && targetNumber <= ITEMS.length) {
            return ITEMS[targetNumber - 1];
        }
        // Fallback for > 10 or 0
        return ITEMS[Math.floor(Math.random() * ITEMS.length)];
    }, [targetNumber]);

    const singular = itemType.label;
    const plural = itemType.plural;

    // Initialize Items
    useEffect(() => {
        setFilledItems([]);
        const newItems: DraggableItem[] = [];
        for (let i = 0; i < targetNumber; i++) {
            newItems.push({
                uid: `${itemType.id}-${i}`,
                // Random position scatter
                x: Math.random() * 20 - 10,
                y: Math.random() * 20 - 10
            });
        }
        setSourceItems(newItems);
        if (targetNumber > 0) {
            const label = targetNumber === 1 ? singular : plural;
            speak(`${targetNumber} ${label}`);
        }
    }, [targetNumber, itemType, speak, plural, singular]);


    const handleDrop = (uid: string) => {
        // Prevent double counting
        if (filledItems.includes(uid)) return;

        const newFilled = [...filledItems, uid];
        setFilledItems(newFilled);
        playPop();

        const count = newFilled.length;

        if (count === targetNumber) {
            // Success
            const label = targetNumber === 1 ? singular : plural;
            speak(`${targetNumber} ${label}!`);
            playSuccess();
            confetti({
                particleCount: 150,
                spread: 100,
                origin: { y: 0.6 },
                colors: ['#FDFD96', '#AEC6CF', '#77DD77']
            });
        } else {
            // Count aloud
            speak(`${count}`);
        }
    };

    if (!targetNumber || targetNumber === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center animate-pulse">
                <h2 className="text-4xl font-bold text-pastel-green mb-4">Pick a Number!</h2>
                <div className="text-8xl">👈</div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center h-full py-4 gap-8 relative overflow-hidden">
            {/* Target Number Display */}
            <div className="absolute top-4 right-8 text-9xl font-black text-pastel-green/20 select-none z-0">
                {targetNumber}
            </div>

            {/* TARGET CIRCLE */}
            <div
                id="target-circle"
                className="w-72 h-72 md:w-96 md:h-96 rounded-full border-4 border-dashed border-pastel-green/50 bg-white/40 flex items-center justify-center relative flex-wrap content-center gap-2 p-8 transition-all z-10"
            >
                {/* Visual Hint */}
                {filledItems.length === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30 animate-pulse text-pastel-green font-bold text-2xl">
                        Drag {plural} Here!
                    </div>
                )}

                {/* Filled Items inside Circle */}
                <AnimatePresence>
                    {filledItems.map((uid) => (
                        <motion.div
                            key={`filled-${uid}`}
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0 }}
                            className={clsx("drop-shadow-sm", itemType.color)}
                        >
                            <itemType.Icon size={48} className="fill-current" />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* SOURCE PILE - SCATTERED */}
            <div className="flex-1 w-full relative z-20">
                {/* Success Message Overlay */}
                {filledItems.length === targetNumber && (
                    <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white/90 p-8 rounded-3xl shadow-xl border-4 border-pastel-green text-center backdrop-blur"
                        >
                            <div className="text-6xl font-black text-pastel-green mb-2">{targetNumber}</div>
                            <div className="text-3xl font-bold text-slate-700">
                                {targetNumber === 1 ? singular : plural}!
                            </div>
                        </motion.div>
                    </div>
                )}

                {/* Draggable Items */}
                <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 p-8 h-full content-start">
                    <AnimatePresence>
                        {sourceItems.map((item) => {
                            // Don't render if filled
                            if (filledItems.includes(item.uid)) return null;

                            return (
                                <motion.div
                                    key={item.uid}
                                    layoutId={item.uid}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{
                                        scale: 1,
                                        opacity: 1,
                                        rotate: Math.random() * 30 - 15,
                                        x: item.x,
                                        y: item.y
                                    }}
                                    exit={{ scale: 0 }}
                                    drag
                                    dragSnapToOrigin
                                    whileHover={{ scale: 1.1, cursor: 'grab', zIndex: 50 }}
                                    whileDrag={{ scale: 1.2, cursor: 'grabbing', zIndex: 100 }}
                                    onDragStart={() => speak(singular)}
                                    // Robust Collision
                                    onDragEnd={(_, info) => {
                                        const target = document.getElementById('target-circle');
                                        if (target) {
                                            const rect = target.getBoundingClientRect();
                                            const point = info.point;
                                            // Margin for clumsy fingers
                                            if (
                                                point.x >= rect.left - 20 && point.x <= rect.right + 20 &&
                                                point.y >= rect.top - 20 && point.y <= rect.bottom + 20
                                            ) {
                                                handleDrop(item.uid);
                                            }
                                        }
                                    }}
                                >
                                    <div className={clsx("p-4 bg-white rounded-full shadow-lg border-b-4 border-slate-200 hover:border-pastel-green transition-colors", itemType.color)}>
                                        <itemType.Icon size={64} className="fill-current" />
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};
