import React, { useState } from 'react';

const faqData = [
  {
    question: 'What Is the Character Calculator?',
    answer: 'The Character Calculator is an online character counter application, which is simple and free to use. This application does not count just the number of letters in a text. Instead, it counts the total number of all characters, including spaces. Besides counting characters, it also counts the total number of words, unique words, paragraphs, and sentences. On top of all that, it gives you reading and speech time estimates.',
  },
  {
    question: 'How Do You Use the Character Calculator?',
    answer: 'Just type out your text (or copy and paste) into the text box above. Then, the Character Calculator will show you the character count, with or without spaces, as well as the word count. The tool even calculates keyword density for you, so you can understand the distribution of your keywords.',
  },
  {
    question: 'Why Should You Use the Character Calculator?',
    answer: 'The Character Calculator allows you to count characters, both with and without spaces, including line breaks. If you are a content creator, it is a must have. Character count is super important when writing texts for social media, as the character limits tell you how much room you have to share your thoughts. Before creating Facebook posts or X tweets, you must always consider the character limits. Once your content is ready, run your text through a character counter to ensure your post is within limits. Additionally, for tasks like translation or editing, there may be cases where a text or document must stay within a certain number of characters. In such cases, character counts are important.',
  },
  {
    question: 'Maximum Characters Allowed',
    answer: (
      <>
        <p>Here are the character limits permitted on various platforms in 2025:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li><strong>Facebook status:</strong> 63,206 characters</li>
          <li><strong>Instagram caption:</strong> 2,200 characters</li>
          <li><strong>X tweet:</strong> 280 characters for normal users and up to 25,000 characters for premium users</li>
          <li><strong>Bluesky post:</strong> 300 characters</li>
          <li><strong>Pinterest board description:</strong> 500 characters</li>
          <li><strong>Reddit title:</strong> 300 characters</li>
          <li><strong>YouTube title:</strong> 100 characters</li>
          <li><strong>HTML title tag:</strong> Recommended up to 60 characters.</li>
        </ul>
      </>
    ),
  },
  {
    question: 'What Is the Difference Between Word Count and Character Count?',
    answer: 'Word count is the number of words in a text, while character count is the number of all characters in a text. If you want to learn how many characters are in a text, you need to count all the characters, including alphanumeric characters, special characters, and spaces.',
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

const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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

export default Faq;
