import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// import { useGameStore } from '../../store/gameStore'; // unused
import { useSpeech } from '../../hooks/useSpeech';
import confetti from 'canvas-confetti';
import { Heart, Zap } from 'lucide-react';
import clsx from 'clsx';

export const MathStage: React.FC = () => {
    const { speak } = useSpeech();
    const [problem, setProblem] = useState<{ a: number; b: number; total: number; options: number[] } | null>(null);
    const [success, setSuccess] = useState(false);

    const generateProblem = () => {
        // Simple addition: A + B = Total (Total <= 10)
        const a = Math.floor(Math.random() * 5) + 1; // 1-5
        const b = Math.floor(Math.random() * (10 - a)) + 1; // Ensure sum <= 10
        const total = a + b;

        // Generate options (unique, include positive numbers)
        const opts = new Set<number>();
        opts.add(total);
        while (opts.size < 3) {
            const r = Math.max(1, total + (Math.floor(Math.random() * 5) - 2));
            if (r !== total && r <= 10) opts.add(r);
        }

        setProblem({ a, b, total, options: Array.from(opts).sort(() => Math.random() - 0.5) });
        setSuccess(false);
    };

    useEffect(() => {
        generateProblem();
    }, []);

    const handleOptionDrop = (val: number) => {
        if (!problem) return;
        if (val === problem.total) {
            setSuccess(true);
            speak("Great Thinking!");
            confetti({ particleCount: 200, spread: 80, origin: { y: 0.6 } });

            // Next problem after delay
            setTimeout(generateProblem, 2000);
        } else {
            speak("Try again");
        }
    };

    if (!problem) return null;

    return (
        <div className="flex flex-col items-center h-full justify-evenly">
            <h2 className="text-3xl font-bold text-slate-400">Add them up!</h2>

            {/* Visual Groups */}
            <div className="flex items-center gap-8 bg-white/50 p-8 rounded-3xl shadow-sm border-4 border-slate-100">
                <div className="flex gap-2 flex-wrap justify-center w-40">
                    {Array.from({ length: problem.a }).map((_, i) => (
                        <motion.div key={`a-${i}`} animate={success ? { y: -20 } : {}} transition={{ delay: i * 0.1, y: { repeat: success ? 2 : 0 } }}>
                            <Heart className="w-12 h-12 fill-pastel-pink text-pastel-pink drop-shadow-md" />
                        </motion.div>
                    ))}
                </div>

                <div className="text-6xl font-black text-slate-300">+</div>

                <div className="flex gap-2 flex-wrap justify-center w-40">
                    {Array.from({ length: problem.b }).map((_, i) => (
                        <motion.div key={`b-${i}`} animate={success ? { y: -20 } : {}} transition={{ delay: i * 0.1, y: { repeat: success ? 2 : 0 } }}>
                            <Zap className="w-12 h-12 fill-pastel-blue text-pastel-blue drop-shadow-md" />
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Target & Options */}
            <div className="flex flex-col items-center gap-8 w-full z-10">
                {/* Target Box */}
                <div
                    id="answer-box"
                    className={clsx(
                        "w-32 h-32 rounded-3xl flex items-center justify-center border-4 transition-all text-6xl font-black",
                        success ? "border-green-400 bg-green-100 text-green-600 scale-110" : "border-dashed border-slate-300 bg-slate-50 text-slate-300"
                    )}
                >
                    {success ? problem.total : '?'}
                </div>

                {/* Draggable Options */}
                {!success && (
                    <div className="flex gap-6">
                        {problem.options.map((opt) => (
                            <DraggableOption key={opt} value={opt} onDrop={handleOptionDrop} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const DraggableOption: React.FC<{ value: number; onDrop: (val: number) => void }> = ({ value, onDrop }) => {
    const { speak } = useSpeech();

    return (
        <motion.div
            drag
            dragSnapToOrigin
            whileHover={{ scale: 1.1, cursor: 'grab' }}
            whileDrag={{ scale: 1.2, cursor: 'grabbing', zIndex: 100 }}
            onDragStart={() => speak(value.toString())}
            onDragEnd={(_, info) => {
                const target = document.getElementById('answer-box');
                if (target) {
                    const rect = target.getBoundingClientRect();
                    const point = info.point;
                    if (
                        point.x >= rect.left && point.x <= rect.right &&
                        point.y >= rect.top && point.y <= rect.bottom
                    ) {
                        onDrop(value);
                    }
                }
            }}
            className="w-24 h-24 rounded-full bg-white shadow-lg border-b-8 border-slate-200 flex items-center justify-center text-4xl font-bold text-slate-700 select-none pb-2"
        >
            {value}
        </motion.div>
    );
};
