import React, { useState } from 'react';

const faqData = [
  {
    question: 'What is a Text Splitter?',
    answer: 'A Text Splitter, also known as a Character Separator, is a tool that takes your text and inserts a separator between each character. This allows you to quickly format text in unique ways.',
  },
  {
    question: 'How do I use this tool?',
    answer: 'Simply type or paste your text into the "Your Text" box. Then, in the "Separator" box, enter the character or string you want to place between each letter of your original text. The result will appear instantly in the box below, ready to copy.',
  },
  {
    question: 'What can I use as a separator?',
    answer: 'You can use almost anything! Common choices include a space, a comma (,), a hyphen (-), or even multiple characters like "---" or an emoji. If you leave the separator box empty, it will remove all spaces and join the characters together.',
  },
  {
    question: 'What is this tool useful for?',
    answer: (
      <>
        <p>This tool is great for various creative and technical tasks:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li><strong>Aesthetic Text:</strong> Create spaced-out text for social media bios or posts (`l i k e  t h i s`).</li>
          <li><strong>Data Formatting:</strong> Easily convert a string into a comma-separated list of characters for use in programming or data entry.</li>
          <li><strong>Educational Purposes:</strong> Help visualize individual characters within a word for learning purposes.</li>
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

const TextSplitterFaq: React.FC = () => {
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

export default TextSplitterFaq;
