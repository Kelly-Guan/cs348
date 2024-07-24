import React, { useState, useEffect } from "react";
import Content from "../components/Content";
import Cookies from "js-cookie";
import SearchBar from "../components/ui/searchBar";
import GenreDropdown from "../components/genreDropDown";
import MovieButton from "../components/ui/movieButton";

const genres = ["Comedy", "Horror", "Drama", "Romance", "Action", "Science Fiction"]; // Add more genres as needed

function ExplorePage() {
  const [movies, setMovies] = useState([]);
  const [movieCast, setMovieCast] = useState([]);
  const [movieGenre, setMovieGenre] = useState([]);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState("");
  const [runtime, setRuntime] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("Genres");
  const [ratings, setRatings] = useState([]);
  const [friendsRatings, setFriendsRatings] = useState([]);
  const [genreRatings, setGenreRatings] = useState([]);
  const [movieName,setMovieName] = useState([]);

  const selectSearch = (search) => {
    setSearch(search);
  };
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
        setGenreRatings(updatedData);
      } catch (err) {
        console.error("Fetch error:", err);
        setGenreRatings([]);
      }
    };

    const fetchFriendRatings = async (signedInUser) => {
      try {
        const res = await fetch(`http://localhost:3001/api/ratings/ratingsByFriends/${signedInUser}`);
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
        setFriendsRatings(updatedData);
      } catch (err) {
        console.error("Fetch error:", err);
        setFriendsRatings([]);
      }
    };

    if (selectedGenre !== "Genres") {
      fetchRatings(selectedGenre);
    }
    fetchFriendRatings(Cookies.get("signedInUser"));
  }, [selectedGenre]);

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
  };

  useEffect(() => {
    if (search) {
      // Fetch movie data based on search query
      let query = new URLSearchParams();
      query.append("title", search);
      fetch(`http://localhost:3001/api/movies/search?${query.toString()}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          if (data.length > 0) {
            const movie = data[0]; // Assuming one movie result
            console.log(movie.mid); // Log the movie ID
            setMovieName(movie.title);

            // Fetch ratings for the movie using its ID
            fetch(`http://localhost:3001/api/ratings/ratingsByMovie/${movie.mid}`)
              .then((res) => {
                if (!res.ok) {
                  throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
              })
              .then((ratingsData) => {
                setRatings(ratingsData); // Set ratings in the state
              })
              .catch((err) => {
                console.error("Error fetching ratings:", err);
                setRatings([]);
              });
          } else {
            setMovies([]);
            setRatings([]); // Clear if no movies found
          }
        })
        .catch((err) => {
          console.error("Fetch error:", err);
          setMovies([]);
          setRatings([]);
        });
    }
  }, [search]);

  return (
    <div className="w-5/6 ml-auto p-12">
      <div className="flex flex-col justify-start">
        <div className="w-1/4 flex flex-row items-center mb-8">
          <h3 className="text-4xl font-bold pr-10">Explore</h3>
          <GenreDropdown name="Genre" genres={genres} onSelect={handleGenreSelect} />
        </div>

        <div className="w-1/4 flex flex-row items-center mb-8">
          <SearchBar onReturn={selectSearch} />
        </div>
        <div className="mb-20">
          <h3 className="text-2xl font-bold mb-4">What Your Friends Have Watched</h3>
          <div className="flex flex-row overflow-x-auto space-x-4 no-scrollbar overflow-y-auto">
            {friendsRatings.map((r, i) => (
              <Content
                key={i}
                description={r.rating_text}
                profileName={r.username}
                imageURL={r.poster_link}
                timePosted={r.date_posted.split("T")[0]}
              />
            ))}
          </div>
        </div>
        {selectedGenre !== "Genres" && (
          <div className="mb-20">
            <h3 className="text-2xl font-bold mb-4">{selectedGenre}</h3>
            <div className="flex flex-row overflow-x-auto space-x-4 no-scrollbar overflow-y-auto">
              {genreRatings.map((r, i) => (
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
        <div className="grid gap-x-3 gap-y-10 grid-cols-3">
          {ratings.length > 0 ? (
            <div>
              <h3 className="text-2xl font-bold mb-4">Ratings for {movieName}</h3>
              <div className="flex flex-col space-y-4">
                {ratings.map((rating, index) => (
                  <Content
                    key={index}
                    description={rating.rating_text}
                    profileName={rating.username}
                    imageURL={rating.poster_link}
                    timePosted={rating.date_posted.split("T")[0]}
                  />
                ))}
              </div>
            </div>
          ) : (
            <p>No ratings available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ExplorePage;
