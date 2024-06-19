import React, { useState } from "react";
import CreateNewReview from '../createNewReview';


function SearchMovieBtn({movieImgVert, alt, movieTitle, onClick}) {
  const [showReviewPopup, setShowReviewPopup] = useState(false);

  // const handleOpenReviewPopup = () => {
  //   setShowReviewPopup(true);
  // };

  const handleCloseReviewPopup = () => {
    setShowReviewPopup(false);
  };

  return (
    <>
      <button 
          className="bg-white rounded-lg overflow-hidden min-w-26"       
          onClick={onClick}>
          <img src={movieImgVert} alt={alt} />
      </button>

      {showReviewPopup && (
        <CreateNewReview
          movieImgVert={movieImgVert}
          movieTitle={movieTitle}
          onClose={handleCloseReviewPopup}
        />
      )}
    </>
  );
}

export default SearchMovieBtn;
