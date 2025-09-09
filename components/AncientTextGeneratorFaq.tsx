import React, { useState } from 'react';

const faqData = [
  {
    question: 'What is the Ancient Text Generator?',
    answer: 'The Ancient Text Generator is a fun tool that converts your modern text into styles that look like ancient scripts, such as Runic, Ogham, and Hieroglyphics. It uses special Unicode characters to create these styles, which you can then copy and paste into social media, games, or documents.',
  },
  {
    question: 'Is this a real translation?',
    answer: 'No, this is not a real translation. The tool performs a simple character-for-character substitution from the Latin alphabet (A-Z) to Unicode symbols that resemble ancient scripts. It does not understand grammar, context, or the actual rules of these ancient languages. It\'s for aesthetic and entertainment purposes only.',
  },
  {
    question: 'How does it work?',
    answer: 'Computers can display tens of thousands of characters thanks to the Unicode standard. This includes many symbols from historical scripts. This tool has a map for each style that links each letter of the alphabet to a corresponding ancient-looking symbol. When you type, it replaces the letters with these symbols to create the final text.',
  },
  {
    question: 'Can I use this text anywhere?',
    answer: 'You can copy and paste this text into most places that support Unicode characters, such as social media bios (X, Instagram, etc.), chat applications (Discord, WhatsApp), and online games. However, some websites or applications may not have the necessary fonts to display all the characters correctly, in which case you might see boxes (□) or question marks.',
  },
  {
    question: 'What are the different styles?',
    answer: (
      <>
        <p>This tool offers several styles based on historical scripts:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li><strong>Runic:</strong> Based on the Futhark alphabets used by ancient Germanic peoples.</li>
          <li><strong>Ogham:</strong> An early medieval Irish alphabet, characterized by its linear strokes.</li>
          <li><strong>Hieroglyphic:</strong> A selection of Egyptian hieroglyphs used to represent the alphabet.</li>
          <li><strong>Phoenician:</strong> Characters from an ancient script that is the ancestor of many modern alphabets, including Latin and Greek.</li>
        </ul>
      </>
    ),
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

const AncientTextGeneratorFaq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mt-12 w-full mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
        About the Ancient Text Generator
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

export default AncientTextGeneratorFaq;
