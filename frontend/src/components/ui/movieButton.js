import React, { useState } from "react";
import ReadMovie from '../readMovie';
import CreateNewReview from '../createNewReview';


function MovieButton({ movieImg, movieImgVert, alt, movieTitle, movieTime, movieDescription, movieCast, movieGenre,pageType }) {
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

  const handleSubmitReview = () => {
    // Close both popups
    setShowReadMoviePopup(false);
    setShowReviewPopup(false);
  };


  return (
    <>
      <button 
          className={`bg-white rounded-lg overflow-hidden ${
            pageType === 'search'
              ? 'w-90'
              : 'min-w-96'
          }`}        
          onClick={() => setShowReadMoviePopup(true)}>
        <img src={movieImg} alt={alt} />
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
          onSubmit={handleSubmitReview}
        />
      )}
    </>
  );
}

export default MovieButton;
