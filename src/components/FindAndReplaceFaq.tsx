import React, { useState } from 'react';

const faqData = [
  {
    question: 'What is the Find and Replace Tool?',
    answer: 'The Find and Replace tool is a utility that searches for a specified string of text (the "find" text) in a larger body of text and replaces it with another string (the "replace" text). It\'s an essential tool for making bulk edits quickly and accurately.',
  },
  {
    question: 'How do I use this tool?',
    answer: 'First, paste your full text into the main text area. Next, type the word or phrase you want to find into the "Find" box. Then, type the word or phrase you want to replace it with into the "Replace With" box. Finally, choose whether to replace a single instance or all of them using the "Replace" or "Replace All" buttons.',
  },
  {
    question: 'What do the search options mean?',
    answer: (
      <>
        <p>The options provide more control over your search:</p>
        <ul className="list-disc list-inside mt-2 space-y-2">
          <li><strong>Case Sensitive:</strong> When checked, the tool will only find text that matches the exact capitalization of your search query. For example, a search for "Apple" will not find "apple". If unchecked, it will find both.</li>
          <li><strong>Whole Word:</strong> When checked, the tool will only find instances where your search query appears as a complete word, not as part of another word. For example, a search for "cat" will find "cat" but not "caterpillar".</li>
        </ul>
      </>
    ),
  },
  {
    question: 'What\'s the difference between "Replace" and "Replace All"?',
    answer: 'The "Replace" button will find and replace only the very first occurrence of your search term in the text. The "Replace All" button will find every single occurrence of your search term from the beginning to the end of the text and replace all of them at once.',
  },
  {
    question: 'Who is this tool for?',
    answer: 'This tool is incredibly useful for a wide range of people. Writers can use it to correct recurring mistakes, developers can use it to refactor code, data analysts can use it to clean up datasets, and students can use it to edit their essays. Anyone who works with text can save time with this tool.',
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

const FindAndReplaceFaq: React.FC = () => {
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

export default FindAndReplaceFaq;