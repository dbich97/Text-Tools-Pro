import React, { useState } from 'react';

const faqData = [
  {
    question: 'What is the Gunning Fog Index?',
    answer: 'The Gunning Fog Index is a readability test for English writing. Developed by Robert Gunning, it estimates the years of formal education a person needs to understand a piece of text on the first reading. The score corresponds to a U.S. grade level, making it easy to interpret.',
  },
  {
    question: 'How is the score calculated?',
    answer: 'The Gunning Fog formula calculates a grade level based on two factors: the average sentence length and the percentage of "complex" words. A complex word, in this context, is any word with three or more syllables. The formula essentially penalizes long sentences and the overuse of complex words.',
  },
  {
    question: 'What is a "complex word"?',
    answer: 'For the Gunning Fog Index, a "complex word" is defined simply as a word containing three or more syllables. The formula does not count proper nouns (like "California"), hyphenated words, or common suffixes (like -es, -ed, -ing) as complex, though this tool uses a general syllable count for simplicity.',
  },
  {
    question: 'What does the grade level score mean?',
    answer: (
      <>
        <p>The score indicates the U.S. school grade level needed to understand the text. A lower score means the text is more readable.</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li><strong>Score of 17:</strong> College graduate</li>
          <li><strong>Score of 12:</strong> High school senior</li>
          <li><strong>Score of 8:</strong> Eighth grader</li>
          <li><strong>Score of 6:</strong> Sixth grader</li>
        </ul>
        <p className="mt-2">For most business and public-facing documents, a Gunning Fog score of 12 or less is recommended to ensure the text is accessible to a wide audience.</p>
      </>
    ),
  },
  {
    question: 'Why does it need 100 words?',
    answer: 'The formula was designed to be used on text samples of around 100 words. Using a smaller sample size would not provide a statistically reliable measure of average sentence length or the percentage of complex words, leading to an inaccurate score. Therefore, a minimum text length is required.',
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

const GunningFogIndexFaq: React.FC = () => {
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

export default GunningFogIndexFaq;
