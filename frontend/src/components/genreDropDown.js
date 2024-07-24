import React, { useState } from 'react';

const GenreDropdown = ({ name, genres, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState(name);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (genre) => {
    setSelectedGenre(genre === 'None' ? '' : genre);
    setIsOpen(false);
    onSelect(genre === 'None' ? '' : genre);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md shadow-sm px-4 py-2 bg-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none"
          onClick={toggleDropdown}
        >
          {selectedGenre || name}
          <svg
            className="ml-2 -mr-1 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {/* <button
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              onClick={() => handleSelect('None')}
            >
              None
            </button> */}
            {genres.map((genre) => (
              <button
                key={genre}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                onClick={() => handleSelect(genre)}
              >
                {genre}
              </button>
            ))}
            <button
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              onClick={() => handleSelect('None')}
            >
              None
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenreDropdown;
