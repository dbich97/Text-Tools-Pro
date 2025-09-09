import React, { useState } from 'react';
import * as whitespaceRemover from '../utils/whitespaceRemover';
import WhitespaceRemoverFaq from './WhitespaceRemoverFaq';

const actionButtons = [
  { label: 'Trim Extra Spaces', transform: whitespaceRemover.removeExtraSpaces },
  { label: 'Remove All Spaces', transform: whitespaceRemover.removeAllSpaces },
  { label: 'Remove Line Breaks', transform: whitespaceRemover.removeLineBreaks },
  { label: 'Trim Lines', transform: whitespaceRemover.trimLines },
];

const WhitespaceRemover: React.FC = () => {
  const [text, setText] = useState<string>("  This is an example    sentence.\n\nIt has extra spaces and multiple\n\n\nline breaks.   \n    Each line also has leading and trailing spaces.    ");
  const [copied, setCopied] = useState<boolean>(false);
  const [charsBefore, setCharsBefore] = useState<number>(0);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    setCharsBefore(e.target.value.length);
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
    setCharsBefore(0);
  };

  const handleTransform = (transformFunc: (text: string) => string) => {
    setCharsBefore(text.length);
    setText(transformFunc(text));
  };
  
  const charsAfter = text.length;
  const charsRemoved = charsBefore > 0 ? charsBefore - charsAfter : 0;

  return (
    <>
      <div className="relative">
        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder="Start writing or paste your text here..."
          rows={12}
          className="w-full p-4 text-base text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 resize-y"
          aria-label="Text input area for whitespace removal"
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
        <div className="text-sm text-gray-500 dark:text-gray-400 font-mono">
            {charsBefore > 0 && (
                <span className="text-red-500 line-through mr-2">{charsBefore}</span>
            )}
            <span className="text-green-500 font-semibold">{charsAfter}</span>
            {charsRemoved > 0 && (
                 <span className="text-gray-400 ml-2">(-{charsRemoved})</span>
            )}
        </div>
      </div>

      <div className="mt-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {actionButtons.map((btn) => (
                <button 
                    key={btn.label}
                    onClick={() => handleTransform(btn.transform)}
                    className="px-4 py-3 text-sm font-semibold text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-center"
                    disabled={!text}
                    aria-label={`Apply action: ${btn.label}`}
                >
                    {btn.label}
                </button>
            ))}
        </div>
      </div>
      
      <WhitespaceRemoverFaq />
    </>
  );
};

export default WhitespaceRemover;