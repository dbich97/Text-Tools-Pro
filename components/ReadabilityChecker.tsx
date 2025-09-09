import React, { useState, useMemo } from 'react';
import StatCard from './StatCard';
import { analyzeReadability } from '../utils/readability';
import ReadabilityCheckerFaq from './ReadabilityCheckerFaq';

const scoreGuide = [
  { score: '90-100', level: 'Very Easy', notes: 'Easily understood by an average 11-year-old student.' },
  { score: '80-90', level: 'Easy', notes: 'Conversational English.' },
  { score: '70-80', level: 'Fairly Easy', notes: 'Plain English. Easily understood by 13- to 15-year-old students.' },
  { score: '60-70', level: 'Standard', notes: 'Easily understood by 8th and 9th graders.' },
  { score: '50-60', level: 'Fairly Difficult', notes: 'Best understood by high school graduates.' },
  { score: '30-50', level: 'Difficult', notes: 'Best understood by college graduates.' },
  { score: '0-30', level: 'Very Difficult', notes: 'Best understood by university graduates.' },
];

const ReadabilityChecker: React.FC = () => {
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

  return (
    <>
      <div className="relative">
        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder="Start writing or paste your text here to check its readability..."
          rows={12}
          className="w-full p-4 text-base text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 resize-y"
          aria-label="Text input area for readability check"
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

      <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 flex flex-col md:flex-row items-center justify-center text-center md:text-left md:justify-around gap-6">
        <div className="flex flex-col items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold mb-1">Reading Ease Score</p>
            <p className={`text-6xl font-bold ${stats.interpretation.color}`}>
                {stats.score.toFixed(1)}
            </p>
        </div>
        <div className="w-px h-20 bg-gray-200 dark:bg-gray-700 hidden md:block"></div>
        <div className="flex flex-col items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold mb-1">Interpretation</p>
            <p className={`text-2xl font-bold ${stats.interpretation.color}`}>
                {stats.interpretation.text}
            </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-8">
        <StatCard label="Grade Level" value={stats.gradeLevel} />
        <StatCard label="Words" value={stats.words} />
        <StatCard label="Avg. Words / Sentence" value={stats.avgWordsPerSentence} />
        <StatCard label="Avg. Syllables / Word" value={stats.avgSyllablesPerWord} />
      </div>

      <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Readability Score Guide</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b dark:border-gray-600">
                <th className="p-2 text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Score</th>
                <th className="p-2 text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Level</th>
                <th className="p-2 text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Notes</th>
              </tr>
            </thead>
            <tbody>
              {scoreGuide.map((item) => (
                <tr key={item.score} className="border-b dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                  <td className="p-2 font-mono text-gray-800 dark:text-gray-200">{item.score}</td>
                  <td className="p-2 font-medium text-gray-700 dark:text-gray-300">{item.level}</td>
                  <td className="p-2 text-gray-600 dark:text-gray-400 text-sm">{item.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ReadabilityCheckerFaq />
    </>
  );
};

export default ReadabilityChecker;
