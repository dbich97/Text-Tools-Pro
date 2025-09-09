import React, { useState } from 'react';
import CharacterCounter from './components/CharacterCounter';
import FontChanger from './components/FontChanger';
import FancyTextGenerator from './components/FancyTextGenerator';
import InvisibleCharacter from './components/InvisibleCharacter';
import CaseConverter from './components/CaseConverter';
import CompareText from './components/CompareText';
import FindAndReplace from './components/FindAndReplace';
import ReadabilityChecker from './components/ReadabilityChecker';
import ReadingTimeCalculator from './components/ReadingTimeCalculator';
import SyllableCounter from './components/SyllableCounter';
import TextRepeater from './components/TextRepeater';
import TitleCaseConverter from './components/TitleCaseConverter';
import WhitespaceRemover from './components/WhitespaceRemover';
import WordCounter from './components/WordCounter';
import ColemanLiauIndex from './components/ColemanLiauIndex';
import FleschKincaidCalculator from './components/FleschKincaidCalculator';
import FryReadabilityCalculator from './components/FryReadabilityCalculator';
import DaleChallReadability from './components/DaleChallReadability';
import GunningFogIndex from './components/GunningFogIndex';
import SmogReadability from './components/SmogReadability';
import BinaryTranslator from './components/BinaryTranslator';
import MorseCodeTranslator from './components/MorseCodeTranslator';
import UbbiDubbiTranslator from './components/UbbiDubbiTranslator';
import WingdingsTranslator from './components/WingdingsTranslator';
import AbjadCalculator from './components/AbjadCalculator';
import Alphabetizer from './components/Alphabetizer';
import AncientTextGenerator from './components/AncientTextGenerator';
import DrunkTextGenerator from './components/DrunkTextGenerator';
import GematriaCalculator from './components/GematriaCalculator';
import NumbersToWordsConverter from './components/NumbersToWordsConverter';
import WordsToNumbersConverter from './components/WordsToNumbersConverter';
import TextSplitter from './components/TextSplitter';
import WordsToPagesConverter from './components/WordsToPagesConverter';

type Tool = 'counter' | 'font' | 'fancy' | 'invisible' | 'case' | 'compare' | 'find' | 'readability' | 'readingTime' | 'syllable' | 'repeater' | 'titlecase' | 'whitespace' | 'word' | 'colemanliau' | 'fleschkincaid' | 'fryreadability' | 'dalechall' | 'gunningfog' | 'smog' | 'binary' | 'morse' | 'ubbidubbi' | 'wingdings' | 'abjad' | 'alphabetizer' | 'ancient' | 'drunk' | 'gematria' | 'numberstowords' | 'wordstonumbers' | 'textsplitter' | 'wordstopages';

const App: React.FC = () => {
  const [activeTool, setActiveTool] = useState<Tool>('counter');

  const navButtonClasses = "px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-900 focus:ring-purple-500";
  const activeClasses = "text-white bg-purple-600";
  const inactiveClasses = "text-gray-700 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 lg:p-8 font-sans">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <div className="flex justify-center items-center gap-3">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              Text Tools Pro
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
            Your all-in-one suite for instant text analysis and styling.
          </p>
        </header>
        
        <nav className="flex justify-center flex-wrap gap-4 mb-8">
          <button 
            onClick={() => setActiveTool('counter')} 
            className={`${navButtonClasses} ${activeTool === 'counter' ? activeClasses : inactiveClasses}`}
            aria-pressed={activeTool === 'counter'}
          >
            Character Counter
          </button>
          <button 
            onClick={() => setActiveTool('word')} 
            className={`${navButtonClasses} ${activeTool === 'word' ? activeClasses : inactiveClasses}`}
            aria-pressed={activeTool === 'word'}
          >
            Word Counter
          </button>
          <button 
            onClick={() => setActiveTool('font')} 
            className={`${navButtonClasses} ${activeTool === 'font' ? activeClasses : inactiveClasses}`}
            aria-pressed={activeTool === 'font'}
          >
            Font Changer
          </button>
          <button 
            onClick={() => setActiveTool('fancy')} 
            className={`${navButtonClasses} ${activeTool === 'fancy' ? activeClasses : inactiveClasses}`}
            aria-pressed={activeTool === 'fancy'}
          >
            Fancy Text Generator
          </button>
           <button 
            onClick={() => setActiveTool('drunk')} 
            className={`${navButtonClasses} ${activeTool === 'drunk' ? activeClasses : inactiveClasses}`}
            aria-pressed={activeTool === 'drunk'}
          >
            Drunk Text Generator
          </button>
          <button 
            onClick={() => setActiveTool('invisible')} 
            className={`${navButtonClasses} ${activeTool === 'invisible' ? activeClasses : inactiveClasses}`}
            aria-pressed={activeTool === 'invisible'}
          >
            Invisible Character
          </button>
          <button 
            onClick={() => setActiveTool('case')} 
            className={`${navButtonClasses} ${activeTool === 'case' ? activeClasses : inactiveClasses}`}
            aria-pressed={activeTool === 'case'}
          >
            Case Converter
          </button>
           <button 
            onClick={() => setActiveTool('titlecase')} 
            className={`${navButtonClasses} ${activeTool === 'titlecase' ? activeClasses : inactiveClasses}`}
            aria-pressed={activeTool === 'titlecase'}
          >
            Title Case Converter
          </button>
          <button 
            onClick={() => setActiveTool('compare')} 
            className={`${navButtonClasses} ${activeTool === 'compare' ? activeClasses : inactiveClasses}`}
            aria-pressed={activeTool === 'compare'}
          >
            Compare Text
          </button>
           <button 
            onClick={() => setActiveTool('find')} 
            className={`${navButtonClasses} ${activeTool === 'find' ? activeClasses : inactiveClasses}`}
            aria-pressed={activeTool === 'find'}
          >
            Find and Replace
          </button>
           <button 
            onClick={() => setActiveTool('whitespace')} 
            className={`${navButtonClasses} ${activeTool === 'whitespace' ? activeClasses : inactiveClasses}`}
            aria-pressed={activeTool === 'whitespace'}
          >
            Whitespace Remover
          </button>
          <button 
            onClick={() => setActiveTool('repeater')} 
            className={`${navButtonClasses} ${activeTool === 'repeater' ? activeClasses : inactiveClasses}`}
            aria-pressed={activeTool === 'repeater'}
          >
            Text Repeater
          </button>
           <button 
            onClick={() => setActiveTool('textsplitter')} 
            className={`${navButtonClasses} ${activeTool === 'textsplitter' ? activeClasses : inactiveClasses}`}
            aria-pressed={activeTool === 'textsplitter'}
          >
            Text Splitter
          </button>
           <button 
            onClick={() => setActiveTool('alphabetizer')} 
            className={`${navButtonClasses} ${activeTool === 'alphabetizer' ? activeClasses : inactiveClasses}`}
            aria-pressed={activeTool === 'alphabetizer'}
          >
            Alphabetizer
          </button>
           <button 
            onClick={() => setActiveTool('binary')} 
            className={`${navButtonClasses} ${activeTool === 'binary' ? activeClasses : inactiveClasses}`}
            aria-pressed={activeTool === 'binary'}
          >
            Binary Translator
          </button>
           <button 
            onClick={() => setActiveTool('morse')} 
            className={`${navButtonClasses} ${activeTool === 'morse' ? activeClasses : inactiveClasses}`}
            aria-pressed={activeTool === 'morse'}
          >
            Morse Code Translator
          </button>
          <button 
            onClick={() => setActiveTool('ubbidubbi')} 
            className={`${navButtonClasses} ${activeTool === 'ubbidubbi' ? activeClasses : inactiveClasses}`}
            aria-pressed={activeTool === 'ubbidubbi'}
          >
            Ubbi Dubbi Translator
          </button>
           <button 
            onClick={() => setActiveTool('wingdings')} 
            className={`${navButtonClasses} ${activeTool === 'wingdings' ? activeClasses : inactiveClasses}`}
            aria-pressed={activeTool === 'wingdings'}
          >
            Wingdings Translator
          </button>
           <button 
            onClick={() => setActiveTool('ancient')} 
            className={`${navButtonClasses} ${activeTool === 'ancient' ? activeClasses : inactiveClasses}`}
            aria-pressed={activeTool === 'ancient'}
          >
            Ancient Text Generator
          </button>
          <button 
            onClick={() => setActiveTool('abjad')} 
            className={`${navButtonClasses} ${activeTool === 'abjad' ? activeClasses : inactiveClasses}`}
            aria-pressed={activeTool === 'abjad'}
          >
            Abjad Calculator
          </button>
          <button 
            onClick={() => setActiveTool('gematria')} 
            className={`${navButtonClasses} ${activeTool === 'gematria' ? activeClasses : inactiveClasses}`}
            aria-pressed={activeTool === 'gematria'}
          >
            Gematria Calculator
          </button>
          <button 
            onClick={() => setActiveTool('numberstowords')} 
            className={`${navButtonClasses} ${activeTool === 'numberstowords' ? activeClasses : inactiveClasses}`}
            aria-pressed={activeTool === 'numberstowords'}
          >
            Numbers to Words
          </button>
          <button 
            onClick={() => setActiveTool('wordstonumbers')} 
            className={`${navButtonClasses} ${activeTool === 'wordstonumbers' ? activeClasses : inactiveClasses}`}
            aria-pressed={activeTool === 'wordstonumbers'}
          >
            Words to Numbers
          </button>
          <button 
            onClick={() => setActiveTool('wordstopages')} 
            className={`${navButtonClasses} ${activeTool === 'wordstopages' ? activeClasses : inactiveClasses}`}
            aria-pressed={activeTool === 'wordstopages'}
          >
            Words to Pages
          </button>
          <button 
            onClick={() => setActiveTool('readability')} 
            className={`${navButtonClasses} ${activeTool === 'readability' ? activeClasses : inactiveClasses}`}
            aria-pressed={activeTool === 'readability'}
          >
            Readability Checker
          </button>
          <button 
            onClick={() => setActiveTool('fleschkincaid')} 
            className={`${navButtonClasses} ${activeTool === 'fleschkincaid' ? activeClasses : inactiveClasses}`}
            aria-pressed={activeTool === 'fleschkincaid'}
          >
            Flesch Kincaid Calculator
          </button>
          <button 
            onClick={() => setActiveTool('gunningfog')} 
            className={`${navButtonClasses} ${activeTool === 'gunningfog' ? activeClasses : inactiveClasses}`}
            aria-pressed={activeTool === 'gunningfog'}
          >
            Gunning Fog Index
          </button>
          <button 
            onClick={() => setActiveTool('colemanliau')} 
            className={`${navButtonClasses} ${activeTool === 'colemanliau' ? activeClasses : inactiveClasses}`}
            aria-pressed={activeTool === 'colemanliau'}
          >
            Coleman-Liau Index
          </button>
           <button 
            onClick={() => setActiveTool('smog')} 
            className={`${navButtonClasses} ${activeTool === 'smog' ? activeClasses : inactiveClasses}`}
            aria-pressed={activeTool === 'smog'}
          >
            SMOG Readability
          </button>
           <button 
            onClick={() => setActiveTool('dalechall')} 
            className={`${navButtonClasses} ${activeTool === 'dalechall' ? activeClasses : inactiveClasses}`}
            aria-pressed={activeTool === 'dalechall'}
          >
            Dale–Chall Readability
          </button>
          <button 
            onClick={() => setActiveTool('fryreadability')} 
            className={`${navButtonClasses} ${activeTool === 'fryreadability' ? activeClasses : inactiveClasses}`}
            aria-pressed={activeTool === 'fryreadability'}
          >
            Fry Readability Calculator
          </button>
          <button 
            onClick={() => setActiveTool('readingTime')} 
            className={`${navButtonClasses} ${activeTool === 'readingTime' ? activeClasses : inactiveClasses}`}
            aria-pressed={activeTool === 'readingTime'}
          >
            Reading Time Calculator
          </button>
          <button 
            onClick={() => setActiveTool('syllable')} 
            className={`${navButtonClasses} ${activeTool === 'syllable' ? activeClasses : inactiveClasses}`}
            aria-pressed={activeTool === 'syllable'}
          >
            Syllable Counter
          </button>
        </nav>

        <main className="w-full">
            {activeTool === 'counter' && <CharacterCounter />}
            {activeTool === 'word' && <WordCounter />}
            {activeTool === 'font' && <FontChanger />}
            {activeTool === 'fancy' && <FancyTextGenerator />}
            {activeTool === 'drunk' && <DrunkTextGenerator />}
            {activeTool === 'invisible' && <InvisibleCharacter />}
            {activeTool === 'case' && <CaseConverter />}
            {activeTool === 'compare' && <CompareText />}
            {activeTool === 'find' && <FindAndReplace />}
            {activeTool === 'readability' && <ReadabilityChecker />}
            {activeTool === 'fleschkincaid' && <FleschKincaidCalculator />}
            {activeTool === 'fryreadability' && <FryReadabilityCalculator />}
            {activeTool === 'colemanliau' && <ColemanLiauIndex />}
            {activeTool === 'dalechall' && <DaleChallReadability />}
            {activeTool === 'gunningfog' && <GunningFogIndex />}
            {activeTool === 'smog' && <SmogReadability />}
            {activeTool === 'readingTime' && <ReadingTimeCalculator />}
            {activeTool === 'syllable' && <SyllableCounter />}
            {activeTool === 'repeater' && <TextRepeater />}
            {activeTool === 'titlecase' && <TitleCaseConverter />}
            {activeTool === 'whitespace' && <WhitespaceRemover />}
            {activeTool === 'binary' && <BinaryTranslator />}
            {activeTool === 'morse' && <MorseCodeTranslator />}
            {activeTool === 'ubbidubbi' && <UbbiDubbiTranslator />}
            {activeTool === 'wingdings' && <WingdingsTranslator />}
            {activeTool === 'ancient' && <AncientTextGenerator />}
            {activeTool === 'abjad' && <AbjadCalculator />}
            {activeTool === 'gematria' && <GematriaCalculator />}
            {activeTool === 'alphabetizer' && <Alphabetizer />}
            {activeTool === 'numberstowords' && <NumbersToWordsConverter />}
            {activeTool === 'wordstonumbers' && <WordsToNumbersConverter />}
            {activeTool === 'wordstopages' && <WordsToPagesConverter />}
            {activeTool === 'textsplitter' && <TextSplitter />}
        </main>
        
        <footer className="text-center mt-12 py-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">
                &copy; {new Date().getFullYear()} Text Tools Pro. All rights reserved.
            </p>
        </footer>
      </div>
    </div>
  );
};

export default App;