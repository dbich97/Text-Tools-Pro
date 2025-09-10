import React, { useState } from 'react';

const faqData = [
  {
    question: 'What is the Font Changer?',
    answer: 'The Font Changer is an online tool designed for designers, developers, and content creators to preview text in various standard web-safe fonts. Unlike a fancy text generator that uses Unicode characters, this tool applies actual CSS font-family properties to your text, showing you exactly how it will render in a web browser or digital document.',
  },
  {
    question: 'How do I use the Font Changer?',
    answer: 'It\'s simple! First, type or paste your desired text into the input area. Next, choose a font from the organized dropdown list. The preview box below will instantly update to display your text in the selected font style. You can then use the copy buttons to grab your original text for use elsewhere.',
  },
  {
    question: 'Why is a font previewer useful?',
    answer: 'Typography is a critical element of design. A good font choice can improve readability, set a tone, and enhance user experience. This tool allows you to quickly test and compare different fonts without having to edit code or change settings in a design application. It helps you make better design decisions by visualizing how your text will look before you publish it.',
  },
  {
    question: 'What are web-safe fonts?',
    answer: 'Web-safe fonts are typefaces that are commonly pre-installed on the vast majority of computer operating systems, such as Windows, macOS, and Linux. Using these fonts ensures that your text will appear consistently for virtually all users, as their browsers do not need to download any special font files. This guarantees a uniform and reliable user experience across different devices.',
  },
    {
    question: 'Can I use these fonts on my website?',
    answer: (
      <>
        <p>Absolutely. All the fonts listed in this tool are considered web-safe and can be reliably used in your website's CSS. To use them, you would apply the <code className="bg-gray-200 dark:bg-gray-700 p-1 rounded-md text-sm">font-family</code> property.</p>
        <p className="mt-2">It is best practice to provide "fallback" fonts in case a user somehow doesn't have your first choice. For example:</p>
        <pre className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md mt-2 text-sm">
          <code>
            {`font-family: "Palatino Linotype", "Bookman", Palatino, serif;`}
          </code>
        </pre>
        <p className="mt-2">In this example, the browser will first try to use Palatino Linotype. If that's not available, it will try Bookman, then Palatino, and finally any default serif font.</p>
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

const FontChangerFaq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mt-12 w-full mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
        About the Font Changer
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

export default FontChangerFaq;
