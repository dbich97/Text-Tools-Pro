import React, { useState, useMemo } from 'react';
import StatCard from './StatCard';
import { analyzeReadability } from '../utils/readability';
import FleschKincaidCalculatorFaq from './FleschKincaidCalculatorFaq';

const FleschKincaidCalculator: React.FC = () => {
  const [text, setText] = useState<string>("Text Tools Pro introduces a new Readability Checker. This powerful feature analyzes your writing to determine its clarity and simplicity. By calculating the Flesch-Kincaid Reading Ease score, it helps you understand if your text is accessible to your intended audience. This is particularly useful for writers, educators, and marketers who aim for clear communication. The system evaluates factors like sentence length and syllable complexity. Improving your score can lead to better engagement and comprehension.");
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

  const stats = useMemo(() => analyzeReadability(text), [text]);

  const gradeNumberMatch = stats.gradeLevel.match(/\d+/);
  const gradeNumberDisplay = gradeNumberMatch ? gradeNumberMatch[0] : '–';

  return (
    <>
      <div className="relative">
        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder="Start writing or paste your text here to check its Flesch-Kincaid scores..."
          rows={12}
          className="w-full p-4 text-base text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 resize-y"
          aria-label="Text input area for Flesch-Kincaid score check"
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

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 text-center flex flex-col justify-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold mb-1">Reading Ease Score</p>
            <p className={`text-6xl font-bold ${stats.interpretation.color}`}>
                {stats.score.toFixed(1)}
            </p>
            <p className={`text-xl font-bold mt-1 ${stats.interpretation.color}`}>
                {stats.interpretation.text}
            </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 text-center flex flex-col justify-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold mb-1">Grade Level</p>
            <p className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
                {gradeNumberDisplay}
            </p>
            <p className="text-xl font-bold text-gray-700 dark:text-gray-300 mt-1">
                {stats.gradeLevel}
            </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-8">
        <StatCard label="Words" value={stats.words} />
        <StatCard label="Sentences" value={stats.sentences} />
        <StatCard label="Avg. Words / Sentence" value={stats.avgWordsPerSentence} />
        <StatCard label="Avg. Syllables / Word" value={stats.avgSyllablesPerWord} />
      </div>

      <FleschKincaidCalculatorFaq />
    </>
  );
};

export default FleschKincaidCalculator;