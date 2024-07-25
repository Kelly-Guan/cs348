import React, { useState } from "react";
import { Search } from 'lucide-react';

function SearchBar({onReturn, name}) {
  if(name == null){
    name = "Movie Search";
  }
  
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEnter = (event) => {
    if(event.key === 'Enter'){
      onReturn(searchTerm);
    }
  }

  return (
    <div className="flex items-center rounded-md border-2 border-gray-100">
      <Search size={20} className="mx-2 text-gray-300" />
      <input
        type="text"
        className="w-full px-4 py-2 rounded-md focus:outline-none"
        placeholder={name}
        value={searchTerm}
        onChange={handleChange}
        onKeyDown={handleEnter}
      />
    </div>
  );
}

export default SearchBar;