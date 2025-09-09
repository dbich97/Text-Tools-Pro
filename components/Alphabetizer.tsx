import React, { useState, useMemo } from 'react';
import { alphabetize, AlphabetizerOptions } from '../utils/alphabetizer';
import AlphabetizerFaq from './AlphabetizerFaq';

const Alphabetizer: React.FC = () => {
  const [text, setText] = useState<string>('Zebra\nApple\napple\nBanana\nCat\nBanana');
  const [options, setOptions] = useState<AlphabetizerOptions>({
    order: 'asc',
    caseSensitive: false,
    removeDuplicates: false,
  });
  const [copied, setCopied] = useState<boolean>(false);

  const sortedText = useMemo(() => alphabetize(text, options), [text, options]);

  const handleOptionChange = (option: keyof AlphabetizerOptions, value: any) => {
    setOptions(prev => ({ ...prev, [option]: value }));
  };

  const handleCopy = () => {
    if (sortedText) {
      navigator.clipboard.writeText(sortedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClear = () => {
    setText('');
  };

  return (
    <>
      <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Sorting Options</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Order */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Order</label>
            <div className="flex flex-col gap-2">
              <label className="flex items-center space-x-2 cursor-pointer text-sm text-gray-600 dark:text-gray-400">
                <input type="radio" name="order" value="asc" checked={options.order === 'asc'} onChange={() => handleOptionChange('order', 'asc')} className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"/>
                <span>A-Z (Ascending)</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer text-sm text-gray-600 dark:text-gray-400">
                <input type="radio" name="order" value="desc" checked={options.order === 'desc'} onChange={() => handleOptionChange('order', 'desc')} className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"/>
                <span>Z-A (Descending)</span>
              </label>
            </div>
          </div>
          {/* Case */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Case</label>
            <div className="flex flex-col gap-2">
              <label className="flex items-center space-x-2 cursor-pointer text-sm text-gray-600 dark:text-gray-400">
                <input type="radio" name="case" value="insensitive" checked={!options.caseSensitive} onChange={() => handleOptionChange('caseSensitive', false)} className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"/>
                <span>Ignore Case</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer text-sm text-gray-600 dark:text-gray-400">
                <input type="radio" name="case" value="sensitive" checked={options.caseSensitive} onChange={() => handleOptionChange('caseSensitive', true)} className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"/>
                <span>Respect Case</span>
              </label>
            </div>
          </div>
          {/* Duplicates */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Duplicates</label>
             <label className="flex items-center space-x-2 cursor-pointer text-sm text-gray-600 dark:text-gray-400">
                <input type="checkbox" checked={options.removeDuplicates} onChange={(e) => handleOptionChange('removeDuplicates', e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"/>
                <span>Remove Duplicates</span>
              </label>
          </div>
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="input-text" className="block text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Your List</label>
          <textarea
            id="input-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={10}
            className="w-full p-3 text-base text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 resize-y"
            aria-label="Input list for alphabetizing"
            placeholder="Paste your list here, with one item per line..."
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="output-text" className="text-lg font-semibold text-gray-800 dark:text-gray-200">Sorted List</label>
            <button
                onClick={handleCopy}
                className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                disabled={!sortedText}
            >
                {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <textarea
            id="output-text"
            value={sortedText}
            readOnly
            rows={10}
            className="w-full p-3 text-base text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-900/70 border-2 border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 resize-y"
            aria-label="Sorted list output"
            placeholder="Sorted list will appear here..."
          />
        </div>
      </div>
      <div className="flex justify-end mt-3">
          <button onClick={handleClear} className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50" disabled={!text}>
            Clear
          </button>
      </div>

      <AlphabetizerFaq />
    </>
  );
};

export default Alphabetizer;
