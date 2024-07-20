import React, { useState, useEffect } from "react";
import MovieButton from "../components/ui/movieButton";
import movieFiller from "../assets/littleWomen.jpg";
import movieFillerVer from "../assets/fillerVert.jpg";
import GenreDropdown from "../components/genreDropDown";


const genres = ["Comedy", "Horror", "Drama", "Romance", "Action", "Sci-Fi"]; // Add more genres as needed

function ExplorePage() {
    const [selectedGenre, setSelectedGenre] = useState("Genres");
    const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/movies/search?genre=Action&offset=0")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setMovies(data);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setMovies([]);
      });
  }, []);

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
  };

  return (
    <div className="w-5/6 ml-auto p-12">
      <div className=" overflow-hidden w-full flex flex-col justify-start">
        <div className="w-1/4 flex flex-row items-center mb-8">
          <h3 className="text-4xl font-bold pr-10 ">Explore</h3>
          <GenreDropdown genres={genres} onSelect={handleGenreSelect} />
        </div>

        <div className="mb-20">
          <h3 className="text-2xl font-bold mb-4">Comedy</h3>
          <div className="flex flex-row overflow-x-auto space-x-4 no-scrollbar overflow-y-auto">
            {movies.map((m, i) => 
              <MovieButton 
              key={i}
              // movieImg={m.poster_link} 
              // movieImgVert={m.poster_link}
              movieTitle={m.title}
              movieTime={m.release_date}
              movieDescription={m.description}
              alt="Movie Poster"
              />
            )}
          </div>
        </div>

        <div className="mb-20">
          <h3 className="text-2xl font-bold mb-4">Horror</h3>
          <div className="flex flex-row overflow-x-auto space-x-4 no-scrollbar overflow-y-auto">
            {/* {movies.map((m, i) => 
              <MovieButton 
              key={i}
              movieImg={"https://image.tmdb.org/t/p/w500" + m.poster_link} 
              movieImgVert={"https://image.tmdb.org/t/p/w500" + m.poster_link}
              movieTitle={m.title}
              movieTime={m.release_date}
              movieDescription={m.description}
              alt="Movie Poster"
              />
            )} */}
          </div>
        </div>

        <div className="mb-20">
          <h3 className="text-2xl font-bold mb-4">Drama</h3>
          <div className="flex flex-row overflow-x-auto space-x-4 no-scrollbar overflow-y-auto">
            {/* {movies.map((m, i) => 
              <MovieButton 
              key={i}
              movieImg={"https://image.tmdb.org/t/p/w500" + m.poster_link} 
              movieImgVert={"https://image.tmdb.org/t/p/w500" + m.poster_link}
              movieTitle={m.title}
              movieTime={m.release_date}
              movieDescription={m.description}
              alt="Movie Poster"
              />
            )} */}
          </div>
        </div>

        <div className="mb-20">
          <h3 className="text-2xl font-bold mb-4">Romance</h3>
          <div className="flex flex-row overflow-x-auto space-x-4 no-scrollbar overflow-y-auto">
            {/* {movies.map((m, i) => 
              <MovieButton 
              key={i}
              movieImg={"https://image.tmdb.org/t/p/w500" + m.poster_link} 
              movieImgVert={"https://image.tmdb.org/t/p/w500" + m.poster_link}
              movieTitle={m.title}
              movieTime={m.release_date}
              movieDescription={m.description}
              alt="Movie Poster"
              />
            )} */}
          </div>
        </div>

        <div className="mb-20">
          <h3 className="text-2xl font-bold mb-4">Action</h3>
          <div className="flex flex-row overflow-x-auto space-x-4 no-scrollbar overflow-y-auto">
            {/* {movies.map((m, i) => 
              <MovieButton 
              key={i}
              movieImg={"https://image.tmdb.org/t/p/w500" + m.poster_link} 
              movieImgVert={"https://image.tmdb.org/t/p/w500" + m.poster_link}
              movieTitle={m.title}
              movieTime={m.release_date}
              movieDescription={m.description}
              alt="Movie Poster"
              />
            )} */}
          </div>
        </div>

        <div className="mb-20">
          <h3 className="text-2xl font-bold mb-4">Sci-Fi</h3>
          <div className="flex flex-row overflow-x-auto space-x-4 no-scrollbar overflow-y-auto">
            {/* {movies.map((m, i) => 
              <MovieButton 
              key={i}
              movieImg={"https://image.tmdb.org/t/p/w500" + m.poster_link} 
              movieImgVert={"https://image.tmdb.org/t/p/w500" + m.poster_link}
              movieTitle={m.title}
              movieTime={m.release_date}
              movieDescription={m.description}
              alt="Movie Poster"
              />
            )} */}
          </div>
        </div>


      </div>
    </div>
  );
}

export default ExplorePage;
