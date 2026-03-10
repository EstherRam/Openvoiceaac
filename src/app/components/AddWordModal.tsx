import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface AddWordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (text: string) => void;
  onEdit?: (id: string, text: string) => void;
  categoryName: string;
  editWord?: { id: string; text: string } | null;
}

export default function AddWordModal({ isOpen, onClose, onAdd, onEdit, categoryName, editWord }: AddWordModalProps) {
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

  const handleCancel = () => {
    setText('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-semibold text-gray-800">
            {editWord ? 'Edit Word' : 'Add Custom Word'}
          </h2>
          <button
            onClick={handleCancel}
            className="text-gray-500 hover:text-gray-700 transition-colors p-2"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Word or Phrase
            </label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter a word or phrase..."
              className="w-full px-4 py-3 text-xl border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoFocus
              maxLength={50}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl font-semibold text-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!text.trim()}
              className="flex-1 px-6 py-3 bg-[#2755e2] hover:bg-[#1e45c2] text-white rounded-xl font-semibold text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {editWord ? 'Save' : 'Add Word'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}