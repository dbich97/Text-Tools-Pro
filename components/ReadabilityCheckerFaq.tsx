import React, { useState } from 'react';

const faqData = [
  {
    question: 'What is a Readability Checker?',
    answer: 'A readability checker is a tool that analyzes written text to determine how easy it is to understand. It uses linguistic formulas to score the text based on factors like sentence length and word complexity (often measured by syllables). The goal is to help you write content that is clear and accessible to your target audience.',
  },
  {
    question: 'What is the Flesch-Kincaid Reading Ease Score?',
    answer: 'This is one of the most common and reliable readability formulas. It rates text on a 100-point scale. The higher the score, the easier it is to understand the text. For example, a score of 90-100 means the text is very easy to read and understandable by an average 11-year-old, while a score of 0-30 is very difficult and best understood by university graduates.',
  },
  {
    question: 'How is the score calculated?',
    answer: 'The Flesch-Kincaid formula is based on two main factors: the average number of words per sentence (ASL) and the average number of syllables per word (ASW). Shorter sentences and words with fewer syllables result in a higher, more readable score. Longer, more complex sentences and multi-syllable words lower the score, indicating greater difficulty.',
  },
  {
    question: 'Why is readability important?',
    answer: 'Readability is crucial for effective communication. If your text is too difficult, readers may lose interest, become confused, or miss your key message. Good readability ensures your audience can quickly and easily understand what you\'re saying. This is vital for website content, marketing materials, technical documents, and educational content.',
  },
  {
    question: 'How can I improve my readability score?',
    answer: (
      <>
        <p>Improving your score means making your text clearer and simpler. Here are some tips:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li><strong>Use shorter sentences.</strong> Break up long, complex sentences into smaller, more digestible ones.</li>
          <li><strong>Choose simpler words.</strong> Opt for common, everyday words over complex jargon or multi-syllable terms whenever possible.</li>
          <li><strong>Write in an active voice.</strong> The active voice is generally more direct and easier to understand than the passive voice.</li>
          <li><strong>Avoid unnecessary words.</strong> Be concise and to the point. Remove filler words that don't add value.</li>
          <li><strong>Address the reader directly.</strong> Using "you" can make the text more engaging and conversational.</li>
        </ul>
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

const ReadabilityCheckerFaq: React.FC = () => {
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

export default ReadabilityCheckerFaq;
