import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import VocabularyTile from "../components/VocabularyTile";
import AddWordModal from "../components/AddWordModal";

interface CustomWord {
  id: string;
  text: string;
  color: string;
}

const defaultWords = [
  "happy","sad","angry","scared","tired","excited",
  "worried","calm","proud","silly","frustrated","lonely",
  "loved","brave","confused","bored","grateful","hopeful",
  "nervous","peaceful"
];

export default function IAmFeeling() {
  const [hiddenWords, setHiddenWords] = useState<string[]>([]);
  const [customWords, setCustomWords] = useState<CustomWord[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWord, setEditingWord] = useState<CustomWord | null>(null);

  useEffect(() => {
    const hidden = localStorage.getItem("hiddenFeelingsWords");
    if (hidden) setHiddenWords(JSON.parse(hidden));

    const custom = localStorage.getItem("customFeelingsWords");
    if (custom) setCustomWords(JSON.parse(custom));
  }, []);

  const handleHideWord = (word: string) => {
    const updated = [...hiddenWords, word];
    setHiddenWords(updated);
    localStorage.setItem("hiddenFeelingsWords", JSON.stringify(updated));
  };

  const handleAddWord = (text: string, color: string) => {
    if (editingWord) {
      const updated = customWords.map((w) =>
        w.id === editingWord.id ? { ...w, text, color } : w
      );
      setCustomWords(updated);
      localStorage.setItem("customFeelingsWords", JSON.stringify(updated));
      setEditingWord(null);
    } else {
      const newWord: CustomWord = {
        id: Date.now().toString(),
        text,
        color
      };

      const updated = [...customWords, newWord];
      setCustomWords(updated);
      localStorage.setItem("customFeelingsWords", JSON.stringify(updated));
    }
  };

  const handleEditWord = (word: CustomWord) => {
    setEditingWord(word);
    setIsModalOpen(true);
  };

  const handleDeleteCustomWord = (id: string) => {
    const updated = customWords.filter((w) => w.id !== id);
    setCustomWords(updated);
    localStorage.setItem("customFeelingsWords", JSON.stringify(updated));
  };

  const handleWordClick = (word: string) => {
    const utterance = new SpeechSynthesisUtterance(`I am feeling ${word}`);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const visibleDefaultWords = defaultWords.filter(
    (word) => !hiddenWords.includes(word)
  );

  return (
    <div className="px-[21px] pb-[40px] pt-6">

      {/* GRID */}
      <div className="grid grid-cols-3 md:grid-cols-5 gap-[10px]">

        {visibleDefaultWords.map((word) => (
          <VocabularyTile
            key={word}
            text={word}
            color="#c91d5d"
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

        {/* ADD TILE */}
        <button
          onClick={() => {
            setEditingWord(null);
            setIsModalOpen(true);
          }}
          className="
          w-full
          aspect-[136/164]
          rounded-xl
          border-2
          border-dashed
          border-gray-500
          hover:border-gray-300
          transition
          flex
          flex-col
          items-center
          justify-center
          gap-3
          text-gray-400
          "
        >
          <Plus className="w-10 h-10" />
          <span className="text-[16px] font-medium">Add More</span>
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
        title={editingWord ? "Edit Word" : "Add New Word"}
      />
    </div>
  );
}
