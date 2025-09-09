import React, { useState } from 'react';

const faqData = [
  {
    question: 'What is a Syllable Counter?',
    answer: 'A syllable counter is a tool that estimates the number of syllables in a given piece of text. It analyzes each word and applies a set of linguistic rules to determine how many syllables it contains, then adds them all up to give you a total count.',
  },
  {
    question: 'How does this tool count syllables?',
    answer: 'Counting syllables in English can be complex due to its many exceptions. This tool uses a rule-based (heuristic) algorithm. It counts vowel groups in each word to estimate the syllable count. While this method is accurate for most common English words, it may not be perfect for every single word, especially unusual names or technical terms. Think of it as a very good estimation.',
  },
  {
    question: 'Why would I need to count syllables?',
    answer: (
      <>
        <p>Syllable counting is important in various fields:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li><strong>Poetry and Songwriting:</strong> Writers use syllable counts to create rhythm and meter, such as in haikus (which follow a 5-7-5 syllable structure), sonnets, and other poetic forms.</li>
          <li><strong>Education:</strong> Teachers and students use syllable counts to help with reading development, pronunciation, and understanding word structure.</li>
          <li><strong>Readability:</strong> The number of syllables in words is a key factor in readability formulas (like the Flesch-Kincaid score). Fewer syllables per word generally makes text easier to read.</li>
          <li><strong>Public Speaking:</strong> Speakers can analyze their scripts to control pacing and rhythm, making their speeches more engaging and easier to follow.</li>
        </ul>
      </>
    ),
  },
  {
    question: 'Is the syllable count always 100% accurate?',
    answer: 'Because of the irregularities and numerous exceptions in the English language, no automated syllable counter can be 100% accurate for all words. This tool provides a highly reliable estimate that is suitable for most applications, like checking a poem\'s structure or assessing readability. For academic or highly technical purposes, manual verification of key words may be necessary.',
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

const SyllableCounterFaq: React.FC = () => {
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

export default SyllableCounterFaq;
