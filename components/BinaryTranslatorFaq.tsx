import React, { useState } from 'react';

const faqData = [
  {
    question: 'What is this Text Conversion Tool?',
    answer: 'This is a versatile online utility that can convert data between several common formats used in computing: standard Text (ASCII/UTF-8), Binary (base-2), Decimal (base-10), Hexadecimal (base-16), and Octal (base-8).',
  },
  {
    question: 'How do I use the converter?',
    answer: 'First, select the format of your data from the "Input" dropdown menu. Then, paste or type your data into the main input box. Next, select your desired format from the "Output" dropdown. The conversion will happen instantly, and the result will appear in the read-only box at the bottom.',
  },
  {
    question: 'What do the different formats represent?',
    answer: (
      <>
        <p>All data in a computer is stored as numbers. These formats are just different ways of representing those numbers:</p>
        <ul className="list-disc list-inside mt-2 space-y-2">
          <li><strong>Text:</strong> The human-readable characters you type. Each character is represented by a number (e.g., 'A' is 65).</li>
          <li><strong>Binary (base-2):</strong> The computer's native language, using only 0s and 1s. The text character 'A' (decimal 65) is `01000001` in binary.</li>
          <li><strong>Decimal (base-10):</strong> The standard number system we use every day (0-9). The character 'A' is represented as `65`.</li>
          <li><strong>Hexadecimal (base-16):</strong> A compact way to represent binary data, using digits 0-9 and letters A-F. It's common in programming and web design (e.g., for colors). 'A' is `41` in hexadecimal.</li>
          <li><strong>Octal (base-8):</strong> An older number system that uses digits 0-7. 'A' is `101` in octal.</li>
        </ul>
      </>
    ),
  },
  {
    question: 'What is the "Swap" button for?',
    answer: 'The swap button is a handy shortcut that switches your input and output formats. It also takes the current result from the output box and places it into the input box, allowing you to quickly perform another conversion on it.',
  },
  {
    question: 'What format should my input be in?',
    answer: 'For Text, just type normally. For the other formats (Binary, Decimal, Hexadecimal, Octal), the tool expects the values for each character to be separated by a space. For example, to convert the text "Hi" to binary, you would input `01001000 01101001`.',
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

const BinaryTranslatorFaq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mt-12 w-full mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
        About the Text Converter
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

export default BinaryTranslatorFaq;
