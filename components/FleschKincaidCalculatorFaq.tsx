import React, { useState } from 'react';

const faqData = [
  {
    question: 'What is the Flesch-Kincaid Calculator?',
    answer: 'The Flesch-Kincaid Calculator is a tool that assesses the readability of English text using two specific tests: the Flesch Reading Ease score and the Flesch-Kincaid Grade Level. It helps writers evaluate how easy their text is to understand.',
  },
  {
    question: 'What is the Flesch Reading Ease score?',
    answer: 'This score rates text on a 100-point scale. The higher the score, the easier the text is to read. A score of 90-100 is considered very easy (understandable by an 11-year-old), while a score of 0-30 is very difficult (best for university graduates). Most standard documents aim for a score between 60 and 70.',
  },
  {
    question: 'What is the Flesch-Kincaid Grade Level?',
    answer: 'This score translates the 0-100 Reading Ease score into a U.S. school grade level. For example, a grade level score of 8 means the text is expected to be understood by an average 8th-grade student. It provides a more relatable context for the readability of a document.',
  },
  {
    question: 'How are these scores calculated?',
    answer: 'Both formulas are based on the same core metrics: the average number of words per sentence and the average number of syllables per word. Text with shorter sentences and fewer multi-syllable words will have a higher reading ease score and a lower grade level.',
  },
  {
    question: 'How can I use these scores to improve my writing?',
    answer: 'Aim for scores that match your target audience. For a general audience, a Reading Ease score of 60 or higher and a Grade Level of 8-9 is a good target. To improve your scores, try to use shorter sentences, break up long paragraphs, and replace complex, multi-syllable words with simpler alternatives where possible.',
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

const FleschKincaidCalculatorFaq: React.FC = () => {
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

export default FleschKincaidCalculatorFaq;