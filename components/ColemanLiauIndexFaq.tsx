import React, { useState } from 'react';

const faqData = [
  {
    question: 'What is the Coleman-Liau Index?',
    answer: 'The Coleman-Liau Index is a readability test that measures how easy a piece of text is to understand. Developed by Meri Coleman and T. L. Liau, its main advantage is that it relies on character counts rather than syllable counts, which makes it much simpler and more efficient for computers to calculate.',
  },
  {
    question: 'How is the score calculated?',
    answer: 'The formula calculates a U.S. grade level score based on two main factors: the average number of letters per 100 words (L) and the average number of sentences per 100 words (S). The basic idea is that shorter words and shorter sentences are easier to read, which results in a lower grade-level score.',
  },
  {
    question: 'How is this different from the Flesch-Kincaid score?',
    answer: 'The biggest difference is what they measure for word complexity. Flesch-Kincaid (used in our "Readability Checker") counts syllables per word, which can be complex in English. Coleman-Liau counts letters per word. While both aim to measure readability, Coleman-Liau\'s method was designed to be more easily automated, as counting letters is more precise for a computer than estimating syllables.',
  },
  {
    question: 'What does the final score mean?',
    answer: 'The score you see is an approximation of the U.S. grade level required to comprehend the text. For example, a score of 8 means that an average 8th-grade student should be able to understand the text. A lower score indicates the text is easier to read.',
  },
    {
    question: 'Why would I use this index?',
    answer: 'Like other readability scores, the Coleman-Liau Index is valuable for writers, educators, and content creators who want to ensure their text is accessible to their intended audience. Because it\'s based on character count, it can sometimes be a more reliable indicator for texts with many technical words where syllable counters might struggle.',
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

const ColemanLiauIndexFaq: React.FC = () => {
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

export default ColemanLiauIndexFaq;
