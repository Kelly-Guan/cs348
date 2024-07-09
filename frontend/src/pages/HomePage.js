import React, { useState, useEffect } from "react";
import Content from "../components/Content";
import GenreDropdown from "../components/genreDropDown";
const genres = ["Comedy", "Horror", "Drama", "Romance", "Action", "Sci-Fi"]; // Add more genres as needed

function Home() {
  const [selectedGenre, setSelectedGenre] = useState("Genres");
  const [actionRatings, setActionRatings] = useState([]);
  const [romanceRatings, setRomanceRatings] = useState([]);
  const [comedyRatings, setComedyRatings] = useState([]);

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
    const fetchRatings = async () => {
      try {
        const action_res = await fetch(
          "http://localhost:3001/api/ratings/ratingsByGenre/Action"
        );
        const romance_res = await fetch(
          "http://localhost:3001/api/ratings/ratingsByGenre/Romance"
        );
        const comedy_res = await fetch(
          "http://localhost:3001/api/ratings/ratingsByGenre/Comedy"
        );

        if (!action_res.ok || !romance_res.ok || !comedy_res.ok) {
          throw new Error(`HTTP error! Status: retreiving ratings`);
        }
        const action_data = await action_res.json();
        const romance_data = await romance_res.json();
        const comedy_data = await comedy_res.json();

        const updated_action = await Promise.all(
          action_data.map(async (r) => ({
            ...r,
            poster_link: await checkImageURL(
              `https://image.tmdb.org/t/p/w500${r.poster_link}`,
              "https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg"
            ),
          }))
        );
        const updated_romance = await Promise.all(
          romance_data.map(async (r) => ({
            ...r,
            poster_link: await checkImageURL(
              `https://image.tmdb.org/t/p/w500${r.poster_link}`,
              "https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg"
            ),
          }))
        );
        const updated_comedy = await Promise.all(
          comedy_data.map(async (r) => ({
            ...r,
            poster_link: await checkImageURL(
              `https://image.tmdb.org/t/p/w500${r.poster_link}`,
              "https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg"
            ),
          }))
        );

        setActionRatings(updated_action);
        setComedyRatings(updated_comedy);
        setRomanceRatings(updated_romance);
      } catch (err) {
        console.error("Fetch error:", err);
        setActionRatings([]);
        setComedyRatings([]);
        setRomanceRatings([]);
      }
    };

    fetchRatings();
  }, []);

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
  };

  return (
    <div className="w-5/6 ml-auto p-12">
      <div className="flex flex-col justify-start">
        <div className="w-1/4 flex flex-row items-center mb-8">
          <h3 className="text-4xl font-bold pr-10 ">Home</h3>
          <GenreDropdown genres={genres} onSelect={handleGenreSelect} />
        </div>

        <div className="mb-20">
          <h3 className="text-2xl font-bold mb-4">Action</h3>
          <div className="flex flex-row overflow-x-auto space-x-4 no-scrollbar overflow-y-auto">
            {actionRatings.map((r, i) => (
              <Content
                key={i}
                title={r.title}
                description={r.rating_text}
                profileName={r.username}
                imageURL={"https://image.tmdb.org/t/p/w500" + r.poster_link}
                timePosted={r.date_posted.split("T")[0]}
              />
            ))}
          </div>
        </div>

        <div className="mb-20">
          <h3 className="text-2xl font-bold mb-4">Comedy</h3>
          <div className="flex flex-row overflow-x-auto space-x-4 no-scrollbar overflow-y-auto">
            {comedyRatings.map((r, i) => (
              <Content
                key={i}
                title={r.title}
                description={r.rating_text}
                profileName={r.username}
                imageURL={"https://image.tmdb.org/t/p/w500" + r.poster_link}
                timePosted={r.date_posted.split("T")[0]}
              />
            ))}
          </div>
        </div>

        <div className="mb-20">
          <h3 className="text-2xl font-bold mb-4">Romance</h3>
          <div className="flex flex-row overflow-x-auto space-x-4 no-scrollbar overflow-y-auto">
            {romanceRatings.map((r, i) => (
              <Content
                key={i}
                title={r.title}
                description={r.rating_text}
                profileName={r.username}
                imageURL={"https://image.tmdb.org/t/p/w500" + r.poster_link}
                timePosted={r.date_posted.split("T")[0]}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
