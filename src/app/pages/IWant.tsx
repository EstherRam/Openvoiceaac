import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import VocabularyTile from '../components/VocabularyTile';
import AddWordModal from '../components/AddWordModal';

interface CustomWord {
  id: string;
  text: string;
  color: string;
}

const defaultWords = [
  'water', 'snack', 'break', 'help', 'music', 'toy',
  'book', 'outside', 'hug', 'quiet', 'friend', 'play',
  'walk', 'tablet', 'tv', 'lunch', 'bathroom', 'sleep',
  'talk', 'alone'
];

export default function IWant() {
  const [hiddenWords, setHiddenWords] = useState<string[]>([]);
  const [customWords, setCustomWords] = useState<CustomWord[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWord, setEditingWord] = useState<CustomWord | null>(null);

  // Load hidden words and custom words from localStorage
  useEffect(() => {
    const hidden = localStorage.getItem('hiddenWantWords');
    if (hidden) {
      setHiddenWords(JSON.parse(hidden));
    }

    const custom = localStorage.getItem('customWantWords');
    if (custom) {
      setCustomWords(JSON.parse(custom));
    }
  }, []);

  const handleHideWord = (word: string) => {
    const updated = [...hiddenWords, word];
    setHiddenWords(updated);
    localStorage.setItem('hiddenWantWords', JSON.stringify(updated));
  };

  const handleAddWord = (text: string, color: string) => {
    if (editingWord) {
      const updated = customWords.map(w => 
        w.id === editingWord.id ? { ...w, text, color } : w
      );
      setCustomWords(updated);
      localStorage.setItem('customWantWords', JSON.stringify(updated));
      setEditingWord(null);
    } else {
      const newWord: CustomWord = {
        id: Date.now().toString(),
        text,
        color
      };
      const updated = [...customWords, newWord];
      setCustomWords(updated);
      localStorage.setItem('customWantWords', JSON.stringify(updated));
    }
  };

  const handleEditWord = (word: CustomWord) => {
    setEditingWord(word);
    setIsModalOpen(true);
  };

  const handleDeleteCustomWord = (id: string) => {
    const updated = customWords.filter(w => w.id !== id);
    setCustomWords(updated);
    localStorage.setItem('customWantWords', JSON.stringify(updated));
  };

  const handleWordClick = (word: string) => {
    // Speak "I want [word]" immediately
    const utterance = new SpeechSynthesisUtterance(`I want ${word}`);
    window.speechSynthesis.cancel(); // Cancel any ongoing speech
    window.speechSynthesis.speak(utterance);
  };

  const visibleDefaultWords = defaultWords.filter(word => !hiddenWords.includes(word));

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="grid grid-cols-5 gap-4">
        {visibleDefaultWords.map((word) => (
          <VocabularyTile
            key={word}
            text={word}
            color="#9333EA"
            onLongPress={() => handleHideWord(word)}
            onClick={() => handleWordClick(word)}
          />
        ))}

        {customWords.map((word) => (
          <VocabularyTile
            key={word.id}
            text={word.text}
            color={word.color}
            isCustom
            onEdit={() => handleEditWord(word)}
            onDelete={() => handleDeleteCustomWord(word.id)}
            onClick={() => handleWordClick(word.text)}
          />
        ))}

        {/* Add More Tile */}
        <button
          onClick={() => {
            setEditingWord(null);
            setIsModalOpen(true);
          }}
          className="aspect-square rounded-3xl border-4 border-dashed border-gray-400 hover:border-gray-600 transition-colors flex flex-col items-center justify-center gap-2 bg-transparent"
        >
          <Plus className="w-12 h-12 text-gray-400" />
          <span className="text-gray-600 text-lg font-medium">Add More</span>
        </button>
      </div>

      <AddWordModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingWord(null);
        }}
        onSave={handleAddWord}
        initialText={editingWord?.text}
        initialColor={editingWord?.color}
        title={editingWord ? 'Edit Word' : 'Add New Word'}
      />
    </div>
  );
}