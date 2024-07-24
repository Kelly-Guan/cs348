import React, { useState } from "react";
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function userSearch({ name }) {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  if (name == null) {
    name = "Movie";
  }

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEnter = (event) => {
    if (event.key === 'Enter') {
      navigate(`/user/${searchTerm}`);
    }
  };

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

export default userSearch;
