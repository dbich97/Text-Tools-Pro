import React, { useState, useEffect } from 'react';
import { textToUbbiDubbi, ubbiDubbiToText } from '../utils/ubbiDubbi';
import UbbiDubbiTranslatorFaq from './UbbiDubbiTranslatorFaq';

const UbbiDubbiTranslator: React.FC = () => {
  const [text, setText] = useState<string>('Hello, this is a fun secret language!');
  const [ubbiDubbi, setUbbiDubbi] = useState<string>('');
  const [lastChanged, setLastChanged] = useState<'text' | 'ubbi'>('text');
  
  const [textCopied, setTextCopied] = useState<boolean>(false);
  const [ubbiCopied, setUbbiCopied] = useState<boolean>(false);

  useEffect(() => {
    if (lastChanged === 'text') {
      setUbbiDubbi(textToUbbiDubbi(text));
    }
  }, [text, lastChanged]);

  useEffect(() => {
    if (lastChanged === 'ubbi') {
      setText(ubbiDubbiToText(ubbiDubbi));
    }
  }, [ubbiDubbi, lastChanged]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    setLastChanged('text');
  };

  const handleUbbiDubbiChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUbbiDubbi(e.target.value);
    setLastChanged('ubbi');
  };

  const handleCopy = (content: string, type: 'text' | 'ubbi') => {
    if (content) {
      navigator.clipboard.writeText(content);
      if (type === 'text') {
        setTextCopied(true);
        setTimeout(() => setTextCopied(false), 2000);
      } else {
        setUbbiCopied(true);
        setTimeout(() => setUbbiCopied(false), 2000);
      }
    }
  };
  
  const handleSwap = () => {
      const currentText = text;
      setText(ubbiDubbi);
      setUbbiDubbi(currentText);
      // Let the useEffects handle the re-translation
      if (lastChanged === 'text') {
          setLastChanged('ubbi');
      } else {
          setLastChanged('text');
      }
  };

  return (
    <>
      <div className="space-y-6">
        {/* Text Section */}
        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Your Text</h2>
            <button
              onClick={() => handleCopy(text, 'text')}
              disabled={!text}
              className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {textCopied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <textarea
            value={text}
            onChange={handleTextChange}
            rows={6}
            className="w-full p-3 text-base text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 resize-y"
            aria-label="Text input"
            placeholder="Enter your text here"
          />
        </div>

        <div className="flex justify-center">
            <button 
                onClick={handleSwap} 
                className="p-2 text-gray-500 bg-gray-100 rounded-full hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-transform duration-200 hover:rotate-180"
                aria-label="Swap text and Ubbi Dubbi"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 12l-4-4m4 4l4-4m6 0v12m0-12l4 4m-4-4l-4 4" />
                </svg>
            </button>
        </div>

        {/* Ubbi Dubbi Section */}
        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Ubbi Dubbi</h2>
            <button
              onClick={() => handleCopy(ubbiDubbi, 'ubbi')}
              disabled={!ubbiDubbi}
              className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {ubbiCopied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <textarea
            value={ubbiDubbi}
            onChange={handleUbbiDubbiChange}
            rows={6}
            className="w-full p-3 text-base text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 resize-y"
            aria-label="Ubbi Dubbi output and input"
            placeholder="Ubbi Dubbi will appear here..."
          />
        </div>
      </div>
      
      <UbbiDubbiTranslatorFaq />
    </>
  );
};

export default UbbiDubbiTranslator;