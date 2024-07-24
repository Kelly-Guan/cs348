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
    let tempMovies = [];
    let query = new URLSearchParams();
    if (search) query.append("title", search);
    if (genre) query.append("genre", genre);
    if(rating) query.append('rating', rating);
    if (runtime) query.append("runtime", runtime);
    // query.append("offset", 50);

    const do_thing = async (link) => {
      let val = await posterLinkToImgURL(link);
      return val;
    }

    fetch(`http://localhost:3001/api/movies/search?${query.toString()}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        tempMovies = data;
        for(let i = 0; i < data.length; i++) {
          tempMovies[i].poster_link = do_thing(tempMovies[i].poster_link);
          tempMovies[i].cast = []
          tempMovies[i].genres = []
        }
        const fetchGenres = async () => {
          for (let i = 0; i < tempMovies.length; i++) {
            try {
              const response = await fetch(
                `http://localhost:3001/api/movies/movieGenre/${tempMovies[i].mid}`
              );
              const respons2 = await fetch(
                `http://localhost:3001/api/movies/movieCast/${tempMovies[i].mid}`
              );
              const data = await response.json();
              const dat2 = await respons2.json();

              tempMovies[i].genres = data;
              tempMovies[i].cast = dat2;
              setMovies(tempMovies);
              console.log(tempMovies)

            } catch (error) {
              console.error("Error fetching movie genres:", error);
            }
          }
        };
        fetchGenres();
        console.log(movies);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setMovies([]);
      });
  }, [search, genre, rating, runtime]);

  return (
    <div className="w-5/6 ml-auto p-12">
      <div className=" overflow-hidden w-full flex flex-col justify-start">
        <div className="flex flex-row justify-between items-center mb-8">
          <h3 className="text-4xl font-bold">Search</h3>
          <GenreDropdown name="Genre" genres={genres} onSelect={selectGenre} />
          <GenreDropdown
            name="Runtime"
            genres={runtimes}
            onSelect={selectRuntime}
          />
          <GenreDropdown
            name="Rating"
            genres={ratings}
            onSelect={selectRating}
          />
          <SearchBar onReturn={selectSearch} />
        </div>
        <div className="mb-20 w-full">
          <div className="grid gap-x-3 gap-y-10 grid-cols-3">
            {/* {movies == [] ? (
              <></>
            ) : (
              movies.map((m) => (
                <MovieButton
                  movieImg={m.poster_link}
                  movieImgVert={m.poster_link}
                  movieTitle={m.title}
                  movieTime={m.runtime}
                  movieDescription={m.description}
                  movieCast={m["cast"].slice(0,5).toString()}
                  movieGenre={m["genres"].toString()}
                  alt={m.title}
                  pageType="search"
                />
              ))
            )} */}
            {movies.map((m) => (
                <MovieButton
                  movieImg={m.poster_link}
                  movieImgVert={m.poster_link}
                  movieTitle={m.title}
                  movieTime={m.runtime}
                  movieDescription={m.description}
                  movieCast={m["cast"].slice(0,5).toString()}
                  movieGenre={m["genres"].toString()}
                  alt={m.title}
                  pageType="search"
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
