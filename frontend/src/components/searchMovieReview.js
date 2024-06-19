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

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleOpenCreateReviewPopup = () => {
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
              <SearchBar />
            </div>

            <div
              className="grid grid-cols-4 gap-4 overflow-y-auto no-scrollbar mt-8"
              style={{ maxHeight: `${containerHeight}px` }}
            >
              <SearchMovieBtn 
                movieImgVert={movieFillerVer} 
                alt="Movie" 
                movieTitle="Sample Movie" 
                onClick={handleOpenCreateReviewPopup} 
                onClose = {handleCloseCreateReviewPopup}
              />
              <SearchMovieBtn 
                movieImgVert={movieFillerVer} 
                alt="Movie" 
                movieTitle="Sample Movie" 
                onClick={handleOpenCreateReviewPopup} 
              />
              <SearchMovieBtn 
                movieImgVert={movieFillerVer} 
                alt="Movie" 
                movieTitle="Sample Movie" 
                onClick={handleOpenCreateReviewPopup} 
              />
              <SearchMovieBtn 
                movieImgVert={movieFillerVer} 
                alt="Movie" 
                movieTitle="Sample Movie" 
                onClick={handleOpenCreateReviewPopup} 
              />
              <SearchMovieBtn 
                movieImgVert={movieFillerVer} 
                alt="Movie" 
                movieTitle="Sample Movie" 
                onClick={handleOpenCreateReviewPopup} 
              />
              <SearchMovieBtn 
                movieImgVert={movieFillerVer} 
                alt="Movie" 
                movieTitle="Sample Movie" 
                onClick={handleOpenCreateReviewPopup} 
              />
              <SearchMovieBtn 
                movieImgVert={movieFillerVer} 
                alt="Movie" 
                movieTitle="Sample Movie" 
                onClick={handleOpenCreateReviewPopup} 
              />
              <SearchMovieBtn 
                movieImgVert={movieFillerVer} 
                alt="Movie" 
                movieTitle="Sample Movie" 
                onClick={handleOpenCreateReviewPopup} 
              />
            </div>
          </div>
        </div>
      )}

      {showCreateReviewPopup && (
        <CreateNewReview 
          movieImgVert={movieFillerVer}
          movieTitle="The Little Women"
          onClose={handleCloseCreateReviewPopup} 
        />
      )}
    </div>
  );
}

export default SearchReviewPopUp;
