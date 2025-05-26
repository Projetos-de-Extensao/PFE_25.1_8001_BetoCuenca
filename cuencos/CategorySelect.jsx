import React from 'react';
import { eventCategories } from '../../lib/constants';

const CategorySelect = ({ value, onChange, error }) => {
  return (
    <div className="relative">
      <select 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full p-3 rounded-md bg-gray-900 border ${error ? 'border-red-500' : 'border-gray-700'} text-white appearance-none pr-10`}
      >
        <option value="" disabled>Escolha uma categoria</option>
        {eventCategories.map(category => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );
};

export default CategorySelect;
