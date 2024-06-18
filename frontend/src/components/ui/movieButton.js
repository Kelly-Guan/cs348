import React, { useState } from "react";
import ReadMovie from '../readMovie';
import CreateNewReview from '../createNewReview';


function MovieButton({ movieImg, movieImgVert, alt, movieTitle, movieTime, movieDescription, movieCast, movieGenre }) {
  const [showReadMoviePopup, setShowReadMoviePopup] = useState(false);
  const [showReviewPopup, setShowReviewPopup] = useState(false);

  const handleCloseReadMoviePopup = () => {
    setShowReadMoviePopup(false);
  };

  const handleOpenReviewPopup = () => {
    setShowReadMoviePopup(false);
    setShowReviewPopup(true);
  };

  const handleCloseReviewPopup = () => {
    setShowReviewPopup(false);
  };

  return (
    <>
      <button onClick={() => setShowReadMoviePopup(true)}>
        <img src={movieImg} alt={alt} className="w-96 h-auto" />
      </button>
      {showReadMoviePopup && (
        <ReadMovie
          movieImg={movieImg}
          movieTitle={movieTitle}
          movieTime={movieTime}
          movieDescription={movieDescription}
          movieCast={movieCast}
          movieGenre={movieGenre}
          onClose={handleCloseReadMoviePopup}
          onAddReview={handleOpenReviewPopup}
        />
      )}
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

export default MovieButton;
