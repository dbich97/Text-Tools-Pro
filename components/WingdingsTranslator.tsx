import React, { useState } from 'react';
import WingdingsTranslatorFaq from './WingdingsTranslatorFaq';

const WingdingsTranslator: React.FC = () => {
  const [text, setText] = useState<string>('Hello World! 123');
  // Both states hold the same string value; the font property handles the visual translation.
  const [wingdings, setWingdings] = useState<string>('Hello World! 123');

  const [textCopied, setTextCopied] = useState<boolean>(false);
  const [wingdingsCopied, setWingdingsCopied] = useState<boolean>(false);

  // Synchronize the states when either textarea is changed.
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    setWingdings(e.target.value);
  };

  const handleWingdingsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setWingdings(e.target.value);
    setText(e.target.value);
  };

  const handleCopy = (content: string, type: 'text' | 'wingdings') => {
    if (content) {
      navigator.clipboard.writeText(content);
      if (type === 'text') {
        setTextCopied(true);
        setTimeout(() => setTextCopied(false), 2000);
      } else {
        setWingdingsCopied(true);
        setTimeout(() => setWingdingsCopied(false), 2000);
      }
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
            {/* A static icon is used as the translation is automatic and bidirectional */}
            <div
                className="p-2 text-gray-500 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300"
                aria-label="Translation is automatic"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 12l-4-4m4 4l4-4m6 0v12m0-12l4 4m-4-4l-4 4" />
                </svg>
            </div>
        </div>

        {/* Wingdings Section */}
        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Wingdings</h2>
            <button
              onClick={() => handleCopy(wingdings, 'wingdings')}
              disabled={!wingdings}
              className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {wingdingsCopied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <textarea
            value={wingdings}
            onChange={handleWingdingsChange}
            rows={6}
            className="w-full p-3 text-2xl text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 resize-y"
            aria-label="Wingdings output and input"
            placeholder="Wingdings translation will appear here..."
            style={{ fontFamily: 'Wingdings, "Wingdings 2", "Wingdings 3", Webdings', fontKerning: 'none' }}
          />
        </div>
      </div>
      
      <WingdingsTranslatorFaq />
    </>
  );
};

export default WingdingsTranslator;