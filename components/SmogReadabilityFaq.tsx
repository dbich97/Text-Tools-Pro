import React, { useState } from 'react';

const faqData = [
  {
    question: 'What is the SMOG Readability Formula?',
    answer: 'SMOG stands for "Simple Measure of Gobbledygook." It\'s a popular and highly respected readability formula that estimates the years of education a person needs to understand a piece of English text. It\'s widely used in the healthcare industry to ensure patient information is easy to comprehend.',
  },
  {
    question: 'How is the SMOG grade calculated?',
    answer: 'The SMOG formula has a unique calculation method. It takes a sample of 30 sentences from the text, counts the number of "polysyllabic" words (words with 3 or more syllables), finds the square root of that number, and adds a constant of 3. The result is a direct estimate of the U.S. grade level required to understand the text.',
  },
  {
    question: 'How does this differ from other readability tests?',
    answer: 'The main difference is its strict reliance on the polysyllabic word count within a fixed sample of 30 sentences. It doesn\'t use average sentence length in the same way as Flesch-Kincaid or Gunning Fog. This focus on only the most difficult words makes it a very stringent and often very accurate test, especially for texts intended for adults.',
  },
  {
    question: 'What does the grade level mean?',
    answer: 'The SMOG grade directly corresponds to the U.S. school grade level. A SMOG grade of 8 means the text is suitable for an average 8th grader. A grade of 12 corresponds to a high school senior reading level. For materials intended for the general public, a SMOG grade of 8 or lower is often recommended.',
  },
  {
    question: 'Why does it require 30 sentences?',
    answer: 'The formula was developed and validated using a sample size of 30 sentences (10 from the beginning, middle, and end of a text). Using this specific number is crucial for the statistical accuracy of the formula. This tool analyzes all sentences but will flag if the total count is below the 30-sentence threshold needed for a reliable score.',
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

const SmogReadabilityFaq: React.FC = () => {
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

export default SmogReadabilityFaq;