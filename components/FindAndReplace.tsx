import React, { useState, useMemo, useCallback } from 'react';
import FindAndReplaceFaq from './FindAndReplaceFaq';

// Helper to escape regex special characters
const escapeRegExp = (string: string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

const FindAndReplace: React.FC = () => {
  const [text, setText] = useState<string>("Hello world! This is a test. One world, one dream.");
  const [findText, setFindText] = useState<string>("world");
  const [replaceText, setReplaceText] = useState<string>("universe");
  const [isCaseSensitive, setIsCaseSensitive] = useState<boolean>(false);
  const [isWholeWord, setIsWholeWord] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const getRegex = useCallback((global = false) => {
    if (!findText) return null;
    const pattern = isWholeWord ? `\\b${escapeRegExp(findText)}\\b` : escapeRegExp(findText);
    const flags = (global ? 'g' : '') + (isCaseSensitive ? '' : 'i');
    return new RegExp(pattern, flags);
  }, [findText, isCaseSensitive, isWholeWord]);

  const matchCount = useMemo(() => {
    if (!findText) return 0;
    const regex = getRegex(true);
    return (text.match(regex) || []).length;
  }, [text, findText, getRegex]);

  const handleReplace = () => {
    const regex = getRegex(false);
    if (regex) {
      setText(text.replace(regex, replaceText));
    }
  };

  const handleReplaceAll = () => {
    const regex = getRegex(true);
    if (regex) {
      setText(text.replace(regex, replaceText));
    }
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
    setFindText('');
    setReplaceText('');
  };

  return (
    <>
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start writing or paste your text here..."
          rows={12}
          className="w-full p-4 text-base text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 resize-y"
          aria-label="Text input area for find and replace"
        />
      </div>

      <div className="flex items-center justify-end mt-3 gap-2">
        <button onClick={handleCopy} className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200" disabled={!text}>
          {copied ? 'Copied!' : 'Copy Text'}
        </button>
        <button onClick={handleClear} className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200" disabled={!text}>
          Clear
        </button>
      </div>

      <div className="mt-6 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <label htmlFor="find-text" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Find</label>
            <input
              type="text"
              id="find-text"
              value={findText}
              onChange={(e) => setFindText(e.target.value)}
              className="w-full p-2 text-base text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Text to find"
            />
          </div>
          <div>
            <label htmlFor="replace-text" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Replace With</label>
            <input
              type="text"
              id="replace-text"
              value={replaceText}
              onChange={(e) => setReplaceText(e.target.value)}
              className="w-full p-2 text-base text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Text to replace with"
            />
          </div>
          <div className="md:col-span-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-2">
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2 cursor-pointer text-sm text-gray-600 dark:text-gray-400">
                <input
                  type="checkbox"
                  checked={isCaseSensitive}
                  onChange={(e) => setIsCaseSensitive(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span>Case Sensitive</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer text-sm text-gray-600 dark:text-gray-400">
                <input
                  type="checkbox"
                  checked={isWholeWord}
                  onChange={(e) => setIsWholeWord(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span>Whole Word</span>
              </label>
            </div>
             <div className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                {matchCount} {matchCount === 1 ? 'match' : 'matches'} found
            </div>
          </div>
        </div>
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleReplace}
            disabled={!findText || matchCount === 0}
            className="w-full sm:w-auto flex-1 px-4 py-2 text-sm font-semibold text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Replace
          </button>
          <button
            onClick={handleReplaceAll}
            disabled={!findText || matchCount === 0}
            className="w-full sm:w-auto flex-1 px-4 py-2 text-sm font-semibold text-white bg-purple-800 rounded-md hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Replace All
          </button>
        </div>
      </div>
      
      <FindAndReplaceFaq />
    </>
  );
};

export default FindAndReplace;