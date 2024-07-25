import React, { useState } from "react";
import { UserSearch } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function SearchBar({ name }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  if (name == null) {
    name = "Username";
  }

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEnter = (event) => {
    if (event.key === 'Enter') {
      const fetchUid = async (username) => {
        try {
          const res = await fetch(`http://localhost:3001/api/users/search/${username}`);
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          const data = await res.json();
          if (data.length > 0) {
            const uid = data[0].uid;
            navigate(`/user/${uid}`);
          } else {
            setError("User not found");
          }
        } catch (err) {
          console.error("Fetch error:", err);
          setError("User not found");
        }
      };
      fetchUid(searchTerm);
    }
  };

  return (
    <div>
      <div className="flex items-center rounded-md border-2 border-gray-100">
        <UserSearch size={20} className="mx-2 text-gray-300" />
        <input
          type="text"
          className="w-full px-4 py-2 rounded-md focus:outline-none"
          placeholder={name}
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={handleEnter}
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

export default SearchBar;
