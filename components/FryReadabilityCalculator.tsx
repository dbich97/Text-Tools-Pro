import React, { useState, useMemo } from 'react';
import StatCard from './StatCard';
import { analyzeFryReadability } from '../utils/fryReadability';
import FryReadabilityCalculatorFaq from './FryReadabilityCalculatorFaq';
import FryGraph from './FryGraph';

const FryReadabilityCalculator: React.FC = () => {
  const [text, setText] = useState<string>("The Fry readability formula is a widely used and reliable method for assessing the grade level of a text. Unlike other formulas that use complex calculations, the Fry method is graphical. It works by plotting two key factors: the number of sentences and the number of syllables in a one-hundred-word passage. The intersection of these two points on the Fry Readability Graph indicates the U.S. grade level. This tool automates that process by calculating the averages and using a data table to approximate the graph's results. It's often favored in educational settings for its simplicity and accuracy in determining reading difficulty.");
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

  const stats = useMemo(() => analyzeFryReadability(text), [text]);

  const syllables = stats.avgSyllablesPer100 !== 'N/A' ? parseFloat(stats.avgSyllablesPer100) : null;
  const sentences = stats.avgSentencesPer100 !== 'N/A' ? parseFloat(stats.avgSentencesPer100) : null;


  return (
    <>
      <div className="relative">
        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder="Start writing or paste your text here to calculate its Fry Readability score..."
          rows={12}
          className="w-full p-4 text-base text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 resize-y"
          aria-label="Text input area for Fry Readability score check"
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
            <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold mb-1">Fry Readability Grade Level</p>
            <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
                {stats.gradeLevel}
            </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-8">
        <StatCard label="Sentences per 100 Words" value={stats.avgSentencesPer100} />
        <StatCard label="Syllables per 100 Words" value={stats.avgSyllablesPer100} />
      </div>

      <div className="mt-8 bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">Fry Readability Graph</h2>
        <FryGraph syllables={syllables} sentences={sentences} />
      </div>

      <FryReadabilityCalculatorFaq />
    </>
  );
};

export default FryReadabilityCalculator;