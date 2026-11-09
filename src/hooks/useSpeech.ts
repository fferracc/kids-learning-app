import { useCallback } from 'react';
import { useGameStore } from '../store/gameStore';

export const useSpeech = () => {
    const isMuted = useGameStore((state: any) => state.isMuted);

    const speak = useCallback((text: string) => {
        if (isMuted) return;

        // Cancel currently speaking
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);

        // Enthusiasm settings
        utterance.pitch = 1.2; // Slightly higher pitch for friendliness
        utterance.rate = 1.0;  // Normal speed
        utterance.volume = 1.0;

        // Try to find a good English voice
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(v => v.lang.startsWith('en') && !v.name.includes('Microsoft David')) || voices[0];
        if (preferredVoice) utterance.voice = preferredVoice;

        window.speechSynthesis.speak(utterance);
    }, [isMuted]);

    const cancel = useCallback(() => {
        window.speechSynthesis.cancel();
    }, []);

    return { speak, cancel };
};
