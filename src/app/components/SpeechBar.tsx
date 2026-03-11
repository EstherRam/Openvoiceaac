import { Volume2, Trash2 } from "lucide-react";
import { useSpeech } from "../contexts/SpeechContext";

export default function SpeechBar() {
  const { words, removeWord, clearAll, speak } = useSpeech();

  return (
    <div className="sticky top-[168px] z-30 bg-[#8694af] py-4">
      <div className="max-w-7xl mx-auto px-[21px]">
        {/* Speech bar */}
        <div className="bg-[#f4ffbc] border border-[#cdcdcd] rounded-[14px] px-[19px] py-[12px] min-h-[60px] flex items-center gap-4">

          {/* Word display */}
          <div className="flex-1 flex items-center gap-2 flex-wrap">
            {words.length === 0 ? (
              <span className="text-[20px] font-semibold text-[#897a7a]">
                I want to...
              </span>
            ) : (
              words.map((word, index) => (
                <button
                  key={index}
                  onClick={() => removeWord(index)}
                  className="bg-white border border-[#cdcdcd] px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-100 transition-colors"
                >
                  <span className="text-[20px] text-gray-900">{word}</span>
                </button>
              ))
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={speak}
              disabled={words.length === 0}
              className="text-gray-700 hover:text-gray-900 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
              aria-label="Speak sentence"
            >
              <Volume2 className="w-7 h-7" />
            </button>

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
