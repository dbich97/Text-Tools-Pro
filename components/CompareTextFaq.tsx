import React, { useState } from 'react';

const faqData = [
  {
    question: 'What Is the Text Compare Tool?',
    answer: 'The Text Compare tool is an online utility that helps you find the differences between two pieces of text. It highlights the parts that have been added, removed, or changed, making it easy to track revisions and see modifications at a glance.',
  },
  {
    question: 'How do I use it?',
    answer: 'It\'s simple. Paste your original text into the "Original Text" box on the left, and paste the new or modified version into the "Changed Text" box on the right. The tool will automatically compare the two texts and display a detailed, color-coded result in the "Differences" area below.',
  },
  {
    question: 'What do the colors mean in the result?',
    answer: (
      <>
        <p>The colors are designed to make the changes easy to spot:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li><strong className="text-green-600 dark:text-green-400">Green highlight:</strong> Indicates text that has been added to the new version.</li>
          <li><strong className="text-red-600 dark:text-red-400">Red highlight with a strikethrough:</strong> Indicates text that has been removed from the original version.</li>
          <li><strong>No highlight:</strong> Text that is unchanged and appears in both versions.</li>
        </ul>
      </>
    ),
  },
  {
    question: 'Who is this tool for?',
    answer: 'This tool is useful for anyone who needs to compare text versions. This includes software developers comparing code, writers and editors reviewing revisions, translators checking their work against a source text, and students or teachers comparing different drafts of an essay.',
  },
  {
    question: 'Is my data safe and private?',
    answer: 'Yes. Your privacy is a priority. All text comparison is performed entirely within your web browser. Your text is never sent to or stored on our servers, ensuring your data remains completely private and secure.',
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

const CompareTextFaq: React.FC = () => {
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

export default CompareTextFaq;