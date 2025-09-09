import React, { useState } from 'react';

const faqData = [
  {
    question: 'What is a Words to Numbers Converter?',
    answer: 'A Words to Numbers Converter is a tool that translates numerical figures written in English words (e.g., "one hundred twenty-three") into their digit form (e.g., "123"). It\'s the inverse of the Numbers to Words converter.',
  },
  {
    question: 'How do I use this tool?',
    answer: 'Simply type or paste the number words into the "Enter Words" input box. The tool will automatically convert the text into numbers and display the result in the box below. You can then use the "Copy" button to copy the numerical output.',
  },
  {
    question: 'What formats and words are supported?',
    answer: (
      <>
        <p>This converter understands standard English number words and can handle:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Basic numbers (e.g., "ninety-nine").</li>
          <li>Large scale numbers (e.g., "two million five hundred thousand").</li>
          <li>Decimals using the word "point" (e.g., "three point one four").</li>
          <li>Common connecting words like "and", which are ignored during conversion.</li>
          <li>Commas and hyphens, which are also ignored.</li>
        </ul>
      </>
    ),
  },
  {
    question: 'Are there any limitations?',
    answer: 'This tool is designed to convert number words, not to interpret them from within a full sentence. Including non-numeric words (e.g., "about one hundred dollars") will result in an error. Please input only the words representing the number you wish to convert for the best results.',
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

const WordsToNumbersConverterFaq: React.FC = () => {
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

export default WordsToNumbersConverterFaq;