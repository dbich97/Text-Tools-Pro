import React, { useState } from 'react';

const faqData = [
  {
    question: 'What is a Numbers to Words Converter?',
    answer: 'A Numbers to Words Converter is a tool that translates numerical figures (e.g., 123) into their written English word equivalents (e.g., "one hundred twenty-three"). It can handle both integer and decimal numbers.',
  },
  {
    question: 'How do I use this tool?',
    answer: 'Simply type or paste the number you want to convert into the input box. The tool will automatically display the written-out version in the result box below. You can then use the "Copy" button to copy the text.',
  },
  {
    question: 'What is this tool used for?',
    answer: (
      <>
        <p>This tool is useful in many situations where numbers need to be written out in full, such as:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Writing checks, where the amount must be written in words to prevent fraud.</li>
          <li>Legal documents and contracts, which often require numerical values to be spelled out.</li>
          <li>Formal writing and academic papers where spelling out numbers (especially smaller ones) is part of the style guide.</li>
          <li>Teaching children how to read and write numbers.</li>
        </ul>
      </>
    ),
  },
  {
    question: 'How are decimals handled?',
    answer: 'The tool converts the decimal part by spelling out each digit individually after the word "point". For example, the number `123.45` will be converted to "one hundred twenty-three point four five".',
  },
  {
    question: 'Is there a limit to the size of the number?',
    answer: 'The tool can handle very large numbers, up to quintillions. However, for extremely large numbers that exceed standard computational limits, it may be truncated or show an error to ensure accuracy and prevent browser performance issues.',
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

const NumbersToWordsConverterFaq: React.FC = () => {
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

export default NumbersToWordsConverterFaq;