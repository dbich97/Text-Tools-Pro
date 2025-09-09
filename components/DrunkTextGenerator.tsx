import React, { useState } from 'react';
import { generateDrunkText } from '../utils/drunkText';
import DrunkTextGeneratorFaq from './DrunkTextGeneratorFaq';

const levelLabels: { [key: number]: string } = {
  1: 'Tipsy',
  2: 'Drunk',
  3: 'Very Drunk',
  4: 'Wasted',
  5: 'Completely Wasted',
};

const DrunkTextGenerator: React.FC = () => {
  const [inputText, setInputText] = useState<string>("Hey, are you coming to the party tonight? It's going to be great!");
  const [outputText, setOutputText] = useState<string>('');
  const [level, setLevel] = useState<1 | 2 | 3 | 4 | 5>(3);
  const [copied, setCopied] = useState<boolean>(false);

  const handleGenerate = () => {
    const drunkText = generateDrunkText(inputText, level);
    setOutputText(drunkText);
  };

  const handleCopy = () => {
    if (outputText) {
      navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  const handleClear = () => {
    setInputText('');
    setOutputText('');
  };

  return (
    <>
      <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-2">
            <label htmlFor="level-slider" className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                Drunkenness Level
            </label>
            <span className="text-lg font-bold text-purple-600 dark:text-purple-400">{levelLabels[level]}</span>
        </div>
        <input
            id="level-slider"
            type="range"
            min="1"
            max="5"
            step="1"
            value={level}
            onChange={(e) => setLevel(parseInt(e.target.value, 10) as 1 | 2 | 3 | 4 | 5)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            style={{ accentColor: 'rgb(168 85 247)' }}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="input-text" className="block text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Sober Text</label>
          <textarea
            id="input-text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={8}
            className="w-full p-3 text-base text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 resize-y"
            aria-label="Sober text input"
            placeholder="Enter your clear, coherent text here..."
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="output-text" className="text-lg font-semibold text-gray-800 dark:text-gray-200">Drunk Text</label>
            <button
                onClick={handleCopy}
                className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                disabled={!outputText}
            >
                {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <textarea
            id="output-text"
            value={outputText}
            readOnly
            rows={8}
            className="w-full p-3 text-base text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-900/70 border-2 border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 resize-y"
            aria-label="Drunk text output"
            placeholder="Your glorious, messy text will appear here..."
          />
        </div>
      </div>
      
      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        <button 
            onClick={handleGenerate}
            disabled={!inputText}
            className="flex-1 px-6 py-3 text-lg font-bold text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 transition-all duration-200"
        >
            Generate Drunk Text
        </button>
        <button 
            onClick={handleClear} 
            className="px-6 py-3 font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 transition-all" 
            disabled={!inputText}
        >
            Clear All
        </button>
      </div>

      <DrunkTextGeneratorFaq />
    </>
  );
};

export default DrunkTextGenerator;