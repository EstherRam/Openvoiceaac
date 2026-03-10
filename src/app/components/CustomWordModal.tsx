import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface CustomWordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (text: string) => void;
  onEdit?: (id: string, text: string) => void;
  categoryName: string;
  editWord?: { id: string; text: string } | null;
}

export default function CustomWordModal({
  isOpen,
  onClose,
  onAdd,
  onEdit,
  categoryName,
  editWord
}: CustomWordModalProps) {
  const [text, setText] = useState('');

  useEffect(() => {
    if (editWord) {
      setText(editWord.text);
    } else {
      setText('');
    }
  }, [editWord, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      if (editWord && onEdit) {
        onEdit(editWord.id, text.trim());
      } else {
        onAdd(text.trim());
      }
      setText('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div 
        className="bg-white rounded-xl p-6 w-full max-w-md mx-4 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            {editWord ? 'Edit Word' : `Add Word to ${categoryName}`}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter word or phrase"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg mb-4"
            autoFocus
          />

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!text.trim()}
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
            >
              {editWord ? 'Save' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
