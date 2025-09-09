import React, { useState, useMemo } from 'react';
import { convertWordsToNumbers } from '../utils/wordsToNumbers';
import WordsToNumbersConverterFaq from './WordsToNumbersConverterFaq';

const WordsToNumbersConverter: React.FC = () => {
  const [wordsInput, setWordsInput] = useState<string>('one hundred twenty-three point four five');
  const [copied, setCopied] = useState<boolean>(false);

  const numbersOutput = useMemo(() => convertWordsToNumbers(wordsInput), [wordsInput]);

  const handleCopy = () => {
    if (numbersOutput && !numbersOutput.startsWith('Error:')) {
      navigator.clipboard.writeText(numbersOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClear = () => {
    setWordsInput('');
  };

  return (
    <>
      <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
        <label htmlFor="words-input" className="block text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Enter Words</label>
        <textarea
          id="words-input"
          value={wordsInput}
          onChange={(e) => setWordsInput(e.target.value)}
          rows={8}
          className="w-full p-3 text-xl capitalize text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 resize-y"
          placeholder="e.g., one hundred twenty-three..."
        />
      </div>

      <div className="mt-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">In Numbers</h3>
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              disabled={!numbersOutput || numbersOutput.startsWith('Error:')}
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <button 
                onClick={handleClear} 
                className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50" 
                disabled={!wordsInput}
            >
              Clear
            </button>
          </div>
        </div>
        <textarea
          value={numbersOutput}
          readOnly
          rows={5}
          className="w-full p-4 text-2xl font-mono text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-900/70 border-2 border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 resize-y"
          aria-label="Words converted to numbers"
          placeholder="Result will appear here..."
        />
      </div>

      <WordsToNumbersConverterFaq />
    </>
  );
};

export default WordsToNumbersConverter;