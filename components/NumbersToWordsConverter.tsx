import React, { useState, useMemo } from 'react';
import { convertNumberToWords } from '../utils/numberToWords';
import NumbersToWordsConverterFaq from './NumbersToWordsConverterFaq';

const NumbersToWordsConverter: React.FC = () => {
  const [numberInput, setNumberInput] = useState<string>('12345.67');
  const [copied, setCopied] = useState<boolean>(false);

  const wordsOutput = useMemo(() => convertNumberToWords(numberInput), [numberInput]);

  const handleCopy = () => {
    if (wordsOutput && !wordsOutput.startsWith('Please enter')) {
      navigator.clipboard.writeText(wordsOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClear = () => {
    setNumberInput('');
  };

  return (
    <>
      <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
        <label htmlFor="number-input" className="block text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Enter Number</label>
        <input
          id="number-input"
          type="text"
          value={numberInput}
          onChange={(e) => setNumberInput(e.target.value)}
          className="w-full p-3 text-2xl font-mono text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
          placeholder="e.g., 123.45"
        />
      </div>

      <div className="mt-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">In Words</h3>
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              disabled={!wordsOutput || wordsOutput.startsWith('Please enter')}
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <button 
                onClick={handleClear} 
                className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50" 
                disabled={!numberInput}
            >
              Clear
            </button>
          </div>
        </div>
        <textarea
          value={wordsOutput}
          readOnly
          rows={5}
          className="w-full p-4 text-xl capitalize text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-900/70 border-2 border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 resize-y"
          aria-label="Number converted to words"
          placeholder="Result will appear here..."
        />
      </div>

      <NumbersToWordsConverterFaq />
    </>
  );
};

export default NumbersToWordsConverter;