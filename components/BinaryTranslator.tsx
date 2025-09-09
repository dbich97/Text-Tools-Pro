import React, { useState, useMemo } from 'react';
import { convert, Format } from '../utils/binaryConverter';
import BinaryTranslatorFaq from './BinaryTranslatorFaq';

const formats: Format[] = ['Text', 'Binary', 'Decimal', 'Hexadecimal', 'Octal'];

const BinaryTranslator: React.FC = () => {
  const [inputText, setInputText] = useState<string>('Hello World');
  const [inputFormat, setInputFormat] = useState<Format>('Text');
  const [outputFormat, setOutputFormat] = useState<Format>('Binary');
  const [copied, setCopied] = useState<boolean>(false);

  const outputText = useMemo(() => {
    return convert(inputText, inputFormat, outputFormat);
  }, [inputText, inputFormat, outputFormat]);

  const handleCopy = () => {
    if (outputText.length > 0 && !outputText.startsWith('Error:')) {
      navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClear = () => {
    setInputText('');
  };

  const handleSwap = () => {
    const isOutputTextValidForSwap = !outputText.startsWith('Error:');
    if (isOutputTextValidForSwap) {
        setInputText(outputText);
        setInputFormat(outputFormat);
        setOutputFormat(inputFormat);
    }
  };

  const renderDropdown = (value: Format, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, id: string) => (
    <select
      id={id}
      value={value}
      onChange={onChange}
      className="w-full p-2 text-base text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
    >
      {formats.map(format => (
        <option key={format} value={format}>{format}</option>
      ))}
    </select>
  );

  return (
    <>
      <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
        <p className="text-gray-600 dark:text-gray-400 mb-6 text-center">
          Select input and output formats, then enter your data in the input area below.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
            {/* Input Column */}
            <div className="md:col-span-5">
                 <label htmlFor="input-format" className="block text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Input</label>
                 {renderDropdown(inputFormat, (e) => setInputFormat(e.target.value as Format), "input-format")}
            </div>
            
            {/* Swap Column */}
            <div className="md:col-span-1 flex justify-center items-end h-full">
                <button 
                    onClick={handleSwap} 
                    className="p-2 mt-auto text-gray-500 bg-gray-100 rounded-full hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-transform duration-200 hover:rotate-180"
                    aria-label="Swap input and output formats"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                </button>
            </div>
            
            {/* Output Column */}
            <div className="md:col-span-5">
                 <label htmlFor="output-format" className="block text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Output</label>
                 {renderDropdown(outputFormat, (e) => setOutputFormat(e.target.value as Format), "output-format")}
            </div>
        </div>
      </div>
      
      <div className="mt-6">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          rows={8}
          className="w-full p-3 text-base font-mono text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 resize-y"
          aria-label="Input area for conversion"
          placeholder={`Enter ${inputFormat} here...`}
        />
      </div>

      <div className="mt-6">
        <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Result</h3>
            <div className="flex gap-2">
                 <button 
                    onClick={handleCopy} 
                    className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                    disabled={!outputText || outputText.startsWith('Error:')}
                >
                    {copied ? 'Copied!' : 'Copy'}
                 </button>
                 <button onClick={handleClear} className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50" disabled={!inputText}>
                    Clear
                </button>
            </div>
        </div>
        <textarea
          value={outputText}
          readOnly
          rows={8}
          className="w-full p-3 text-base font-mono text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-900/70 border-2 border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 resize-y"
          aria-label="Conversion result"
          placeholder={`Your ${outputFormat} result will appear here...`}
        />
      </div>

      <BinaryTranslatorFaq />
    </>
  );
};

export default BinaryTranslator;
