import React, { useState } from 'react';

const faqData = [
  {
    question: 'What is a Whitespace Remover?',
    answer: 'A Whitespace Remover is an online tool designed to clean up text by removing unwanted spaces, tabs, and line breaks. It helps to format text consistently, which is especially useful when you have copied text from sources like emails, PDFs, or websites that often have messy formatting.',
  },
  {
    question: 'How do I use this tool?',
    answer: 'Simply paste your text into the text area. Then, click one of the action buttons below the text area to apply a specific cleaning function. The text will be instantly updated. You can then copy the cleaned-up text to your clipboard.',
  },
  {
    question: 'What do the different cleaning options do?',
    answer: (
      <>
        <p>This tool offers several specific actions to clean your text:</p>
        <ul className="list-disc list-inside mt-2 space-y-2">
          <li><strong>Trim Extra Spaces:</strong> This is the most common function. It removes any leading or trailing spaces from your text and replaces any instance of multiple spaces between words with a single space.</li>
          <li><strong>Remove All Spaces:</strong> This option removes every single whitespace character from the text, including spaces, tabs, and newlines. The result is a continuous block of text with no spaces at all.</li>
          <li><strong>Remove Line Breaks:</strong> This function removes all line breaks and replaces them with a single space. It's perfect for converting a vertical list of items into a single paragraph.</li>
          <li><strong>Trim Lines:</strong> This action removes whitespace (spaces and tabs) from the beginning and end of each individual line, without affecting the spaces between words or the empty lines between paragraphs.</li>
        </ul>
      </>
    ),
  },
  {
    question: 'When would I need to use this tool?',
    answer: 'This tool is helpful in many situations. You might use it to clean up code or data before processing it, fix formatting in text copied from a PDF, convert a column of data from a spreadsheet into a comma-separated list, or simply make a document look neater and more professional.',
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

const WhitespaceRemoverFaq: React.FC = () => {
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

export default WhitespaceRemoverFaq;