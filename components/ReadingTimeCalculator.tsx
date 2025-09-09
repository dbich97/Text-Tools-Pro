import React, { useState, useMemo } from 'react';
import { calculateReadingTime } from '../utils/readingTime';
import ReadingTimeCalculatorFaq from './ReadingTimeCalculatorFaq';

const ReadingTimeCalculator: React.FC = () => {
  const [text, setText] = useState<string>("Reading time is a valuable metric for content creators. Bloggers and marketers often use it to gauge audience engagement. By understanding how long an article will take to read, they can better structure their content. This calculator uses an adjustable Words Per Minute (WPM) setting. An average adult reads at about 225 WPM, but this can vary. Slower readers might be closer to 150 WPM, while speed readers can exceed 500 WPM. Adjust the slider below to see how the time changes for different reading speeds. Clear and concise writing often leads to better engagement, regardless of the reading time.");
  const [wpm, setWpm] = useState<number>(225);
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

  const { wordCount, readingTime } = useMemo(() => calculateReadingTime(text, wpm), [text, wpm]);

  const getWpmLabel = (currentWpm: number): string => {
    if (currentWpm < 180) return 'Slow Reader';
    if (currentWpm < 250) return 'Average Reader';
    if (currentWpm < 350) return 'Fast Reader';
    return 'Speed Reader';
  };

  return (
    <>
      <div className="relative">
        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder="Start writing or paste your text here..."
          rows={12}
          className="w-full p-4 text-base text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 resize-y"
          aria-label="Text input for reading time calculation"
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
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {wordCount.toLocaleString()} words
        </div>
      </div>

      <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold mb-2">Estimated Reading Time</p>
        <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500 mb-6">
          {readingTime}
        </p>

        <div className="max-w-md mx-auto">
            <div className="flex justify-between items-center mb-2">
                <label htmlFor="wpm-slider" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Reading Speed: <span className="font-bold">{getWpmLabel(wpm)}</span>
                </label>
                <span className="text-lg font-semibold text-purple-600 dark:text-purple-400">{wpm} WPM</span>
            </div>
            <input
                id="wpm-slider"
                type="range"
                min="100"
                max="500"
                step="5"
                value={wpm}
                onChange={(e) => setWpm(parseInt(e.target.value, 10))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                style={{
                    accentColor: 'rgb(168 85 247)', // purple-500
                }}
            />
        </div>
      </div>
      
      <ReadingTimeCalculatorFaq />
    </>
  );
};

export default ReadingTimeCalculator;