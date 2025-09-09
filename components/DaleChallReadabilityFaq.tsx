import React, { useState } from 'react';

const faqData = [
  {
    question: 'What is the Dale–Chall Readability Formula?',
    answer: 'The Dale–Chall readability formula is a well-respected test used to measure the readability of English text. It is considered one of the more accurate formulas, especially for higher grade levels, because it uses a list of about 3,000 "familiar" words that most 4th-grade students can understand.',
  },
  {
    question: 'How is the score calculated?',
    answer: 'Instead of counting syllables like many other formulas, Dale–Chall identifies "difficult" words—that is, any word that is NOT on its list of 3,000 familiar words. The final score is calculated based on two factors: the percentage of these difficult words and the average sentence length. A higher percentage of difficult words and longer sentences result in a higher score and grade level.',
  },
  {
    question: 'How does this differ from Flesch-Kincaid?',
    answer: 'The main difference is in how they measure word complexity. Flesch-Kincaid uses the number of syllables in a word as its primary measure of difficulty. Dale–Chall uses a predefined vocabulary list. Because of this, Dale–Chall can be more accurate at identifying words that are conceptually difficult, even if they have few syllables (e.g., "feud" or "pact").',
  },
  {
    question: 'What does the score and grade level mean?',
    answer: (
        <>
            <p>The final score is mapped to a corresponding U.S. grade level range. This indicates the level of education someone would likely need to easily understand the text. For example:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>A score of <strong>5.0 - 5.9</strong> corresponds to a <strong>5th-6th grade</strong> reading level.</li>
              <li>A score of <strong>9.0 - 9.9</strong> corresponds to a <strong>college (13th-15th grade)</strong> reading level.</li>
            </ul>
        </>
    ),
  },
  {
    question: 'Why does it need 100 words?',
    answer: 'The Dale–Chall formula, like many statistical readability tests, requires a sufficiently large sample of text to be accurate. A passage of at least 100 words is needed to get a reliable measure of both average sentence length and the percentage of difficult words.',
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

const DaleChallReadabilityFaq: React.FC = () => {
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

export default DaleChallReadabilityFaq;