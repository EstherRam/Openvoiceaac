import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface HiddenWordsContextType {
  hiddenWords: Set<string>;
  hideWord: (wordKey: string) => void;
  showWord: (wordKey: string) => void;
  isWordHidden: (wordKey: string) => boolean;
}

const HiddenWordsContext = createContext<HiddenWordsContextType | undefined>(undefined);

export function HiddenWordsProvider({ children }: { children: ReactNode }) {
  const [hiddenWords, setHiddenWords] = useState<Set<string>>(new Set());

  // Load hidden words from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('hiddenWords');
    if (saved) {
      try {
        setHiddenWords(new Set(JSON.parse(saved)));
      } catch (e) {
        console.error('Failed to load hidden words:', e);
      }
    }
  }, []);

  // Save hidden words to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('hiddenWords', JSON.stringify(Array.from(hiddenWords)));
  }, [hiddenWords]);

  const hideWord = (wordKey: string) => {
    setHiddenWords((prev) => new Set(prev).add(wordKey));
  };

  const showWord = (wordKey: string) => {
    setHiddenWords((prev) => {
      const newSet = new Set(prev);
      newSet.delete(wordKey);
      return newSet;
    });
  };

  const isWordHidden = (wordKey: string) => {
    return hiddenWords.has(wordKey);
  };

  return (
    <HiddenWordsContext.Provider value={{ hiddenWords, hideWord, showWord, isWordHidden }}>
      {children}
    </HiddenWordsContext.Provider>
  );
}

export function useHiddenWords() {
  const context = useContext(HiddenWordsContext);
  if (context === undefined) {
    throw new Error('useHiddenWords must be used within a HiddenWordsProvider');
  }
  return context;
}
