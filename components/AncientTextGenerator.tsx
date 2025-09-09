import React, { useState } from 'react';
import { styles } from '../utils/ancientText';
import AncientTextGeneratorFaq from './AncientTextGeneratorFaq';

const AncientTextGenerator: React.FC = () => {
  const [text, setText] = useState<string>('Ancient secrets');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleCopy = (transformedText: string, index: number) => {
    if (transformedText.length > 0) {
      navigator.clipboard.writeText(transformedText);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  return (
    <>
      <div className="relative">
        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder="Type your text to see it in ancient styles..."
          rows={4}
          className="w-full p-4 text-base text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 resize-y"
          aria-label="Text input for ancient text generation"
        />
      </div>

      <div className="mt-8 space-y-4">
        {styles.map((style, index) => {
          const transformedText = style.transform(text);
          return (
            <div key={index} className="bg-amber-50 dark:bg-gray-800 p-4 rounded-xl shadow-md border border-amber-200 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex-grow min-w-0">
                <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-200" style={{ fontFamily: 'Georgia, serif' }}>{style.name}</h3>
                <p className="text-sm text-amber-600 dark:text-amber-400 mb-2">{style.description}</p>
                <p className="text-2xl text-gray-800 dark:text-gray-200 break-words whitespace-pre-wrap p-2 bg-white/50 dark:bg-black/20 rounded-md">
                  {transformedText || <span className="text-gray-400 dark:text-gray-500">Preview</span>}
                </p>
              </div>
              <button
                onClick={() => handleCopy(transformedText, index)}
                disabled={!text}
                className="flex-shrink-0 px-4 py-2 text-sm font-semibold text-white bg-amber-600 rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 w-full sm:w-auto"
              >
                {copiedIndex === index ? 'Copied!' : 'Copy'}
              </button>
            </div>
          );
        })}
      </div>
      
      <AncientTextGeneratorFaq />
    </>
  );
};

export default AncientTextGenerator;
