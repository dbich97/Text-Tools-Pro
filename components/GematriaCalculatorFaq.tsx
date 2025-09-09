import React, { useState } from 'react';

const faqData = [
  {
    question: 'What is a Gematria Calculator?',
    answer: 'A Gematria Calculator is a tool that computes the numerical value of a word or phrase by summing the values of its letters. Gematria is an ancient practice, most commonly associated with Hebrew and Greek, where letters are assigned specific numerical values.',
  },
  {
    question: 'How does this calculator work?',
    answer: 'First, select the Gematria system you want to use from the dropdown menu. Then, type your text into the input box. The tool will instantly calculate the total value based on the chosen system and provide a detailed, letter-by-letter breakdown of the calculation. It automatically ignores spaces, punctuation, and any characters not part of the selected system\'s alphabet.',
  },
  {
    question: 'What are the different Gematria systems?',
    answer: (
      <>
        <p>This tool supports several different systems:</p>
        <ul className="list-disc list-inside mt-2 space-y-3">
          <li>
            <strong>English Simple (Ordinal):</strong> The most straightforward method, where letters are assigned values based on their alphabetical order (A=1, B=2, C=3, ..., Z=26).
          </li>
          <li>
            <strong>Transliterated Hebrew:</strong> This system uses English letters to represent the sounds and numerical values of the Hebrew alphabet. For example, "sh" represents Shin (ש), which has a value of 300. It's useful for finding the Gematria of non-Hebrew words using the Hebrew system.
          </li>
          <li>
            <strong>English Qaballa (ALW):</strong> A modern system (also known as the New Aeon English Qabalah or NAEQ) where the 26 letters are assigned values based on a specific mystical order (A=1, L=2, W=3, etc.).
          </li>
           <li>
            <strong>Hebrew:</strong> The traditional Hebrew Gematria, where each of the 22 letters of the Hebrew alphabet has a specific value (Aleph=1, Bet=2, ..., Tav=400). This tool recognizes final letter forms (Sofit) as well.
          </li>
           <li>
            <strong>Greek (Isopsephy):</strong> The ancient Greek practice of assigning numerical values to the letters of their alphabet (Alpha=1, Beta=2, ..., Omega=800).
          </li>
        </ul>
      </>
    ),
  },
  {
    question: 'What is Gematria used for?',
    answer: 'Gematria is a form of numerology. Practitioners believe that words or phrases with the same numerical value have a special relationship or share a common meaning. It has been used for centuries in the interpretation of religious texts (like the Hebrew Kabbalah and the Bible), for finding hidden meanings in literature, and for various esoteric and divinatory practices.',
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

const GematriaCalculatorFaq: React.FC = () => {
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

export default GematriaCalculatorFaq;
