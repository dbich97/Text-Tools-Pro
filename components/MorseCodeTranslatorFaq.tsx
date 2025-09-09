import React, { useState } from 'react';

const faqData = [
  {
    question: 'What is a Morse Code Translator?',
    answer: 'A Morse Code Translator is a tool that converts standard text into Morse code and vice versa. Morse code is a communication system that represents letters, numbers, and punctuation marks as sequences of dots (short signals) and dashes (long signals).',
  },
  {
    question: 'How do I use this translator?',
    answer: 'It works in both directions! Type regular text into the "Text" box, and you will see it converted to Morse code in real-time. Alternatively, you can type Morse code into the "Morse Code" box, and it will be translated back into regular text.',
  },
  {
    question: 'How do I change the sound settings?',
    answer: 'Click the "Settings" button in the Morse Code section. A panel will appear allowing you to adjust the speed in Words Per Minute (WPM) and the audio tone\'s frequency in Hertz (Hz). Higher WPM means faster playback, and higher frequency means a higher-pitched tone.',
  },
  {
    question: 'What does the "Download" button do?',
    answer: 'The "Download" button generates a .WAV audio file of the current Morse code message based on your sound settings. You can save this file and play it on any device or share it with others.'
  },
    {
    question: 'What do the buttons in the "Text" section do?',
    answer: (
      <>
        <p>The buttons in the text section offer several conveniences:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li><strong>Swap:</strong> Instantly swaps the content of the Morse Code and Text boxes.</li>
          <li><strong>Play:</strong> Uses your browser's built-in text-to-speech engine to read the text aloud.</li>
          <li><strong>SOS:</strong> A shortcut that inputs the universal distress signal "SOS" into the text field, which is then translated into its Morse code equivalent: `... --- ...`</li>
           <li><strong>Copy:</strong> Copies the current text to your clipboard.</li>
        </ul>
      </>
    ),
  },
  {
    question: 'How is Morse code formatted here?',
    answer: (
      <>
        <p>This tool uses a standard format for clarity:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Dots (.) and dashes (-) make up the letters.</li>
          <li>A single space is used to separate letters (e.g., `.... .` is "HE").</li>
          <li>A forward slash surrounded by spaces (` / `) is used to separate words (e.g., `.... . .-.. .-.. --- / .-- --- .-. .-.. -..` is "HELLO WORLD").</li>
        </ul>
      </>
    ),
  },
];

const AccordionItem: React.FC<{
  faq: typeof faqData[0];
  isOpen: boolean;
  onClick: () => void;
}> = ({ faq, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <button
        onClick={onClick}
        className="flex justify-between items-center w-full py-4 text-left text-lg font-semibold text-gray-800 dark:text-gray-200"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${faq.question}`}
      >
        <span>{faq.question}</span>
        <svg
          className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      <div
        id={`faq-answer-${faq.question}`}
        className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
        style={{ transitionProperty: 'grid-template-rows, opacity' }}
      >
        <div className="overflow-hidden">
            <div className="pb-4 text-gray-600 dark:text-gray-400">
            {typeof faq.answer === 'string' ? <p>{faq.answer}</p> : faq.answer}
            </div>
        </div>
      </div>
    </div>
  );
};

const MorseCodeTranslatorFaq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mt-12 w-full mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
        Frequently Asked Questions
      </h2>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-4 md:p-6">
        {faqData.map((faq, index) => (
          <AccordionItem
            key={index}
            faq={faq}
            isOpen={openIndex === index}
            onClick={() => handleToggle(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default MorseCodeTranslatorFaq;
