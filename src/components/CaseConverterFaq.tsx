import React, { useState } from 'react';

const faqData = [
  {
    question: 'What Is a Case Converter?',
    answer: 'A Case Converter is a simple online tool that allows you to change the text case of your content. You can paste any text you want to convert, and it will be instantly transformed into your desired case, such as uppercase, lowercase, sentence case, or capitalized case.',
  },
  {
    question: 'How to Use the Case Converter?',
    answer: 'Simply type or paste your text into the input box. Then, click on one of the buttons for the case you want to convert it to. The text in the box will be updated instantly. You can then copy the converted text using the "Copy Text" button.',
  },
  {
    question: 'What are the different case types?',
    answer: (
      <>
        <p>This tool offers several common case types:</p>
        <ul className="list-disc list-inside mt-2 space-y-2">
          <li><strong>Sentence case:</strong> This is the standard capitalization for sentences, where the first letter of each sentence is capitalized. It's ideal for writing and editing paragraphs.</li>
          <li><strong>lower case:</strong> This converts every letter in the text to its lowercase form. It's often used for passwords, product IDs, or when you want a uniform, non-hierarchical look.</li>
          <li><strong>UPPER CASE:</strong> This converts every letter to its uppercase form. It's great for headlines, titles, or to add emphasis, but should be used sparingly as it can be hard to read.</li>
          <li><strong>Capitalized Case:</strong> This style capitalizes the first letter of every word, regardless of the word. It's a simple way to format titles when specific capitalization rules aren't necessary.</li>
          <li><strong>Title Case:</strong> This is a smarter version of Capitalized Case, often used for headlines. It also capitalizes the first letter of most words, but it keeps small words (like 'a', 'or', and 'in') in lowercase for better readability, following standard title capitalization rules.</li>
          <li><strong>aLtErNaTiNg cAsE:</strong> This style alternates between lowercase and uppercase letters, often used for stylistic or ironic effect on social media.</li>
          <li><strong>InVeRsE CaSe:</strong> This swaps the case of every letter—uppercase becomes lowercase, and vice versa. It's another stylistic choice for creating unique-looking text.</li>
        </ul>
      </>
    ),
  },
  {
    question: 'Why is text case important?',
    answer: 'Text case plays a crucial role in readability, tone, and professionalism. Proper capitalization (like Sentence case) makes text easier to read and understand. In contrast, using all uppercase can convey shouting or urgency, while all lowercase can feel informal or stylistic. Using the correct case is essential for clear communication.',
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

const CaseConverterFaq: React.FC = () => {
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

export default CaseConverterFaq;