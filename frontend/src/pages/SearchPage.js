import React, { useState, useEffect } from "react";
import MovieButton from "../components/ui/movieButton";
import SearchBar from "../components/ui/searchBar";
import movieFiller from "../assets/littleWomen.jpg";
import movieFillerVer from "../assets/fillerVert.jpg";
import GenreDropdown from "../components/genreDropDown";

const genres = ["Comedy", "Horror", "Drama", "Romance", "Action", "Sci-Fi"]; // Add more genres as needed
const runtimes = ["short", "medium", "long"];
const ratings = [1, 2, 3, 4, 5];

function SearchPage() {
  const [movies, setMovies] = useState([]);

  const [movieCast, setMovieCast] = useState([]);
  const [movieGenre, setMovieGenre] = useState([]);

  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState("");
  const [runtime, setRuntime] = useState("");

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

  // useEffect(() => {
  //   fetch("http://localhost:3001/api/movies/allMovies")
  //     .then((res) => {
  //       if (!res.ok) {
  //         throw new Error(`HTTP error! Status: ${res.status}`);
  //       }
  //       return res.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //       setMovies(data.data);
  //     })
  //     .catch((err) => {
  //       console.error("Fetch error:", err);
  //       setMovies([]);
  //     });
  // }, []);

  useEffect(() => {
    let tempMovies = [];
    let query = new URLSearchParams();
    if (search) query.append("title", search);
    if (genre) query.append("genre", genre);
    // if(rating) query.append('rating', rating);
    if (runtime) query.append("runtime", runtime);
    // query.append("offset", 50);

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
            {/* <MovieButton
              movieImg={movieFiller}
              movieImgVert={movieFillerVer}
              movieTitle="The GodFather"
              movieTime="2004 2h 17m"
              movieDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pellentesque diam volutpat commodo sed egestas. Consequat..."
              movieCast="Uma Thurman, David Carradine, Micheal, more"
              movieGenre="Martial Arts Move, Action, Adventure"
              alt="Movie Poster"
              pageType="search"
            /> */}
            {movies == [] ? (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
