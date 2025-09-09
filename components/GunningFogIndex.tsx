import React, { useState, useMemo } from 'react';
import StatCard from './StatCard';
import { analyzeGunningFog } from '../utils/gunningFog';
import GunningFogIndexFaq from './GunningFogIndexFaq';

const GunningFogIndex: React.FC = () => {
  const [text, setText] = useState<string>("The Gunning fog index measures the readability of English writing. The index estimates the years of formal education a person needs to understand the text on the first reading. For instance, a fog index of 12 requires the reading level of a U.S. high school senior (around 18 years old). The test was developed by Robert Gunning, an American businessman, in 1952. The fog index is a simple formula that is commonly used. It calculates a grade level based on the average sentence length and the number of complex words. Text with a lower index is considered more readable than text with a higher one. This makes it a valuable tool.");
  const [copied, setCopied] = useState<boolean>(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };
  
  const handleCopy = () => {
    if (text.length > 0) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClear = () => {
    setText('');
  };

  const stats = useMemo(() => analyzeGunningFog(text), [text]);

  return (
    <>
      <div className="relative">
        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder="Start writing or paste your text here to calculate its Gunning Fog Index..."
          rows={12}
          className="w-full p-4 text-base text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 resize-y"
          aria-label="Text input area for Gunning Fog Index check"
        />
      </div>
      
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-2">
          <button onClick={handleCopy} className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200" disabled={!text}>
            {copied ? 'Copied!' : 'Copy Text'}
          </button>
          <button onClick={handleClear} className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200" disabled={!text}>
            Clear
          </button>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">
           Note: This tool requires at least 100 words for an accurate calculation.
        </p>
      </div>

      <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 text-center flex flex-col justify-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold mb-1">Gunning Fog Index</p>
            <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
                {stats.score.toFixed(2)}
            </p>
            <p className="text-xl font-bold text-gray-700 dark:text-gray-300 mt-2">
                {stats.gradeLevel}
            </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-8">
        <StatCard label="Total Words" value={stats.words} />
        <StatCard label="Total Sentences" value={stats.sentences} />
        <StatCard label="Complex Words (3+ Syllables)" value={stats.complexWords} />
      </div>

      <GunningFogIndexFaq />
    </>
  );
};

export default GunningFogIndex;
