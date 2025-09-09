
import React from 'react';

interface Keyword {
  text: string;
  count: number;
  density: string;
}

interface KeywordDensityProps {
  keywords: Keyword[];
}

const KeywordDensity: React.FC<KeywordDensityProps> = ({ keywords }) => {
  const containerClasses = "mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700";

  if (keywords.length === 0) {
    return (
      <div className={containerClasses}>
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
          Keyword Density
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Start typing to see a list of the most frequent keywords.
        </p>
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Top Keywords</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b dark:border-gray-600">
              <th className="p-2 text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Keyword</th>
              <th className="p-2 text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider text-right">Count</th>
              <th className="p-2 text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider text-right">Density</th>
            </tr>
          </thead>
          <tbody>
            {keywords.map((keyword) => (
              <tr key={keyword.text} className="border-b dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                <td className="p-2 font-medium text-gray-800 dark:text-gray-200 capitalize">{keyword.text}</td>
                <td className="p-2 text-gray-600 dark:text-gray-300 text-right font-mono">{keyword.count}</td>
                <td className="p-2 text-gray-600 dark:text-gray-300 text-right font-mono">{keyword.density}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default KeywordDensity;
