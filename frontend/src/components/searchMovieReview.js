import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import movieFillerVer from "../assets/fillerVert.jpg";
import SearchBar from "../components/ui/searchBar";
import SearchMovieBtn from "../components/ui/searchResultCreateButton";
import CreateNewReview from "../components/createNewReview";

function SearchReviewPopUp({ onClose }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showCreateReviewPopup, setShowCreateReviewPopup] = useState(false);
  const [showSearchReviewPopup, setShowSearchReviewPopup] = useState(true);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [search, setSearch] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/api/movies/search?=${search}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setMovies(data);
      }).catch((err) => {
        console.error("Fetch error:", err);
        setMovies([]);
      });

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [search]);

  const selectSearch = (search) =>{
    setSearch(search);
  }

  const handleOpenCreateReviewPopup = (movie) => {
    setSelectedMovie(movie);
    setShowSearchReviewPopup(false);
    setShowCreateReviewPopup(true);
  };

  const handleCloseCreateReviewPopup = () => {
    setShowCreateReviewPopup(false);
    setShowSearchReviewPopup(true);
  };

  const handleClickOutside = (e) => {
    if (e.target.classList.contains("popup-overlay")) {
      onClose();
    }
  };

  const handleSubmitReview = () => {
    // Close both popups
    setShowCreateReviewPopup(false);
    setShowSearchReviewPopup(false);
    onClose();
  };

  const itemHeight = 200;
  const itemMarginBottom = 10;
  const containerHeight = itemHeight * 1.5 + itemMarginBottom * 1.5; // Height for 1 and a 1/2 rows

  return (
    <div>
      {showSearchReviewPopup && (
        <div
          className="popup-overlay fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
          onClick={handleClickOutside}
        >
          <div className="popup-content bg-white rounded-lg relative flex flex-col w-2/5 p-8">
            <div className="flex items-center justify-between p-5">
              <h1 className="text-3xl font-bold text-black">Create New Review</h1>
              <button className="top-0 right-0 text-black" onClick={onClose}>
                <X size={40} />
              </button>
            </div>

            <div className="w-2/3 px-5">
              <SearchBar onReturn={selectSearch}/>
            </div>

            <div
              className="grid grid-cols-4 gap-4 overflow-y-auto no-scrollbar mt-8"
              style={{ maxHeight: `${containerHeight}px` }}
            >
              {movies.length === 0 ? (
                <></>
              ) : (
                movies.map((m) => (
                  <SearchMovieBtn 
                    key={m.mid}
                    mid={m.mid}
                    movieImgVert={m.poster_link} 
                    alt={m.title} 
                    movieTitle={m.title} 
                    onClick={() => handleOpenCreateReviewPopup(m)} 
                  />
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {showCreateReviewPopup && selectedMovie && (
        <CreateNewReview 
          mid = {selectedMovie.mid}
          movieImgVert={selectedMovie.poster_link}
          movieTitle={selectedMovie.title}
          onClose={handleCloseCreateReviewPopup} 
          onSubmit={handleSubmitReview} // Pass the handleSubmitReview to close both popups
        />
      )}
    </div>
  );
}

export default SearchReviewPopUp;
