import { createContext, useContext, useState, ReactNode } from 'react';

interface SpeechContextType {
  words: string[];
  addWord: (word: string) => void;
  removeWord: (index: number) => void;
  clearAll: () => void;
  speak: () => void;
}

const SpeechContext = createContext<SpeechContextType | undefined>(undefined);

export function SpeechProvider({ children }: { children: ReactNode }) {
  const [words, setWords] = useState<string[]>([]);

  const addWord = (word: string) => {
    setWords((prev) => [...prev, word]);
  };

  const removeWord = (index: number) => {
    setWords((prev) => prev.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    setWords([]);
  };

  const speak = () => {
    if (words.length === 0) return;
    
    const text = words.join(' ');
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;
    
    window.speechSynthesis.cancel(); // Cancel any ongoing speech
    window.speechSynthesis.speak(utterance);
  };

  return (
    <SpeechContext.Provider value={{ words, addWord, removeWord, clearAll, speak }}>
      {children}
    </SpeechContext.Provider>
  );
}

export function useSpeech() {
  const context = useContext(SpeechContext);
  if (context === undefined) {
    throw new Error('useSpeech must be used within a SpeechProvider');
  }
  return context;
}