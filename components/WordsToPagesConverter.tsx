import React, { useState, useMemo } from 'react';
import { calculateWordsToPages, WordsToPagesOptions, FontOption, FontSizeOption, SpacingOption } from '../utils/wordsToPages';
import WordsToPagesConverterFaq from './WordsToPagesConverterFaq';

const WordsToPagesConverter: React.FC = () => {
  const [wordCount, setWordCount] = useState<number>(1500);
  const [options, setOptions] = useState<WordsToPagesOptions>({
    font: 'Times New Roman',
    fontSize: '12',
    spacing: 'double',
  });

  const pageCount = useMemo(() => calculateWordsToPages(wordCount, options), [wordCount, options]);

  const handleOptionChange = (option: keyof WordsToPagesOptions, value: string) => {
    setOptions(prev => ({ ...prev, [option]: value }));
  };

  const handleWordCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setWordCount(isNaN(value) ? 0 : value);
  };

  return (
    <>
      <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
          <div>
            <label htmlFor="word-count-input" className="block text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Word Count</label>
            <input
              id="word-count-input"
              type="number"
              value={wordCount}
              onChange={handleWordCountChange}
              className="w-full p-3 text-2xl font-mono text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="e.g., 1500"
              min="0"
            />
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold mb-1">Estimated Page Count</p>
            <p className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
                {pageCount}
            </p>
            <p className="text-lg font-bold text-gray-700 dark:text-gray-300">
                pages
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Formatting Options</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <label htmlFor="font-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Font</label>
            <select id="font-select" value={options.font} onChange={(e) => handleOptionChange('font', e.target.value)} className="w-full p-3 text-base text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500">
              <option value="Arial">Arial</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Calibri">Calibri</option>
              <option value="Verdana">Verdana</option>
            </select>
          </div>
          <div>
            <label htmlFor="font-size-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Font Size</label>
            <select id="font-size-select" value={options.fontSize} onChange={(e) => handleOptionChange('fontSize', e.target.value)} className="w-full p-3 text-base text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500">
              <option value="10">10 pt</option>
              <option value="11">11 pt</option>
              <option value="12">12 pt</option>
            </select>
          </div>
          <div>
            <label htmlFor="spacing-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Line Spacing</label>
            <select id="spacing-select" value={options.spacing} onChange={(e) => handleOptionChange('spacing', e.target.value)} className="w-full p-3 text-base text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500">
              <option value="single">Single</option>
              <option value="oneAndHalf">1.5 Lines</option>
              <option value="double">Double</option>
            </select>
          </div>
        </div>
      </div>

      <WordsToPagesConverterFaq />
    </>
  );
};

export default WordsToPagesConverter;