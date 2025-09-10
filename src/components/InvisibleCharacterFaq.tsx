import React, { useState } from 'react';

const faqData = [
  {
    question: 'What are invisible characters?',
    answer: 'Invisible characters are special symbols in Unicode that do not have a visual representation like letters or numbers. This tool provides several different types, such as the "Braille Pattern Blank" (U+2800) and "Zero-Width Space" (U+200B). Although they appear as blank spaces, they are distinct from the regular space character on your keyboard.',
  },
  {
    question: 'How do I use them?',
    answer: 'It\'s simple! Just find the invisible character you want to use from the list above and click the "Copy" button. This copies the character to your clipboard. Then, you can paste it (Ctrl+V or Command+V) into any text field.',
  },
  {
    question: 'How do I test the characters?',
    answer: 'Use the "Test & Copy Invisible Character" area at the top of the tool. You can type your own text and then click on any of the character cards below to insert them directly into your text where your cursor is. This allows you to experiment and see how they behave before copying the final result.'
  },
  {
    question: 'How do I generate many invisible characters at once?',
    answer: 'Use the "Generate Unlimited Invisible Characters" section. First, choose the type of invisible character you want from the dropdown menu. Next, enter the number of characters you need in the "Count" box. Finally, click "Generate & Copy" to put the entire string of invisible characters on your clipboard, ready to paste.'
  },
  {
    question: 'What\'s the difference between these characters?',
    answer: 'Different platforms and apps handle these special characters in unique ways. Some, like "Braille Pattern Blank" or "Hangul Filler", create a wide space. Others, like "Zero-Width Space", have no width at all and are useful for different purposes. If one character doesn\'t work for your needs (e.g., a website removes it), try another one from the list!',
  },
  {
    question: 'What are the common uses?',
    answer: (
      <>
        <p>Invisible characters are great for a variety of creative uses online:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Sending "blank" or "empty" messages on messaging apps like WhatsApp, Telegram, or Discord.</li>
          <li>Creating usernames or profile names on social media that appear to be empty or have unique spacing.</li>
          <li>Bypassing character requirements in forms that don\'t allow empty fields but where you don\'t want to enter text.</li>
          <li>Centering text or creating layouts in bios on platforms like Instagram.</li>
        </ul>
      </>
    ),
  },
  {
    question: 'Will they work everywhere?',
    answer: 'While they work on many modern platforms and apps, it\'s not guaranteed. Some websites might automatically remove or "strip" these characters from your input. That\'s why we provide multiple options—if one doesn\'t work on a platform, another one might!',
  },
  {
    question: 'Are these the same as a regular space?',
    answer: 'No, they are all different. A regular space (from your spacebar) has a defined width and is a simple character. The invisible characters here are special Unicode symbols. Their differences are what allow them to work in places where regular spaces might be disallowed, trimmed, or collapsed.',
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

const InvisibleCharacterFaq: React.FC = () => {
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

export default InvisibleCharacterFaq;