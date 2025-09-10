import React, { useState } from 'react';

const faqData = [
  {
    question: 'How to Create Fancy Text',
    answer: 'You can create fancy text with Font Changer Online. All you have to do is write the text you want to look stylish or cool in the box above. You can use any characters you want while typing your text. Finally, you can press the copy icon next to the font styles to copy the font you like.',
  },
  {
    question: 'What Is Font Changer Online?',
    answer: 'Font Changer Online is a tool that allows you to write stylish text on Instagram, X, WhatsApp, Facebook, and Discord. Apart from these platforms, you can use this tool as a cool nickname generator. You can make your nickname more interesting in games such as PUBG, CS:GO, and produce beautiful nicknames in 2025 with different fonts.',
  },
  {
    question: 'How Does Font Changer Work?',
    answer: 'Although the number of characters on your keyboard is limited, computers and phones can recognize tens of thousands of characters. Computers that supported only 128 characters(ASCII) in the past can now support and detect many characters thanks to Unicode. Additionally, every year the Unicode standard expands with more characters, symbols, and emojis, making many new characters, from country flags to various icons, understandable by all computers. The Font Generator Tool allows you to write fancy text that you can use on platforms such as WhatsApp, Instagram, and many online games by using symbols that are not on the keyboard. It replaces each letter you enter with text symbols.',
  },
  {
    question: 'Common Uses for Special Characters',
    answer: (
      <>
        <p>You can use special characters to:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Create stylish texts on Instagram.</li>
          <li>Write cursive letters to copy and paste into your posts.</li>
          <li>Generate unique fonts for your nicknames in games.</li>
          <li>Send unique messages on WhatsApp and other messaging apps.</li>
        </ul>
      </>
    ),
  },
  {
    question: 'Examples of Special Characters',
    answer: (
        <>
            <p>Here are some examples of how you can use special characters:</p>
            <div className="mt-2 space-y-2 p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
                <p className="font-mono text-lg break-words">🄲🄷🄰🅁🄰🄲🅃🄴🅁🅂 🅂🄿🄴🄲🄸🄰🄻</p>
                <p className="font-mono text-lg break-words">𝓢𝓽𝔂𝓵𝓲𝓼𝓱 𝓣𝓮𝔁𝓽</p>
                <p className="font-mono text-lg break-words">𝐀𝐞𝐬𝐭𝐡𝐞𝐭𝐢𝐜 𝐅𝐨𝐧𝐭𝐬</p>
            </div>
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

const FancyTextFaq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mt-12 w-full mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
        About the Fancy Text Generator
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

export default FancyTextFaq;
