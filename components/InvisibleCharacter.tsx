import React, { useState, useRef } from 'react';
import InvisibleCharacterFaq from './InvisibleCharacterFaq';

const invisibleCharacters = [
  {
    name: 'Braille Pattern Blank',
    character: '⠀',
    unicode: 'U+2800',
    description: 'A wide blank character, often used for creating empty-looking nicknames and messages.',
  },
  {
    name: 'Hangul Filler',
    character: 'ㅤ',
    unicode: 'U+3164',
    description: 'Another wide blank character, very popular for usernames on platforms like Discord.',
  },
  {
    name: 'Zero-Width Space',
    character: '​', // U+200B
    unicode: 'U+200B',
    description: 'A non-printing character that can be used to break words on lines or separate emojis.',
  },
  {
    name: 'Right-to-Left Mark',
    character: '‏', // U+200F
    unicode: 'U+200F',
    description: 'A formatting character that is invisible but can influence text direction. Useful for bypassing some text filters.',
  },
];

const InvisibleCharacter: React.FC = () => {
  const [copiedChar, setCopiedChar] = useState<string | null>(null);
  const [testText, setTestText] = useState<string>('Your test text here.');
  const [testCopied, setTestCopied] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // State for the new generator
  const [selectedGeneratorChar, setSelectedGeneratorChar] = useState<string>(invisibleCharacters[0].character);
  const [charCount, setCharCount] = useState<number>(100);
  const [generatorCopied, setGeneratorCopied] = useState<boolean>(false);


  const handleCopy = (e: React.MouseEvent<HTMLButtonElement>, char: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(char);
    setCopiedChar(char);
    setTimeout(() => setCopiedChar(null), 2000);
  };

  const handleCopyTestText = () => {
    if (testText.length > 0) {
      navigator.clipboard.writeText(testText);
      setTestCopied(true);
      setTimeout(() => setTestCopied(false), 2000);
    }
  };

  const handleInsertCharacter = (char: string) => {
    const textarea = textareaRef.current;
    if (textarea) {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;
        const newText = text.substring(0, start) + char + text.substring(end);
        
        setTestText(newText);

        setTimeout(() => {
            textarea.focus();
            textarea.selectionStart = textarea.selectionEnd = start + char.length;
        }, 0);
    }
  };

  const handleGenerateAndCopy = () => {
    if (charCount > 0 && selectedGeneratorChar) {
      const generatedString = selectedGeneratorChar.repeat(charCount);
      navigator.clipboard.writeText(generatedString);
      setGeneratorCopied(true);
      setTimeout(() => setGeneratorCopied(false), 2000);
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-3">
          Invisible Characters
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          Copy a variety of special Unicode characters that appear invisible. Perfect for sending blank messages or creating unique usernames where spaces aren't allowed.
        </p>
      </div>

      <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
          Test & Copy Invisible Character
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
          Use this area to combine characters and see how they appear. Click on the character cards below to insert them into your text.
        </p>
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={testText}
            onChange={(e) => setTestText(e.target.value)}
            rows={4}
            className="w-full p-3 text-base text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 resize-y"
            aria-label="Test area for invisible characters"
          />
        </div>
        <div className="flex justify-end mt-3">
            <button
              onClick={handleCopyTestText}
              disabled={!testText}
              className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {testCopied ? 'Copied!' : 'Copy Test Text'}
            </button>
        </div>
      </div>

      <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
          Generate Unlimited Invisible Characters
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
          Need a lot of invisible characters? Select a character, enter a count, and copy the result instantly.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="w-full sm:w-1/2">
                <label htmlFor="char-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Character Type</label>
                <select 
                    id="char-select"
                    value={selectedGeneratorChar}
                    onChange={(e) => setSelectedGeneratorChar(e.target.value)}
                    className="w-full p-2 text-base text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                    {invisibleCharacters.map(char => (
                        <option key={char.unicode} value={char.character}>{char.name}</option>
                    ))}
                </select>
            </div>
            <div className="w-full sm:w-1/4">
                <label htmlFor="char-count" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Count</label>
                <input
                    type="number"
                    id="char-count"
                    value={charCount}
                    onChange={(e) => setCharCount(Math.max(1, parseInt(e.target.value, 10) || 1))}
                    min="1"
                    max="5000"
                    className="w-full p-2 text-base text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
            </div>
            <div className="w-full sm:w-auto sm:self-end">
                <button
                    onClick={handleGenerateAndCopy}
                    className="w-full px-4 py-2 text-sm font-semibold text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                    {generatorCopied ? 'Copied!' : 'Generate & Copy'}
                </button>
            </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {invisibleCharacters.map((item, index) => (
          <div 
            key={index} 
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 flex flex-col justify-between cursor-pointer transition-all duration-200 hover:ring-2 hover:ring-purple-500 hover:shadow-lg"
            onClick={() => handleInsertCharacter(item.character)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => { if (e.key === 'Enter' || e.key === ' ') handleInsertCharacter(item.character)}}
            aria-label={`Insert ${item.name}`}
          >
            <div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">{item.name} <span className="text-sm font-mono text-gray-500 dark:text-gray-400">{item.unicode}</span></h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2 mb-4 text-sm">{item.description}</p>
              <div className="mb-4">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Preview (between quotes):
                  </p>
                  <pre className="w-full bg-gray-100 dark:bg-gray-900 p-3 rounded-md text-base text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 overflow-x-auto">
                      <code>"{item.character}"</code>
                  </pre>
              </div>
            </div>
            <button
              onClick={(e) => handleCopy(e, item.character)}
              className="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              aria-label={`Copy ${item.name}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              {copiedChar === item.character ? 'Copied!' : 'Copy'}
            </button>
          </div>
        ))}
      </div>

      <InvisibleCharacterFaq />
    </>
  );
};

export default InvisibleCharacter;