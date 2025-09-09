import React, { useState } from 'react';

const faqData = [
  {
    question: 'What is the Text Repeater tool?',
    answer: 'The Text Repeater is a simple online utility that allows you to duplicate a piece of text as many times as you want. You can specify the exact number of repetitions and choose how the repeated text is separated, making it a versatile tool for various tasks.',
  },
  {
    question: 'How do I use it?',
    answer: 'It\'s easy! First, type or paste the text you want to repeat into the "Text to Repeat" box. Next, enter how many times you want to repeat it in the "Repetitions" field. Finally, choose a separator (like a new line or a space). The result will be instantly generated in the box below, ready for you to copy.',
  },
  {
    question: 'What are the separator options?',
    answer: (
      <>
        <p>A separator is the character(s) placed between each repetition of your text. You can choose from:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li><strong>New Line:</strong> Each repeated text will appear on its own line.</li>
          <li><strong>Space:</strong> Each repeated text will be separated by a single space.</li>
          <li><strong>None:</strong> The text will be repeated back-to-back with no separation at all.</li>
        </ul>
      </>
    ),
  },
  {
    question: 'Why would I need to repeat text?',
    answer: 'Repeating text has many practical and creative uses. Programmers and testers use it to generate large amounts of sample data for testing purposes. Social media users might use it to create eye-catching posts or comments. It can also be used for creating ASCII art or for any situation where you need a specific string duplicated quickly.',
  },
  {
    question: 'Is there a limit to the number of repetitions?',
    answer: 'To ensure your browser runs smoothly, we\'ve set a practical limit on the number of repetitions (e.g., 1,000) and the total output length. This prevents the tool from generating an enormous amount of text that could cause your browser to slow down or freeze. If the output is too large, it will be truncated.',
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

const TextRepeaterFaq: React.FC = () => {
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

export default TextRepeaterFaq;