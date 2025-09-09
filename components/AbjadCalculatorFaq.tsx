import React, { useState } from 'react';

const faqData = [
  {
    question: 'What is the Abjad Calculator?',
    answer: 'The Abjad Calculator is a tool that computes the numerical value of Arabic text based on the Abjad numeral system. This ancient system assigns a specific numerical value to each letter of the Arabic alphabet.',
  },
  {
    question: 'How does it work?',
    answer: 'Simply type or paste Arabic text into the input box. The calculator will instantly analyze the text, sum the values of each letter according to the Abjad system, and display the total. It also provides a detailed breakdown showing the value of each individual character.',
  },
  {
    question: 'What are the Abjad numerals?',
    answer: (
      <>
        <p>The standard (Eastern) Abjad system assigns numerical values to the 28 letters of the Arabic alphabet in a specific order. The values are:</p>
        <ul className="list-disc list-inside mt-2 space-y-1 columns-2 sm:columns-3">
          <li><strong>ا:</strong> 1</li>
          <li><strong>ب:</strong> 2</li>
          <li><strong>ج:</strong> 3</li>
          <li><strong>د:</strong> 4</li>
          <li><strong>ه:</strong> 5</li>
          <li><strong>و:</strong> 6</li>
          <li><strong>ز:</strong> 7</li>
          <li><strong>ح:</strong> 8</li>
          <li><strong>ط:</strong> 9</li>
          <li><strong>ي:</strong> 10</li>
          <li><strong>ك:</strong> 20</li>
          <li><strong>ل:</strong> 30</li>
          <li><strong>م:</strong> 40</li>
          <li><strong>ن:</strong> 50</li>
          <li><strong>س:</strong> 60</li>
          <li><strong>ع:</strong> 70</li>
          <li><strong>ف:</strong> 80</li>
          <li><strong>ص:</strong> 90</li>
          <li><strong>ق:</strong> 100</li>
          <li><strong>ر:</strong> 200</li>
          <li><strong>ش:</strong> 300</li>
          <li><strong>ت:</strong> 400</li>
          <li><strong>ث:</strong> 500</li>
          <li><strong>خ:</strong> 600</li>
          <li><strong>ذ:</strong> 700</li>
          <li><strong>ض:</strong> 800</li>
          <li><strong>ظ:</strong> 900</li>
          <li><strong>غ:</strong> 1000</li>
        </ul>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Note: This calculator ignores non-Arabic characters, spaces, and punctuation.</p>
      </>
    ),
  },
  {
    question: 'What is the Abjad system used for?',
    answer: 'Historically, the Abjad system was used for numerical purposes before the adoption of Hindu-Arabic numerals. Today, it is used in various cultural and esoteric contexts, including numerology (Ilm al-Jafr), for creating chronograms (where the letters of a phrase add up to a specific year), and in various forms of talismanic art and literature.',
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

const AbjadCalculatorFaq: React.FC = () => {
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

export default AbjadCalculatorFaq;