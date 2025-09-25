import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="flex gap-2 mb-6">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Search posts..."
        className="flex-1 px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        onClick={() => { setValue(''); onSearch(''); }}
        className="px-3 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-50"
      >
        Clear
      </button>
    </div>
  );
}

export default SearchBar;
