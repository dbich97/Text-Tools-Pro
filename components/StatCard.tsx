import React from 'react';

interface StatCardProps {
  label: string;
  value: number | string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-center border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20">
      <p className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
        {typeof value === 'number' ? value.toLocaleString() : value}
      </p>
      <p className="text-sm md:text-md text-gray-500 dark:text-gray-400 mt-2 capitalize">
        {label}
      </p>
    </div>
  );
};

export default StatCard;
