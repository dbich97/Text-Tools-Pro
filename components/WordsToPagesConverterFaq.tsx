import React, { useState } from 'react';

const faqData = [
  {
    question: 'What is a Words to Pages Converter?',
    answer: 'A Words to Pages Converter is a tool that estimates how many pages a certain number of words will occupy in a standard document. It\'s a helpful utility for students, writers, and professionals who need to meet specific page count requirements for essays, articles, or reports.',
  },
  {
    question: 'How do I use this tool?',
    answer: 'First, enter your total word count into the "Word Count" input field. Then, select your desired formatting options for font, font size, and line spacing. The tool will instantly calculate and display the estimated number of pages.',
  },
  {
    question: 'How is the page count calculated?',
    answer: 'The calculation is based on standard industry estimates for the number of words per page (WPP) for common document settings (like a standard 8.5" x 11" page with 1" margins). Different fonts, sizes, and spacing options all result in a different WPP, and this tool uses a database of these estimates to provide an accurate result.',
  },
  {
    question: 'Why is the result an estimate?',
    answer: (
      <>
        <p>This tool provides a very accurate estimate for a document containing only paragraphs of text. However, the final page count in a real-world document can be affected by many other factors, including:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Page margins</li>
          <li>Number of paragraphs (each new paragraph adds a little extra space)</li>
          <li>Use of headings and subheadings</li>
          <li>Inclusion of images, tables, or graphs</li>
          <li>Page numbers, headers, and footers</li>
        </ul>
        <p className="mt-2">For these reasons, you should always treat the result as a close approximation, not an exact final count.</p>
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

const WordsToPagesConverterFaq: React.FC = () => {
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

export default WordsToPagesConverterFaq;