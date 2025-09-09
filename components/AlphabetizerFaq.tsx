import React, { useState } from 'react';

const faqData = [
  {
    question: 'What is an Alphabetizer?',
    answer: 'An Alphabetizer is a simple tool that sorts lists of text into alphabetical order. Whether you have a list of names, items, or any other text, this tool can quickly arrange them for you based on the options you select.',
  },
  {
    question: 'How do I use it?',
    answer: 'Simply paste your list into the "Your List" text box, with each item on a new line. The "Sorted List" box will update in real-time as you type or change the sorting options. Once you\'re happy with the result, you can use the "Copy" button to grab the sorted list.',
  },
  {
    question: 'What do the sorting options mean?',
    answer: (
      <>
        <p>The options give you precise control over how your list is sorted:</p>
        <ul className="list-disc list-inside mt-2 space-y-2">
          <li><strong>A-Z (Ascending):</strong> This is the standard alphabetical order, from A to Z.</li>
          <li><strong>Z-A (Descending):</strong> This reverses the alphabetical order, sorting from Z to A.</li>
          <li><strong>Ignore Case:</strong> This option treats uppercase and lowercase letters as the same (e.g., "apple" and "Apple" are considered equal for sorting purposes).</li>
          <li><strong>Respect Case:</strong> This option considers uppercase letters to have a different value than lowercase letters. Typically, this means all uppercase words will be sorted before all lowercase words (e.g., "Zebra" comes before "apple").</li>
          <li><strong>Remove Duplicates:</strong> When checked, this option will remove any duplicate lines from your list, leaving only the first occurrence of each unique item.</li>
        </ul>
      </>
    ),
  },
  {
    question: 'What are common uses for this tool?',
    answer: 'This tool is useful for anyone who needs to organize a list. Common uses include sorting a list of names, organizing a to-do list, alphabetizing a bibliography or reference list, sorting lines of code, or arranging a grocery list.',
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

const AlphabetizerFaq: React.FC = () => {
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

export default AlphabetizerFaq;
