import { useCallback, useRef, useEffect } from 'react';
import { useGameStore } from '../store/gameStore';

export const useSound = () => {
    const isMuted = useGameStore((state) => state.isMuted);
    const audioCtxRef = useRef<AudioContext | null>(null);

    useEffect(() => {
        // Initialize AudioContext on first user interaction usually, 
        // but lets try to init it on mount and resume on play.
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
            audioCtxRef.current = new AudioContextClass();
        }
    }, []);

    const playTone = useCallback((freq: number, type: OscillatorType, duration: number, vol: number = 0.1) => {
        if (isMuted || !audioCtxRef.current) return;
        const ctx = audioCtxRef.current;
        if (ctx.state === 'suspended') ctx.resume();

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        gain.gain.setValueAtTime(vol, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + duration);
    }, [isMuted]);

    const playPop = useCallback(() => {
        playTone(600, 'sine', 0.1, 0.1);
    }, [playTone]);

    const playDing = useCallback(() => {
        // High pitched bell
        playTone(1200, 'sine', 0.5, 0.05);
        setTimeout(() => playTone(1800, 'sine', 0.8, 0.03), 50);
    }, [playTone]);

    const playSuccess = useCallback(() => {
        // Major Chord Arpeggio
        // const now = audioCtxRef.current?.currentTime || 0;
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C E G C

        notes.forEach((freq, i) => {
            setTimeout(() => playTone(freq, 'triangle', 0.3, 0.1), i * 100);
        });
    }, [playTone]);

    const playFailure = useCallback(() => {
        playTone(150, 'sawtooth', 0.4, 0.1);
    }, [playTone]);

    return { playPop, playDing, playSuccess, playFailure };
};
