import React, { useState, useEffect } from "react";
import Content from "../components/Content";
import GenreDropdown from "../components/genreDropDown";
const genres = ["Comedy", "Horror", "Drama", "Romance", "Action", "Sci-Fi"]; // Add more genres as needed

function ExplorePage() {
  const [selectedGenre, setSelectedGenre] = useState("Genres");
  const [ratings, setRatings] = useState([]);

  const checkImageURL = async (url, defaultURL) => {
    try {
      const response = await fetch(url);
      if (response.status === 200) {
        return url;
      } else {
        return defaultURL;
      }
    } catch (error) {
      return defaultURL;
    }
  };

  useEffect(() => {
    const fetchRatings = async (genre) => {
      try {
        const res = await fetch(`http://localhost:3001/api/ratings/ratingsByGenre/${genre}`);
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        const updatedData = await Promise.all(
          data.map(async (r) => ({
            ...r,
            poster_link: await checkImageURL(
              `https://image.tmdb.org/t/p/w500${r.poster_link}`,
              "https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg"
            ),
          }))
        );
        setRatings(updatedData);
      } catch (err) {
        console.error("Fetch error:", err);
        setRatings([]);
      }
    };

    if (selectedGenre !== "Genres") {
      fetchRatings(selectedGenre);
    }
  }, [selectedGenre]);

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
  };

  return (
    <div className="w-5/6 ml-auto p-12">
      <div className="flex flex-col justify-start">
        <div className="w-1/4 flex flex-row items-center mb-8">
          <h3 className="text-4xl font-bold pr-10 ">Explore</h3>
          <GenreDropdown genres={genres} onSelect={handleGenreSelect} />
        </div>

        {selectedGenre !== "Genres" && (
          <div className="mb-20">
            <h3 className="text-2xl font-bold mb-4">{selectedGenre}</h3>
            <div className="flex flex-row overflow-x-auto space-x-4 no-scrollbar overflow-y-auto">
              {ratings.map((r, i) => (
                <Content
                  key={i}
                  title={r.title}
                  description={r.rating_text}
                  profileName={r.username}
                  imageURL={r.poster_link}
                  timePosted={r.date_posted.split("T")[0]}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ExplorePage;
