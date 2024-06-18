import React, { useState, useEffect } from "react";
import Content from "../components/Content";
import GenreDropdown from "../components/genreDropDown";
import movie from "../assets/movie.jpeg";

const genres = ["Comedy", "Horror", "Drama", "Romance", "Action", "Sci-Fi"]; // Add more genres as needed

function Home() {
  const [selectedGenre, setSelectedGenre] = useState("Genres");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/movies/allMovies")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setMovies(data.data);
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
      <div className="flex flex-col justify-start">
        <div className="w-1/4 flex flex-row items-center mb-8">
          <h3 className="text-4xl font-bold pr-10 ">Home</h3>
          <GenreDropdown genres={genres} onSelect={handleGenreSelect} />
        </div>

        <div className="mb-20">
          <h3 className="text-2xl font-bold mb-4">Comedy</h3>
          <div className="flex flex-row overflow-x-auto space-x-4 no-scrollbar overflow-y-auto">
            <Content description="Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups." profileName={"Hudson Koyanagi"} imageURL={movie} />
            <Content description="Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups." profileName={"Hudson Koyanagi"} imageURL={movie} />
            <Content description="Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups." profileName={"Hudson Koyanagi"} imageURL={movie} />
            <Content description="Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups." profileName={"Hudson Koyanagi"} imageURL={movie} />
            <Content description="Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups." profileName={"Hudson Koyanagi"} imageURL={movie} />

            {/* {
              movies.map((m, i) => <Content key={i} className="min-w-[300px]" description={m.description} profileName={m.profileName} imageURL={m.posterlink} />)
            } */}
          </div>
        </div>

        <div className="mb-20">
          <h3 className="text-2xl font-bold mb-4">Romance</h3>
          <div className="flex flex-row overflow-x-auto space-x-4 no-scrollbar overflow-y-auto">
            <Content description="Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups." profileName={"Hudson Koyanagi"} imageURL={movie} />
            <Content description="Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups." profileName={"Hudson Koyanagi"} imageURL={movie} />
            <Content description="Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups." profileName={"Hudson Koyanagi"} imageURL={movie} />
            <Content description="Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups." profileName={"Hudson Koyanagi"} imageURL={movie} />

            {/* {
              movies.map((m, i) => <Content key={i} className="min-w-[300px]" description={m.description} profileName={m.profileName} imageURL={m.posterlink} />)
            } */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
