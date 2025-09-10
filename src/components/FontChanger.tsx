import React, { useState } from 'react';
import FontChangerFaq from './FontChangerFaq';

const fontGroups = [
  {
    label: 'Sans-serif',
    fonts: [
      'Arial', 'Helvetica', 'Verdana', 'Trebuchet MS', 'Gill Sans', 'Optima', 
      'Calibri', 'Candara', 'Segoe UI', 'Roboto', 'Tahoma'
    ],
  },
  {
    label: 'Serif',
    fonts: [
      'Times New Roman', 'Georgia', 'Garamond', 'Palatino Linotype', 'Bookman', 
      'Didot', 'Bodoni MT', 'Hoefler Text'
    ],
  },
  {
    label: 'Monospace',
    fonts: [
      'Courier New', 'Lucida Console', 'Monaco', 'Andale Mono', 'Consolas'
    ],
  },
  {
    label: 'Display & Cursive',
    fonts: [
      'Impact', 'Comic Sans MS', 'Brush Script MT', 'Lucida Handwriting', 
      'Copperplate', 'Papyrus'
    ],
  },
];

const FontChanger: React.FC = () => {
  const [text, setText] = useState<string>('The quick brown fox jumps over the lazy dog.');
  const [selectedFont, setSelectedFont] = useState<string>('Arial');
  const [copied, setCopied] = useState<boolean>(false);
  const [previewCopied, setPreviewCopied] = useState<boolean>(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleFontChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFont(e.target.value);
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

  const handleCopyPreview = () => {
    if (text.length > 0) {
      navigator.clipboard.writeText(text);
      setPreviewCopied(true);
      setTimeout(() => setPreviewCopied(false), 2000);
    }
  };

  return (
    <>
      <div className="relative">
        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder="Start writing or paste your text here..."
          rows={6}
          className="w-full p-4 text-base text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 resize-y"
          aria-label="Text input area"
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

      <div className="mt-6">
        <label htmlFor="font-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Select a Font:
        </label>
        <select
          id="font-select"
          value={selectedFont}
          onChange={handleFontChange}
          className="w-full p-3 text-base text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
        >
          {fontGroups.map(group => (
            <optgroup key={group.label} label={group.label}>
              {group.fonts.map(font => (
                <option key={font} value={font} style={{ fontFamily: font }}>
                  {font}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                Preview
            </h2>
            <button
                onClick={handleCopyPreview}
                className="px-4 py-2 text-sm font-semibold text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                disabled={!text}
            >
                {previewCopied ? 'Copied!' : 'Copy Preview'}
            </button>
        </div>
        <div 
          className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 min-h-[10rem] break-words text-gray-800 dark:text-gray-200"
          aria-live="polite"
        >
          <p className="text-2xl whitespace-pre-wrap" style={{ fontFamily: selectedFont, fontKerning: 'normal' }}>
            {text || ' '}
          </p>
        </div>
      </div>

      <FontChangerFaq />
    </>
  );
};

export default FontChanger;
