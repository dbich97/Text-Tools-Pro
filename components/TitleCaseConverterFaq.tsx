import React, { useState } from 'react';

const faqData = [
  {
    question: 'What is a Title Case Converter?',
    answer: 'A Title Case Converter is a tool that automatically formats your text into title case, which is the standard capitalization style used for the titles of books, articles, movies, and other works. It ensures your headlines and titles are professional and easy to read.',
  },
  {
    question: 'How do I use it?',
    answer: 'Simply type or paste the text you want to convert into the "Your Text" box on the left. The tool will instantly convert it to Title Case in the "Title Cased Text" box on the right. You can then use the "Copy" button to copy the result.',
  },
  {
    question: 'What are the rules for Title Case?',
    answer: (
      <>
        <p>This tool follows the common style guide rules for title case, which are generally:</p>
        <ul className="list-disc list-inside mt-2 space-y-2">
          <li><strong>Capitalize the first and last word.</strong> This applies regardless of what the word is.</li>
          <li><strong>Capitalize major words.</strong> Nouns, pronouns, verbs, adjectives, and adverbs are always capitalized.</li>
          <li><strong>Do not capitalize minor words.</strong> Short words like articles (a, an, the), short prepositions (of, to, in, on, for), and coordinating conjunctions (and, but, or) are kept in lowercase unless they are the first or last word.</li>
        </ul>
      </>
    ),
  },
  {
    question: 'Why is Title Case different from "Capitalized Case"?',
    answer: 'Simple "Capitalized Case" (or "Start Case") capitalizes the first letter of *every* word. Title Case is smarter; it follows grammatical rules to keep minor words lowercase, which improves the readability and flow of a title.',
  },
  {
    question: 'When should I use Title Case?',
    answer: 'Title Case is most appropriate for headlines, titles, and subheadings. Use it for blog post titles, article headlines, book titles, chapter names, and subject lines in emails to give them a polished, professional appearance.',
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

const TitleCaseConverterFaq: React.FC = () => {
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

export default TitleCaseConverterFaq;