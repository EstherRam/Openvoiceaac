import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CustomWord {
  id: string;
  text: string;
  category: string;
  color: "blue" | "purple" | "teal" | "gray" | "pink";
}

interface CustomWordsContextType {
  customWords: CustomWord[];
  addCustomWord: (word: Omit<CustomWord, 'id'>) => void;
  editCustomWord: (id: string, text: string) => void;
  deleteCustomWord: (id: string) => void;
  getWordsByCategory: (category: string) => CustomWord[];
}

const CustomWordsContext = createContext<CustomWordsContextType | undefined>(undefined);

export function CustomWordsProvider({ children }: { children: ReactNode }) {
  const [customWords, setCustomWords] = useState<CustomWord[]>([]);

  // Load custom words from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('customWords');
    if (saved) {
      try {
        setCustomWords(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load custom words:', e);
      }
    }
  }, []);

  // Save custom words to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('customWords', JSON.stringify(customWords));
  }, [customWords]);

  const addCustomWord = (word: Omit<CustomWord, 'id'>) => {
    const newWord: CustomWord = {
      ...word,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    };
    setCustomWords((prev) => [...prev, newWord]);
  };

  const editCustomWord = (id: string, text: string) => {
    setCustomWords((prev) => prev.map((word) => word.id === id ? { ...word, text } : word));
  };

  const deleteCustomWord = (id: string) => {
    setCustomWords((prev) => prev.filter((word) => word.id !== id));
  };

  const getWordsByCategory = (category: string) => {
    return customWords.filter((word) => word.category === category);
  };

  return (
    <CustomWordsContext.Provider value={{ customWords, addCustomWord, editCustomWord, deleteCustomWord, getWordsByCategory }}>
      {children}
    </CustomWordsContext.Provider>
  );
}

export function useCustomWords() {
  const context = useContext(CustomWordsContext);
  if (context === undefined) {
    throw new Error('useCustomWords must be used within a CustomWordsProvider');
  }
  return context;
}