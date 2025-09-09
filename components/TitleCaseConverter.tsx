import React, { useState, useMemo } from 'react';
import { toTitleCase } from '../utils/caseConverter';
import TitleCaseConverterFaq from './TitleCaseConverterFaq';

const TitleCaseConverter: React.FC = () => {
  const [text, setText] = useState<string>('the quick brown fox jumps over the lazy dog');
  const [copied, setCopied] = useState<boolean>(false);

  const titleCasedText = useMemo(() => toTitleCase(text), [text]);

  const handleCopy = () => {
    if (titleCasedText.length > 0) {
      navigator.clipboard.writeText(titleCasedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClear = () => {
    setText('');
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="input-text" className="block text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Your Text</label>
          <textarea
            id="input-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={10}
            className="w-full p-3 text-base text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 resize-y"
            aria-label="Input text for title case conversion"
            placeholder="Paste your text here..."
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="output-text" className="text-lg font-semibold text-gray-800 dark:text-gray-200">Title Cased Text</label>
            <button
                onClick={handleCopy}
                className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                disabled={!titleCasedText}
            >
                {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <textarea
            id="output-text"
            value={titleCasedText}
            readOnly
            rows={10}
            className="w-full p-3 text-base text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-900/70 border-2 border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 resize-y"
            aria-label="Output text in title case"
            placeholder="Result will appear here..."
          />
        </div>
      </div>
      <div className="flex justify-end mt-3">
          <button onClick={handleClear} className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all" disabled={!text}>
            Clear
          </button>
      </div>

      <TitleCaseConverterFaq />
    </>
  );
};

export default TitleCaseConverter;