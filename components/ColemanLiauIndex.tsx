import React, { useState, useMemo } from 'react';
import StatCard from './StatCard';
import { analyzeColemanLiau } from '../utils/colemanLiau';
import ColemanLiauIndexFaq from './ColemanLiauIndexFaq';

const ColemanLiauIndex: React.FC = () => {
  const [text, setText] = useState<string>("The Coleman-Liau index is a readability test designed to gauge the understandability of a text. Unlike other indices, it relies on characters rather than syllables per word. This makes it much easier to calculate automatically. The formula outputs a number that corresponds to a U.S. school grade level. For example, a score of 8.0 indicates that an eighth-grader should be able to comprehend the document.");
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

  const stats = useMemo(() => analyzeColemanLiau(text), [text]);

  return (
    <>
      <div className="relative">
        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder="Start writing or paste your text here to check its Coleman-Liau Index..."
          rows={12}
          className="w-full p-4 text-base text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 resize-y"
          aria-label="Text input area for Coleman-Liau Index check"
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
      </div>

      <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center text-center gap-2">
            <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold mb-1">Coleman-Liau Index</p>
            <p className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
                {stats.score.toFixed(1)}
            </p>
            <p className="text-xl font-bold text-gray-700 dark:text-gray-300">
                {stats.gradeLevel}
            </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-8">
        <StatCard label="Letters" value={stats.letters} />
        <StatCard label="Words" value={stats.words} />
        <StatCard label="Sentences" value={stats.sentences} />
      </div>

      <ColemanLiauIndexFaq />
    </>
  );
};

export default ColemanLiauIndex;
