import React, { useState } from 'react';

const faqData = [
  {
    question: 'What is a Wingdings Translator?',
    answer: 'A Wingdings Translator is a tool that shows you what your text looks like when rendered in the Wingdings font. Wingdings is a symbolic typeface created by Microsoft that replaces standard letters and numbers with a variety of symbols, dingbats, and icons.',
  },
  {
    question: 'How does this translator work?',
    answer: 'This tool doesn\'t change the underlying characters of your text. Instead, it applies the Wingdings font to your input. So, the letter "H" is still an "H", but it is displayed as the Wingdings symbol for "H". Typing in either box will update the other in real-time, showing you the standard text and its symbolic representation side-by-side.',
  },
  {
    question: 'Can I copy and paste the Wingdings symbols?',
    answer: (
      <>
        <p>Yes, but there is a catch. When you copy the text from the Wingdings box, you are copying the standard letters (e.g., "H-e-l-l-o"). For the symbols to appear correctly when you paste them, the application you are pasting into (like a word processor or image editor) must also have the Wingdings font applied to that text.</p>
        <p className="mt-2">If you paste it into a place that uses a regular font (like a plain text editor or most websites), it will just appear as the original text you typed.</p>
      </>
    ),
  },
  {
    question: 'Why was Wingdings created?',
    answer: 'Wingdings was designed in the early 1990s as a simple way to include scalable icons and symbols in documents before modern standards like emoji were common. It provided a set of useful pictograms for printers and designers.',
  },
    {
    question: 'Example: "Hello World!"',
    answer: (
        <>
            <p>Here is what "Hello World!" looks like in Wingdings:</p>
            <div className="mt-2 p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
                <p className="text-3xl" style={{ fontFamily: 'Wingdings' }}>Hello World!</p>
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Note: For this to display correctly, your computer must have the Wingdings font installed, which is standard on Windows and many other operating systems.</p>
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

const WingdingsTranslatorFaq: React.FC = () => {
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

export default WingdingsTranslatorFaq;