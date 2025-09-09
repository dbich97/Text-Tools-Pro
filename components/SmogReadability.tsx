import React, { useState, useMemo } from 'react';
import StatCard from './StatCard';
import { analyzeSmog } from '../utils/smogReadability';
import SmogReadabilityFaq from './SmogReadabilityFaq';

const SmogReadability: React.FC = () => {
  const [text, setText] = useState<string>("The SMOG grading is a measure of readability that estimates the years of education needed to understand a piece of writing. SMOG is an acronym for Simple Measure of Gobbledygook. It is a very simple and accurate formula. It is calculated by taking the number of polysyllabic words in a sample of thirty sentences and finding the square root. This makes it a very robust test. The result is then added to a constant of three. This gives the final grade level. It is widely used in healthcare to assess health information. Many studies have shown its high correlation with other, more complex readability formulas. This makes it a trusted standard for clear communication. You should always aim for a lower score for better comprehension by a wider audience. This is extremely important for public documents and forms. The simplicity of the calculation is a major advantage for manual assessments.");
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

  const stats = useMemo(() => analyzeSmog(text), [text]);

  return (
    <>
      <div className="relative">
        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder="Start writing or paste your text here to calculate its SMOG grade..."
          rows={12}
          className="w-full p-4 text-base text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 resize-y"
          aria-label="Text input area for SMOG Readability check"
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
           Note: This tool requires at least 30 sentences for an accurate calculation.
        </p>
      </div>

      <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 text-center flex flex-col justify-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold mb-1">SMOG Readability Grade</p>
            <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
                {stats.grade.toFixed(2)}
            </p>
            <p className="text-xl font-bold text-gray-700 dark:text-gray-300 mt-2">
                {stats.gradeLevel}
            </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-8">
        <StatCard label="Total Sentences" value={stats.sentences} />
        <StatCard label="Polysyllabic Words (3+ Syllables)" value={stats.polysyllables} />
      </div>

      <SmogReadabilityFaq />
    </>
  );
};

export default SmogReadability;