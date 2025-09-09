import React, { useState } from 'react';

const faqData = [
  {
    question: 'What is a Word Counter?',
    answer: 'A Word Counter is a simple online tool that counts the number of words in a given text. It\'s an essential utility for writers, students, marketers, and anyone who needs to meet specific length requirements or wants to analyze their text.',
  },
  {
    question: 'How do I use the Word Counter?',
    answer: 'Just start typing or paste your text into the text box above. The tool will instantly count the words and display the total in real-time. It also provides additional useful stats like the character, sentence, and paragraph counts.',
  },
    {
    question: 'How does the tool count words?',
    answer: 'The tool counts words by splitting the text based on spaces and other whitespace characters. Any sequence of characters separated by a space or a line break is generally considered a single word. This is the standard method used by most word processing software.',
  },
  {
    question: 'Why is word count important?',
    answer: (
      <>
        <p>Word count is a critical metric in many contexts:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li><strong>Academic Writing:</strong> Essays, reports, and research papers often have strict word count limits or minimums set by professors and institutions.</li>
          <li><strong>SEO and Content Marketing:</strong> The length of an article can impact its search engine ranking. Longer, in-depth articles often perform better, but conciseness is also key. This tool helps you hit your content goals.</li>
          <li><strong>Social Media:</strong> Platforms like X and Bluesky have character, not word, limits, but knowing your word count helps you write more concisely to fit within those limits.</li>
          <li><strong>Professional Writing:</strong> Journalists, copywriters, and authors work with specific word counts to fit layouts in magazines, newspapers, and books.</li>
        </ul>
      </>
    ),
  },
  {
    question: 'Does this tool also count characters?',
    answer: 'Yes! While the main focus is on words, this tool also provides a full analysis, including the number of characters, sentences, and paragraphs. For an even more detailed character analysis, you can use our dedicated "Character Counter" tool.',
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

const WordCounterFaq: React.FC = () => {
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

export default WordCounterFaq;