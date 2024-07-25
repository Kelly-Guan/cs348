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


      <div className="max-w-full relative">
      <button
        className={`bg-white rounded-lg overflow-hidden p-4 ${
          pageType === "search" ? "w-96" : "w-full h-auto max-w-80 object-cover"
        } relative group`}
        onClick={() => {
          setShowReadMoviePopup(true);
          console.log(movieImg);
        }}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src={movieImg}
            alt={alt}
            className="w-full h-auto"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h1 className="text-white text-2xl">{movieTitle}</h1>
          </div>
        </div>
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
