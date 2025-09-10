import React, { useState, useMemo } from 'react';
import { diffWordsWithSpace, DiffResult } from '../utils/textCompare';
import CompareTextFaq from './CompareTextFaq';

const CompareText: React.FC = () => {
  const [textA, setTextA] = useState<string>('This is the original text.\nIt has two lines and some common words.');
  const [textB, setTextB] = useState<string>('This is the modified text.\nIt has multiple lines and some important changes.');

  const diffResult = useMemo(() => diffWordsWithSpace(textA, textB), [textA, textB]);
  
  const { additions, deletions } = useMemo(() => {
    let additions = 0;
    let deletions = 0;
    diffResult.forEach(part => {
      if (part.added) additions++;
      if (part.removed) deletions++;
    });
    return { additions, deletions };
  }, [diffResult]);

  const renderDiff = (diff: DiffResult[]) => {
    return diff.map((part, index) => {
      const addedClass = "bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 px-1 rounded-sm";
      const removedClass = "bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200 line-through px-1 rounded-sm";
      const className = part.added ? addedClass : part.removed ? removedClass : "";
      
      return (
        <span key={index} className={className}>
          {part.value}
        </span>
      );
    });
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="original-text" className="block text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Original Text</label>
          <textarea
            id="original-text"
            value={textA}
            onChange={(e) => setTextA(e.target.value)}
            rows={12}
            className="w-full p-3 text-base font-mono text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 resize-y"
            aria-label="Original text input"
            placeholder="Paste the original text here..."
          />
        </div>
        <div>
          <label htmlFor="changed-text" className="block text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Changed Text</label>
          <textarea
            id="changed-text"
            value={textB}
            onChange={(e) => setTextB(e.target.value)}
            rows={12}
            className="w-full p-3 text-base font-mono text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 resize-y"
            aria-label="Changed text input"
            placeholder="Paste the changed text here..."
          />
        </div>
      </div>

      <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-4">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                Differences
            </h2>
            <div className="flex gap-4 text-sm font-semibold">
                <span className="flex items-center gap-2 text-green-600 dark:text-green-400">
                  <span className="w-3 h-3 bg-green-200 dark:bg-green-700 rounded-full"></span>
                  {additions} Additions
                </span>
                <span className="flex items-center gap-2 text-red-600 dark:text-red-400">
                   <span className="w-3 h-3 bg-red-200 dark:bg-red-700 rounded-full"></span>
                  {deletions} Deletions
                </span>
            </div>
        </div>
        <div 
          className="p-4 bg-gray-50 dark:bg-gray-900/70 rounded-lg border border-gray-200 dark:border-gray-600 min-h-[10rem] break-words text-gray-800 dark:text-gray-200 whitespace-pre-wrap font-mono text-sm leading-relaxed"
          aria-live="polite"
        >
          {diffResult.length > 0 ? renderDiff(diffResult) : <span className="text-gray-500">No differences found.</span>}
        </div>
      </div>
      
      <CompareTextFaq />
    </>
  );
};

export default CompareText;