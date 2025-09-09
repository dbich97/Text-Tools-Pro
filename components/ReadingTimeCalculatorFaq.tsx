import React, { useState } from 'react';

const faqData = [
  {
    question: 'What is a Reading Time Calculator?',
    answer: 'A Reading Time Calculator is a tool that estimates how long it will take an average person to read a piece of text. It\'s commonly used by bloggers, content creators, and marketers to give their audience an idea of the time commitment required for an article or post.',
  },
  {
    question: 'How is reading time calculated?',
    answer: 'The calculation is straightforward: the total number of words in the text is divided by the average reading speed in Words Per Minute (WPM). This tool then converts that result into minutes and seconds for a clear and understandable estimate.',
  },
  {
    question: 'What does WPM (Words Per Minute) mean?',
    answer: (
      <>
        <p>WPM stands for Words Per Minute, and it\'s a measure of reading speed. The average adult reading speed is around 200-250 WPM. However, this can vary significantly based on the reader and the complexity of the text. This tool defaults to 225 WPM but allows you to adjust it.</p>
        <div className="overflow-x-auto mt-4">
            <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 dark:bg-gray-700/50">
                    <tr className="border-b dark:border-gray-600">
                        <th className="p-2 font-semibold">Reader Type</th>
                        <th className="p-2 font-semibold">Approx. WPM</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b dark:border-gray-700"><td className="p-2">Slow Reader</td><td className="p-2">100 - 180</td></tr>
                    <tr className="border-b dark:border-gray-700"><td className="p-2">Average Reader</td><td className="p-2">180 - 250</td></tr>
                    <tr className="border-b dark:border-gray-700"><td className="p-2">Fast Reader</td><td className="p-2">250 - 350</td></tr>
                    <tr><td className="p-2">Speed Reader</td><td className="p-2">350+</td></tr>
                </tbody>
            </table>
        </div>
      </>
    ),
  },
  {
    question: 'Why is displaying reading time important?',
    answer: 'Displaying an estimated reading time (e.g., "5 min read") at the top of an article can improve user experience. It helps manage reader expectations and can increase engagement, as users are more likely to commit to reading a piece of content if they know how long it will take. It shows respect for the reader\'s time.',
  },
    {
    question: 'How can I use this information to improve my writing?',
    answer: 'Besides showing it to your readers, you can use the reading time as a self-editing tool. If the reading time for a simple blog post is over 10 minutes, it might be too long, and you could consider breaking it into multiple parts or trimming it down to be more concise. It helps you align your content length with your audience\'s typical attention span.',
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

const ReadingTimeCalculatorFaq: React.FC = () => {
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

export default ReadingTimeCalculatorFaq;