import { useSpeech } from "../contexts/SpeechContext";
import VocabButton from "../components/VocabButton";
import AddMoreButton from "../components/AddMoreButton";
import { useState } from "react";
import CustomWordModal from "../components/CustomWordModal";
import { useTheme } from "../contexts/ThemeContext";
import { useCustomWords } from "../contexts/CustomWordsContext";
import { useHiddenWords } from "../contexts/HiddenWordsContext";
import { Plus } from "lucide-react";

export default function SentenceBuilding() {
  const { addWord } = useSpeech();
  const { theme } = useTheme();
  const { addCustomWord, editCustomWord, deleteCustomWord, getWordsByCategory } = useCustomWords();
  const { hideWord, isWordHidden } = useHiddenWords();
  const isDark = theme === 'dark';
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWord, setEditingWord] = useState<{ id: string; text: string } | null>(null);
  const [activeCategory, setActiveCategory] = useState<{ name: string; color: "blue" | "purple" | "teal" | "gray" | "pink" }>({ name: '', color: 'gray' });

  const handleAddMore = (category: string, color: "blue" | "purple" | "teal" | "gray" | "pink") => {
    setActiveCategory({ name: category, color });
    setEditingWord(null);
    setIsModalOpen(true);
  };

  const handleEditWord = (id: string, text: string, category: string, color: "blue" | "purple" | "teal" | "gray" | "pink") => {
    setActiveCategory({ name: category, color });
    setEditingWord({ id, text });
    setIsModalOpen(true);
  };

  const handleAddCustomWord = (text: string) => {
    addCustomWord({ text, category: activeCategory.name, color: activeCategory.color });
  };

  const handleEditCustomWord = (id: string, text: string) => {
    editCustomWord(id, text);
  };

  const peopleCategoryWords = getWordsByCategory('people');
  const needsCategoryWords = getWordsByCategory('needs');
  const actionsCategoryWords = getWordsByCategory('actions');
  const timesCategoryWords = getWordsByCategory('times');

  // Simple placeholder icon component
  const PlaceholderIcon = () => <div className="w-16 h-16 bg-white/20 rounded-lg" />;

  return (
    <div className="space-y-6">
      {/* People Section */}
      <div>
        <h2 className={isDark ? "text-white text-xl font-semibold mb-3" : "text-[#cdcdcd] text-xl font-light mb-3"}>People</h2>
        <div className="grid grid-cols-5 gap-4">
          {!isWordHidden('people-i') && (
            <VocabButton 
              icon={<PlaceholderIcon />} 
              label="I" 
              color="blue" 
              onClick={() => addWord('I')} 
              onHold={() => hideWord('people-i')} 
            />
          )}
          {!isWordHidden('people-you') && (
            <VocabButton 
              icon={<PlaceholderIcon />} 
              label="You" 
              color="blue" 
              onClick={() => addWord('You')} 
              onHold={() => hideWord('people-you')} 
            />
          )}
          {!isWordHidden('people-we') && (
            <VocabButton 
              icon={<PlaceholderIcon />} 
              label="We" 
              color="blue" 
              onClick={() => addWord('We')} 
              onHold={() => hideWord('people-we')} 
            />
          )}
          {!isWordHidden('people-they') && (
            <VocabButton 
              icon={<PlaceholderIcon />} 
              label="They" 
              color="blue" 
              onClick={() => addWord('They')} 
              onHold={() => hideWord('people-they')} 
            />
          )}
          {!isWordHidden('people-she') && (
            <VocabButton 
              icon={<PlaceholderIcon />} 
              label="She" 
              color="blue" 
              onClick={() => addWord('She')} 
              onHold={() => hideWord('people-she')} 
            />
          )}
          {peopleCategoryWords.map((word) => (
            <VocabButton
              key={word.id}
              icon={<PlaceholderIcon />}
              label={word.text}
              color={word.color}
              onClick={() => addWord(word.text)}
              onDelete={() => deleteCustomWord(word.id)}
              isCustom
              onEdit={() => handleEditWord(word.id, word.text, 'people', 'blue')}
            />
          ))}
          <AddMoreButton 
            icon={<Plus className="w-16 h-16" />} 
            label="Add More" 
            color="gray" 
            onClick={() => handleAddMore('people', 'blue')}
          />
        </div>
      </div>

      {/* Needs & Wants Section */}
      <div>
        <h2 className={isDark ? "text-white text-xl font-semibold mb-3" : "text-[#cdcdcd] text-xl font-light mb-3"}>Needs & Wants</h2>
        <div className="grid grid-cols-5 gap-4">
          {!isWordHidden('needs-want') && (
            <VocabButton 
              icon={<PlaceholderIcon />} 
              label="Want" 
              color="purple" 
              onClick={() => addWord('want')} 
              onHold={() => hideWord('needs-want')} 
            />
          )}
          {!isWordHidden('needs-need') && (
            <VocabButton 
              icon={<PlaceholderIcon />} 
              label="Need" 
              color="purple" 
              onClick={() => addWord('need')} 
              onHold={() => hideWord('needs-need')} 
            />
          )}
          {!isWordHidden('needs-like') && (
            <VocabButton 
              icon={<PlaceholderIcon />} 
              label="Like" 
              color="purple" 
              onClick={() => addWord('like')} 
              onHold={() => hideWord('needs-like')} 
            />
          )}
          {!isWordHidden('needs-have') && (
            <VocabButton 
              icon={<PlaceholderIcon />} 
              label="Have" 
              color="purple" 
              onClick={() => addWord('have')} 
              onHold={() => hideWord('needs-have')} 
            />
          )}
          {!isWordHidden('needs-see') && (
            <VocabButton 
              icon={<PlaceholderIcon />} 
              label="See" 
              color="purple" 
              onClick={() => addWord('see')} 
              onHold={() => hideWord('needs-see')} 
            />
          )}
          {needsCategoryWords.map((word) => (
            <VocabButton
              key={word.id}
              icon={<PlaceholderIcon />}
              label={word.text}
              color={word.color}
              onClick={() => addWord(word.text)}
              onDelete={() => deleteCustomWord(word.id)}
              isCustom
              onEdit={() => handleEditWord(word.id, word.text, 'needs', 'purple')}
            />
          ))}
          <AddMoreButton 
            icon={<Plus className="w-16 h-16" />} 
            label="Add More" 
            color="gray" 
            onClick={() => handleAddMore('needs', 'purple')}
          />
        </div>
      </div>

      {/* Actions Section */}
      <div>
        <h2 className={isDark ? "text-white text-xl font-semibold mb-3" : "text-[#cdcdcd] text-xl font-light mb-3"}>Actions</h2>
        <div className="grid grid-cols-5 gap-4">
          {!isWordHidden('actions-water') && (
            <VocabButton 
              icon={<PlaceholderIcon />} 
              label="Water" 
              color="teal" 
              onClick={() => addWord('water')} 
              onHold={() => hideWord('actions-water')} 
            />
          )}
          {!isWordHidden('actions-food') && (
            <VocabButton 
              icon={<PlaceholderIcon />} 
              label="Food" 
              color="teal" 
              onClick={() => addWord('food')} 
              onHold={() => hideWord('actions-food')} 
            />
          )}
          {!isWordHidden('actions-help') && (
            <VocabButton 
              icon={<PlaceholderIcon />} 
              label="Help" 
              color="teal" 
              onClick={() => addWord('help')} 
              onHold={() => hideWord('actions-help')} 
            />
          )}
          {actionsCategoryWords.map((word) => (
            <VocabButton
              key={word.id}
              icon={<PlaceholderIcon />}
              label={word.text}
              color={word.color}
              onClick={() => addWord(word.text)}
              onDelete={() => deleteCustomWord(word.id)}
              isCustom
              onEdit={() => handleEditWord(word.id, word.text, 'actions', 'teal')}
            />
          ))}
          <AddMoreButton 
            icon={<Plus className="w-16 h-16" />} 
            label="Add More" 
            color="gray" 
            onClick={() => handleAddMore('actions', 'teal')}
          />
        </div>
      </div>

      {/* Times & Responses Section */}
      <div>
        <h2 className={isDark ? "text-white text-xl font-semibold mb-3" : "text-[#cdcdcd] text-xl font-light mb-3"}>Times & Responses</h2>
        <div className="grid grid-cols-5 gap-4">
          {!isWordHidden('times-now') && (
            <VocabButton 
              icon={<PlaceholderIcon />} 
              label="Now" 
              color="gray" 
              onClick={() => addWord('now')} 
              onHold={() => hideWord('times-now')} 
            />
          )}
          {!isWordHidden('times-later') && (
            <VocabButton 
              icon={<PlaceholderIcon />} 
              label="Later" 
              color="gray" 
              onClick={() => addWord('later')} 
              onHold={() => hideWord('times-later')} 
            />
          )}
          {!isWordHidden('times-yes') && (
            <VocabButton 
              icon={<PlaceholderIcon />} 
              label="Yes" 
              color="gray" 
              onClick={() => addWord('yes')} 
              onHold={() => hideWord('times-yes')} 
            />
          )}
          {timesCategoryWords.map((word) => (
            <VocabButton
              key={word.id}
              icon={<PlaceholderIcon />}
              label={word.text}
              color={word.color}
              onClick={() => addWord(word.text)}
              onDelete={() => deleteCustomWord(word.id)}
              isCustom
              onEdit={() => handleEditWord(word.id, word.text, 'times', 'gray')}
            />
          ))}
          <AddMoreButton 
            icon={<Plus className="w-16 h-16" />} 
            label="Add More" 
            color="gray" 
            onClick={() => handleAddMore('times', 'gray')}
          />
        </div>
      </div>

      <CustomWordModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={handleAddCustomWord} 
        onEdit={handleEditCustomWord}
        categoryName={activeCategory.name} 
        editWord={editingWord}
      />
    </div>
  );
}
