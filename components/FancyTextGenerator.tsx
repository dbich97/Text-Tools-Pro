import React, { useState } from 'react';
import { styles } from '../utils/fancyText';
import FancyTextFaq from './FancyTextFaq';

const FancyTextGenerator: React.FC = () => {
  const [text, setText] = useState<string>('Stylish & Cool Text');
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
          placeholder="Type or paste your text here..."
          rows={4}
          className="w-full p-4 text-base text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 resize-y"
          aria-label="Text input for fancy text generation"
        />
      </div>

      <div className="mt-8 space-y-4">
        {styles.map((style, index) => {
          const transformedText = style.transform(text);
          return (
            <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex-grow min-w-0">
                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">{style.name}</p>
                <p className="text-xl text-gray-800 dark:text-gray-200 break-words whitespace-pre-wrap">
                  {transformedText || <span className="text-gray-400 dark:text-gray-500">Preview</span>}
                </p>
              </div>
              <button
                onClick={() => handleCopy(transformedText, index)}
                disabled={!text}
                className="flex-shrink-0 px-4 py-2 text-sm font-semibold text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 w-full sm:w-auto"
              >
                {copiedIndex === index ? 'Copied!' : 'Copy'}
              </button>
            </div>
          );
        })}
      </div>
      
      <FancyTextFaq />
    </>
  );
};

export default FancyTextGenerator;
