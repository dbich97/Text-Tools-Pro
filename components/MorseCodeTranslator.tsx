import React, { useState, useEffect, useCallback } from 'react';
import { textToMorse, morseToText, playMorseCode, stopMorseCode, generateMorseAudioWav } from '../utils/morseCode';
import MorseCodeTranslatorFaq from './MorseCodeTranslatorFaq';
import MorseSettingsModal from './MorseSettingsModal';

// --- Icon Components ---
const SettingsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const PlayIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const DownloadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>;
const CopyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>;
const SwapIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>;

const MorseCodeTranslator: React.FC = () => {
  const [text, setText] = useState<string>('SOS');
  const [morse, setMorse] = useState<string>('... --- ...');
  const [lastChanged, setLastChanged] = useState<'text' | 'morse'>('text');
  
  const [textCopied, setTextCopied] = useState<boolean>(false);
  const [morseCopied, setMorseCopied] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const [settings, setSettings] = useState({ wpm: 20, frequency: 600 });
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    if (lastChanged === 'text') {
      setMorse(textToMorse(text));
    }
  }, [text, lastChanged]);

  useEffect(() => {
    if (lastChanged === 'morse') {
      setText(morseToText(morse));
    }
  }, [morse, lastChanged]);
  
  useEffect(() => {
    return () => { stopMorseCode(); };
  }, []);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    setLastChanged('text');
  };

  const handleMorseChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const validMorse = e.target.value.replace(/[^.\- /]/g, '');
    setMorse(validMorse);
    setLastChanged('morse');
  };

  const handleCopy = (content: string, type: 'text' | 'morse') => {
    if (content) {
      navigator.clipboard.writeText(content);
      if (type === 'text') {
        setTextCopied(true);
        setTimeout(() => setTextCopied(false), 2000);
      } else {
        setMorseCopied(true);
        setTimeout(() => setMorseCopied(false), 2000);
      }
    }
  };

  const handlePlaySound = useCallback(async () => {
    if (morse && !isPlaying) {
      setIsPlaying(true);
      await playMorseCode(morse, settings.wpm, settings.frequency);
      setIsPlaying(false);
    }
  }, [morse, isPlaying, settings]);

  const handleDownload = useCallback(async () => {
    if (morse) {
      const blob = await generateMorseAudioWav(morse, settings.wpm, settings.frequency);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'morse-code.wav';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    }
  }, [morse, settings]);

  const handlePlayText = () => {
    if (text && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.cancel();
      speechSynthesis.speak(utterance);
    }
  };

  const handleSOS = () => {
    setText('SOS');
    setLastChanged('text');
  };

  const handleSwap = () => {
    const currentText = text;
    setText(morseToText(morse));
    setMorse(textToMorse(currentText));
  };
  
  const ActionButton: React.FC<{ onClick: () => void; label: string; children: React.ReactNode; disabled?: boolean;}> = ({ onClick, label, children, disabled = false }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex flex-col items-center justify-center p-2 text-xs font-semibold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed w-16 h-16"
      aria-label={label}
    >
      {children}
      <span className="mt-1">{label}</span>
    </button>
  );


  return (
    <>
      <div className="space-y-6">
        {/* Morse Code Section */}
        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-3 gap-3">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Morse Code</h2>
            <div className="flex items-center gap-2">
              <ActionButton onClick={() => setIsSettingsOpen(true)} label="Settings"><SettingsIcon /></ActionButton>
              <ActionButton onClick={handlePlaySound} label={isPlaying ? 'Playing' : 'Play'} disabled={!morse || isPlaying}><PlayIcon /></ActionButton>
              <ActionButton onClick={handleDownload} label="Download" disabled={!morse}><DownloadIcon /></ActionButton>
              <ActionButton onClick={() => handleCopy(morse, 'morse')} label={morseCopied ? 'Copied' : 'Copy'} disabled={!morse}><CopyIcon /></ActionButton>
            </div>
          </div>
          <textarea
            value={morse}
            onChange={handleMorseChange}
            rows={6}
            className="w-full p-3 text-base font-mono text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 resize-y"
            aria-label="Morse code input and output"
            placeholder="... --- ..."
          />
        </div>

        {/* Text Section */}
        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-3 gap-3">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Text</h2>
            <div className="flex items-center gap-2">
              <ActionButton onClick={handleSwap} label="Swap"><SwapIcon /></ActionButton>
              <ActionButton onClick={handlePlayText} label="Play" disabled={!text}><PlayIcon /></ActionButton>
              <ActionButton onClick={handleSOS} label="SOS">SOS</ActionButton>
              <ActionButton onClick={() => handleCopy(text, 'text')} label={textCopied ? 'Copied' : 'Copy'} disabled={!text}><CopyIcon /></ActionButton>
            </div>
          </div>
          <textarea
            value={text}
            onChange={handleTextChange}
            rows={6}
            className="w-full p-3 text-base text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 resize-y"
            aria-label="Text input and output"
            placeholder="Enter your text here"
          />
        </div>
      </div>

      <MorseSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSettingsChange={setSettings}
      />
      
      <MorseCodeTranslatorFaq />
    </>
  );
};

export default MorseCodeTranslator;
