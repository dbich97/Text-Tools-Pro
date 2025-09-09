import React, { useState } from 'react';

const faqData = [
  {
    question: 'What is Ubbi Dubbi?',
    answer: 'Ubbi Dubbi is a language game, or argot, that was popularized by the 1970s PBS children\'s television show ZOOM. It involves adding the sound "ub" before each vowel sound in a word, making it a fun and simple way to speak in a "secret" code.',
  },
  {
    question: 'How do I use this translator?',
    answer: 'It works both ways! Type regular English into the "Your Text" box to see it instantly converted into Ubbi Dubbi. You can also type or paste Ubbi Dubbi into its box to translate it back to English. Use the "Swap" button to easily switch between the two.',
  },
  {
    question: 'What are the rules of Ubbi Dubbi?',
    answer: (
      <>
        <p>The rules are very simple. You just insert the letters "ub" before every vowel sound in a word.</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>If a word has multiple vowels together (a vowel group), "ub" is only added before the first vowel in that group.</li>
          <li>For example, "speak" becomes "spubeak", not "spube-ubak".</li>
          <li>The word "hello" becomes "hubellubo".</li>
          <li>"Extra" becomes "ubextruba".</li>
        </ul>
      </>
    ),
  },
  {
    question: 'Can the reverse translation make mistakes?',
    answer: 'The reverse translator is designed to only remove "ub" when it comes directly before a vowel. This helps prevent it from accidentally changing words that naturally contain "ub", like "stubborn" or "pub". However, for very unusual or invented words, there\'s a small chance of an incorrect translation.',
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

const UbbiDubbiTranslatorFaq: React.FC = () => {
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

export default UbbiDubbiTranslatorFaq;