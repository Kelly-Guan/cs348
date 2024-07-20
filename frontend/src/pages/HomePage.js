import React, { useState, useEffect } from "react";
import GenreDropdown from "../components/genreDropDown";
import Content from "../components/Content";
const genres = ["Comedy", "Horror", "Drama", "Romance", "Action", "Sci-Fi"]; // Add more genres as needed

function Home() {
  const [selectedGenre, setSelectedGenre] = useState("Genres");
  const [recentReleases, setRecentReleases] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);

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
    const fetchRecentReleases = async () => {
      try {
        const recentReleasesRes = await fetch(
          "http://localhost:3001/api/movies/recentReleases"
        );

        if (!recentReleasesRes.ok) {
          throw new Error(`HTTP error! Status: ${recentReleasesRes.status}`);
        }

        const recentReleasesResponse = await recentReleasesRes.json();
        console.log('Recent Releases Data:', recentReleasesResponse); // Debugging log

        if (Array.isArray(recentReleasesResponse.data)) {
          const updatedRecentReleases = await Promise.all(
            recentReleasesResponse.data.map(async (r) => ({
              ...r,
              poster_link: await checkImageURL(
                `https://image.tmdb.org/t/p/w500${r.poster_link}`,
                "https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg"
              ),
            }))
          );

          setRecentReleases(updatedRecentReleases);
        } else {
          console.error("Expected an array but got:", recentReleasesResponse.data);
          setRecentReleases([]);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setRecentReleases([]);
      }
    };

    const fetchPopularMovies = async () => {
      try {
        const popularMoviesRes = await fetch(
          "http://localhost:3001/api/movies/popularMovies"
        );

        if (!popularMoviesRes.ok) {
          throw new Error(`HTTP error! Status: ${popularMoviesRes.status}`);
        }

        const popularMoviesResponse = await popularMoviesRes.json();
        console.log('Popular Movies Data:', popularMoviesResponse); // Debugging log

        const updatedPopularMovies = await Promise.all(
          popularMoviesResponse.data.map(async (r) => ({
            ...r,
            poster_link: await checkImageURL(
              `https://image.tmdb.org/t/p/w500${r.poster_link}`,
              "https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg"
            ),
          }))
        );

        setPopularMovies(updatedPopularMovies);

      } catch (err) {
        console.error("Fetch error:", err);
        setPopularMovies([]);
      }
    };

    fetchRecentReleases();
    fetchPopularMovies();
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
          <h3 className="text-2xl font-bold mb-4">Recent Releases</h3>
          <div className="flex flex-row overflow-x-auto space-x-4 no-scrollbar overflow-y-auto">
            {recentReleases.map((r, i) => (
              <Content
                key={i}
                title={r.title}
                description={r.description}
                imageURL={r.poster_link}
              />))}
          </div>
        </div>

        <div className="mb-20">
          <h3 className="text-2xl font-bold mb-4">Popular Movies</h3>
          <div className="flex flex-row overflow-x-auto space-x-4 no-scrollbar overflow-y-auto">
            {popularMovies.map((r, i) => (
              <h1 key={i}>{r.title}</h1>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
