import React, { useState } from 'react';

const faqData = [
  {
    question: 'What is the Drunk Text Generator?',
    answer: 'The Drunk Text Generator is a fun, stylistic tool that transforms your normal, sober text into a humorous imitation of a drunk text message. It adds typos, random capitalization, slang, and other quirks to make your text look like it was written... well, while intoxicated. It\'s purely for entertainment!',
  },
  {
    question: 'How do I use it?',
    answer: 'It\'s simple! Type your message into the "Sober Text" box. Then, use the slider to choose your desired "Drunkenness Level." Finally, click the "Generate Drunk Text" button. Your hilariously messy message will appear in the "Drunk Text" box, ready to be copied and shared.',
  },
  {
    question: 'What does the "Drunkenness Level" slider do?',
    answer: (
      <>
        <p>The slider controls the intensity of the effects. A higher level means more mistakes and more chaos:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li><strong>Tipsy:</strong> A few minor mistakes, maybe a typo or two. Still quite readable.</li>
          <li><strong>Drunk:</strong> More frequent typos, some random capitalization, and maybe some slang.</li>
          <li><strong>Very Drunk:</strong> The mistakes become more obvious, with repeated letters and more aggressive punctuation.</li>
          <li><strong>Wasted:</strong> It gets pretty messy. Lots of typos, capitalization is all over the place, and filler words are common.</li>
          <li><strong>Completely Wasted:</strong> Maximum chaos. The text will be difficult to read, full of errors, and very funny.</li>
        </ul>
      </>
    ),
  },
  {
    question: 'Is this meant to be taken seriously?',
    answer: 'Absolutely not. This tool is for fun and should be used to create humorous content to share with friends. It does not reflect or condone irresponsible behavior. Please enjoy it responsibly!',
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

const DrunkTextGeneratorFaq: React.FC = () => {
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

export default DrunkTextGeneratorFaq;