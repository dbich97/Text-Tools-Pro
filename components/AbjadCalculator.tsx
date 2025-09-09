import React, { useState, useMemo } from 'react';
import { calculateAbjad } from '../utils/abjad';
import AbjadCalculatorFaq from './AbjadCalculatorFaq';

const AbjadCalculator: React.FC = () => {
  const [text, setText] = useState<string>('بسم الله الرحمن الرحيم');
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

  const { totalValue, breakdown } = useMemo(() => calculateAbjad(text), [text]);

  return (
    <>
      <div className="relative">
        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder="Enter Arabic text here..."
          rows={8}
          className="w-full p-4 text-base text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 resize-y"
          aria-label="Text input for Abjad calculation"
          dir="auto"
        />
      </div>
      
      <div className="flex items-center justify-end mt-3 gap-2">
          <button onClick={handleCopy} className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50" disabled={!text}>
            {copied ? 'Copied!' : 'Copy Text'}
          </button>
          <button onClick={handleClear} className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50" disabled={!text}>
            Clear
          </button>
      </div>

      <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold mb-1">Total Abjad Value</p>
        <p className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
            {totalValue.toLocaleString()}
        </p>
      </div>

      <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Calculation Breakdown</h2>
        {breakdown.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b dark:border-gray-600">
                  <th className="p-2 text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Character</th>
                  <th className="p-2 text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider text-right">Value</th>
                </tr>
              </thead>
              <tbody>
                {breakdown.map((item, index) => (
                  <tr key={index} className="border-b dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                    <td className="p-2 font-medium text-2xl text-gray-800 dark:text-gray-200">{item.char}</td>
                    <td className="p-2 text-gray-600 dark:text-gray-300 text-right font-mono">{item.value}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 dark:border-gray-600">
                    <td className="p-2 pt-3 font-bold text-gray-800 dark:text-gray-200">Total</td>
                    <td className="p-2 pt-3 text-gray-800 dark:text-gray-200 text-right font-bold font-mono">{totalValue.toLocaleString()}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            Enter Arabic text above to see a breakdown of the calculation.
          </p>
        )}
      </div>
      
      <AbjadCalculatorFaq />
    </>
  );
};

export default AbjadCalculator;