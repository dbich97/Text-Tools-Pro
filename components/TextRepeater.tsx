import React, { useState, useMemo } from 'react';
import TextRepeaterFaq from './TextRepeaterFaq';

const TextRepeater: React.FC = () => {
  const [inputText, setInputText] = useState<string>("Hello! ");
  const [repeatCount, setRepeatCount] = useState<number>(10);
  const [separator, setSeparator] = useState<string>('newline');
  const [copied, setCopied] = useState<boolean>(false);
  
  const MAX_REPEAT_COUNT = 1000;
  const MAX_OUTPUT_LENGTH = 100000;

  const handleRepeatCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value, 10);
    if (isNaN(value)) {
      value = 1;
    }
    setRepeatCount(Math.max(1, Math.min(value, MAX_REPEAT_COUNT)));
  };
  
  const outputText = useMemo(() => {
    const sep = separator === 'newline' ? '\n' : separator === 'space' ? ' ' : '';
    let result = '';
    // Use Array.join for performance with large repetitions
    try {
      result = new Array(repeatCount).fill(inputText).join(sep);
    } catch (e) {
      // Catch potential range errors if the array gets too large
      return "Error: The requested number of repetitions is too large.";
    }

    if (result.length > MAX_OUTPUT_LENGTH) {
      return result.substring(0, MAX_OUTPUT_LENGTH) + '\n\n... (output truncated to prevent browser freezing)';
    }
    return result;
  }, [inputText, repeatCount, separator]);

  const handleCopy = () => {
    if (outputText) {
      navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  const handleClear = () => {
    setInputText('');
    setRepeatCount(10);
  };

  return (
    <>
      <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <label htmlFor="input-text" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Text to Repeat</label>
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
            <label htmlFor="repeat-count" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Repetitions</label>
            <input
              type="number"
              id="repeat-count"
              value={repeatCount}
              onChange={handleRepeatCountChange}
              min="1"
              max={MAX_REPEAT_COUNT}
              className="w-full p-3 text-base text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
             <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Max: {MAX_REPEAT_COUNT}</p>
          </div>
        </div>
        <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Separator</label>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
                <label className="flex items-center space-x-2 cursor-pointer text-sm text-gray-600 dark:text-gray-400">
                    <input type="radio" name="separator" value="newline" checked={separator === 'newline'} onChange={(e) => setSeparator(e.target.value)} className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"/>
                    <span>New Line</span>
                </label>
                 <label className="flex items-center space-x-2 cursor-pointer text-sm text-gray-600 dark:text-gray-400">
                    <input type="radio" name="separator" value="space" checked={separator === 'space'} onChange={(e) => setSeparator(e.target.value)} className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"/>
                    <span>Space</span>
                </label>
                 <label className="flex items-center space-x-2 cursor-pointer text-sm text-gray-600 dark:text-gray-400">
                    <input type="radio" name="separator" value="none" checked={separator === 'none'} onChange={(e) => setSeparator(e.target.value)} className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"/>
                    <span>None</span>
                </label>
            </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-center mb-2">
            <label htmlFor="output-text" className="text-lg font-semibold text-gray-800 dark:text-gray-200">Result</label>
            <div className="flex gap-2">
                <button onClick={handleCopy} className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200" disabled={!outputText}>
                    {copied ? 'Copied!' : 'Copy Result'}
                </button>
                 <button onClick={handleClear} className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200" disabled={!inputText && repeatCount === 10}>
                    Clear
                </button>
            </div>
        </div>
        <textarea
          id="output-text"
          value={outputText}
          readOnly
          placeholder="Repeated text will appear here..."
          rows={10}
          className="w-full p-4 text-base text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 resize-y"
          aria-label="Repeated text output"
        />
      </div>
      
      <TextRepeaterFaq />
    </>
  );
};

export default TextRepeater;