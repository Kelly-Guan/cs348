import React, { useState, useEffect } from "react";
import MovieButton from "../components/ui/movieButton";
import SearchBar from "../components/ui/searchBar";
import { posterLinkToImgURL } from "../utils";
import GenreDropdown from "../components/genreDropDown";

const genres = ["Comedy", "Horror", "Drama", "Romance", "Action", "Science Fiction"]; // Add more genres as needed
const runtimes = ["short", "medium", "long"];
const ratings = ['1-2', '2-3', '3-4', '4-5'];

function SearchPage() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState("");
  const [runtime, setRuntime] = useState("");

  const selectGenre = (genre) => {
    setGenre(genre);
  };
  const selectRating = (rating) => {
    setRating(rating);
  };
  const selectRuntime = (runtime) => {
    setRuntime(runtime);
  };
  const selectSearch = (search) => {
    setSearch(search);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      let query = new URLSearchParams();
      if (search) query.append("title", search);
      if (genre) query.append("genre", genre);
      if (rating) query.append('rating', rating);
      if (runtime) query.append("runtime", runtime);

      try {
        const res = await fetch(`http://localhost:3001/api/movies/search?${query.toString()}`);
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        let tempMovies = data;

        // Process each movie to fetch its poster link and other details
        const moviesWithDetails = await Promise.all(
          tempMovies.map(async (movie) => {
            const poster_link = await posterLinkToImgURL(movie.poster_link);

            try {
              const [genreRes, castRes] = await Promise.all([
                fetch(`http://localhost:3001/api/movies/movieGenre/${movie.mid}`),
                fetch(`http://localhost:3001/api/movies/movieCast/${movie.mid}`)
              ]);

              const genres = await genreRes.json();
              const cast = await castRes.json();

              return {
                ...movie,
                poster_link,
                genres,
                cast
              };
            } catch (error) {
              console.error("Error fetching movie genres or cast:", error);
              return {
                ...movie,
                poster_link,
                genres: [],
                cast: []
              };
            }
          })
        );

        setMovies(moviesWithDetails);
      } catch (error) {
        console.error("Fetch error:", error);
        setMovies([]);
      }
    };

    fetchMovies();
  }, [search, genre, rating, runtime]);

 
  return (
    <div className="w-5/6 ml-auto p-12">
      <div className="relative w-full flex flex-col justify-start ">
        <div className="w-full flex flex-row items-center mb-8">
          <h3 className="text-4xl font-bold">Search</h3>
        
          <div className="flex flex-row items-center justify-between">
            <div className="mr-2 z-10">
              <GenreDropdown name="Genre" genres={genres} onSelect={selectGenre} />
            </div>
            <div className="mr-2 z-10">
              <GenreDropdown name="Runtime" genres={runtimes} onSelect={selectRuntime} />
            </div>
            <div className="mr-2 z-10">
              <GenreDropdown name="Rating" genres={ratings} onSelect={selectRating} />
            </div>
            <SearchBar onReturn={selectSearch} />
          </div>
          </div>
          
          <div className="grid gap-x-3 gap-y-10 grid-cols-3">
            {movies.map((m) => (
              <MovieButton
                key={m.mid}
                movieImg={m.poster_link}
                movieImgVert={m.poster_link}
                movieTitle={m.title}
                movieTime={m.runtime}
                movieDescription={m.description}
                movieCast={m["cast"].slice(0, 5).toString()}
                movieGenre={m["genres"].toString()}
                alt={m.title}
                pageType="search"
              />
            ))}
          </div>
      </div>
    </div>
  );
}

export default SearchPage;