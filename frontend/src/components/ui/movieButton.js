import React, { useState } from "react";
import ReadMovie from '../readMovie';
import CreateNewReview from '../createNewReview';




function MovieButton({ mid, movieImg, movieImgVert, alt, movieTitle, movieTime, movieDescription, movieCast, movieGenre,pageType }) {
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
      <div className="max-w-full">
        <button
          className={`bg-white rounded-lg overflow-hidden p-4${
            pageType === "search" ? "w-96" : "w-full h-auto max-w-80 object-cover"
          }`}
          onClick={() => {
            setShowReadMoviePopup(true) 
            console.log(movieImg)
          }}>
          <img
            src={
              movieImg
            }
            alt={alt}
          />
        </button>
      </div>

      {showReadMoviePopup && (
        <ReadMovie
          movieImg={movieImg}
          movieImgVert={movieImg}
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
          mid={mid}
          movieImg={movieImg}
          movieImgVert={movieImg}
          movieTitle={movieTitle}
          onClose={handleCloseReviewPopup}
          onSubmit={handleSubmitReview}
        />
      )}
    </>
  );
}

export default MovieButton;
