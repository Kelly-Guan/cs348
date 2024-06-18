import React, { useState, useEffect } from "react";
import Content from "../components/Content";

import GenreDropdown from "../components/genreDropDown";

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
    <div className="w-5/6 ml-auto p-0">
      <div className="flex flex-col justify-start">
        <div className="w-1/6 flex flex-row justify-between items-center mb-8">
          <h3 className="text-4xl font-bold">Home</h3>
          <GenreDropdown genres={genres} onSelect={handleGenreSelect} />
        </div>

        <div className="mb-20">
          <h3 className="text-2xl font-bold mb-4">Comedy</h3>
          <div className="flex flex-row overflow-x-auto space-x-4">
            {
              movies.map((m, i) => <Content description={m.description} profileName={"Hudson Koyanagi"}imageURL={m.posterlink}/>)
            }
          </div>
        </div>

        <div className="mb-20">
          <h3 className="text-2xl font-bold mb-4">Romance</h3>
          <div className="flex flex-row overflow-x-auto space-x-4">
            <Content description="Lorem ipsum dolor sit amet, delectus theophrastus nec te, te cum prompta debitis. Vix at quem probatus sadipscing. Sea quem quando volumus cu, consul postea appellantur ea eum. Mel quando reprimique temporibus ei. Habemus conclusionemque eos at, liber quodsi facilis pro eu. Ei eum vidisse fastidii, te pro natum etiam, sed dicat iracundia in." />
            <Content description="Lorem ipsum dolor sit amet, delectus theophrastus nec te, te cum prompta debitis. Vix at quem probatus sadipscing. Sea quem quando volumus cu, consul postea appellantur ea eum. Mel quando reprimique temporibus ei. Habemus conclusionemque eos at, liber quodsi facilis pro eu. Ei eum vidisse fastidii, te pro natum etiam, sed dicat iracundia in." />
            <Content description="Lorem ipsum dolor sit amet, delectus theophrastus nec te, te cum prompta debitis. Vix at quem probatus sadipscing. Sea quem quando volumus cu, consul postea appellantur ea eum. Mel quando reprimique temporibus ei. Habemus conclusionemque eos at, liber quodsi facilis pro eu. Ei eum vidisse fastidii, te pro natum etiam, sed dicat iracundia in." />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
