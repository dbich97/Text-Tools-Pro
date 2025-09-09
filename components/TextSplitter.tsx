import React, { useState, useMemo } from 'react';
import { splitText } from '../utils/textSplitter';
import TextSplitterFaq from './TextSplitterFaq';

const TextSplitter: React.FC = () => {
  const [inputText, setInputText] = useState<string>('Split this text');
  const [separator, setSeparator] = useState<string>(' ');
  const [copied, setCopied] = useState<boolean>(false);

  const outputText = useMemo(() => splitText(inputText, separator), [inputText, separator]);

  const handleCopy = () => {
    if (outputText) {
      navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClear = () => {
    setInputText('');
  };

  return (
    <>
      <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
            <label htmlFor="input-text" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Your Text</label>
            <textarea
              id="input-text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter text..."
              rows={4}
              className="w-full p-3 text-base text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 resize-y"
            />
        </div>
        <div>
            <label htmlFor="separator-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Separator</label>
            <input
              id="separator-input"
              type="text"
              value={separator}
              onChange={(e) => setSeparator(e.target.value)}
              className="w-full p-3 text-base text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="e.g., a space, comma, or dash"
            />
        </div>
      </div>

      <div className="mt-6">
        <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Result</h3>
            <div className="flex gap-2">
                <button
                    onClick={handleCopy}
                    className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                    disabled={!outputText}
                >
                    {copied ? 'Copied!' : 'Copy'}
                </button>
                <button 
                    onClick={handleClear} 
                    className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50" 
                    disabled={!inputText}
                >
                    Clear
                </button>
            </div>
        </div>
        <textarea
          value={outputText}
          readOnly
          rows={8}
          className="w-full p-4 text-xl text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-900/70 border-2 border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 resize-y"
          aria-label="Split text result"
          placeholder="Split text will appear here..."
        />
      </div>

      <TextSplitterFaq />
    </>
  );
};

export default TextSplitter;
