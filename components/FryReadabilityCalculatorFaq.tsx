import React, { useState } from 'react';

const faqData = [
  {
    question: 'What is the Fry Readability Calculator?',
    answer: 'The Fry Readability Calculator is a tool based on the Fry Readability Graph, a popular method for assessing the reading level of a text. Developed by Edward Fry, it determines a U.S. grade level by graphically plotting the sentence length and word complexity.',
  },
  {
    question: 'How is the score calculated?',
    answer: 'The original Fry method is manual. You take 100-word samples, count the sentences and syllables, and plot those averages on a specific graph. This tool automates that process by analyzing your entire text to find the average sentences and syllables per 100 words. It then plots this point for you on the digital graph shown above. The curved region where the point lands determines the grade level.',
  },
  {
    question: 'What do the two main metrics mean?',
    answer: (
      <>
        <p>The calculation is based on two factors which correspond to the axes on the graph:</p>
        <ul className="list-disc list-inside mt-2 space-y-2">
          <li><strong>Sentences per 100 Words (Y-Axis):</strong> A higher number means shorter sentences, which are generally easier to read. This is the vertical axis on the graph.</li>
          <li><strong>Syllables per 100 Words (X-Axis):</strong> A lower number means the words are shorter and simpler, which are also easier to read. This is the horizontal axis.</li>
        </ul>
        <p className="mt-2">The tool finds the intersection of these two values to determine the grade level.</p>
      </>
    ),
  },
  {
    question: 'How does this differ from Flesch-Kincaid?',
    answer: 'While both tests use sentence length and syllable counts, their formulas are different. Flesch-Kincaid uses a specific algebraic formula to arrive at a score. The Fry method uses a graphical plot, which this tool simulates. They often produce similar results, but the Fry Graph is sometimes preferred in educational settings for its visual and straightforward approach.',
  },
  {
    question: 'Why does it need 100 words?',
    answer: 'The Fry formula is calibrated based on 100-word samples. Analyzing a text with fewer than 100 words would not produce a statistically reliable result, so the tool requires a minimum amount of text to ensure the calculation is meaningful and accurate.',
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

const FryReadabilityCalculatorFaq: React.FC = () => {
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

export default FryReadabilityCalculatorFaq;