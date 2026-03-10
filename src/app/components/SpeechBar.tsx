import { Volume2, Trash2 } from 'lucide-react';
import { useSpeech } from '../contexts/SpeechContext';

export default function SpeechBar() {
  const { words, removeWord, clearAll, speak } = useSpeech();

  return (
    <div className="sticky top-[168px] z-30 bg-[#8694af] py-4">
      <div className="max-w-7xl mx-auto px-6">
        {/* Single unified speech bar */}
        <div className="bg-[#f5f5dc] rounded-xl px-6 py-4 flex items-center gap-4">
          {/* Word Display Area */}
          <div className="flex-1 min-h-[40px] flex items-center gap-2 flex-wrap">
            {words.length === 0 ? (
              <span className="text-gray-500 text-xl">I want to...</span>
            ) : (
              words.map((word, index) => (
                <button
                  key={index}
                  onClick={() => removeWord(index)}
                  className="bg-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-100 transition-colors"
                >
                  <span className="text-xl text-gray-900">{word}</span>
                </button>
              ))
            )}
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-3">
            {/* Speaker Button */}
            <button
              onClick={speak}
              disabled={words.length === 0}
              className="text-gray-700 hover:text-gray-900 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
              aria-label="Speak sentence"
            >
              <Volume2 className="w-7 h-7" />
            </button>

            {/* Delete/Clear Button */}
            <button
              onClick={clearAll}
              disabled={words.length === 0}
              className="text-gray-700 hover:text-gray-900 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
              aria-label="Clear all"
            >
              <Trash2 className="w-7 h-7" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}