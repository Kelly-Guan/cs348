import React, { useState } from "react";
import ReadMovie from '../readMovie';

function MovieButton({ movieImg, alt, movieTitle, movieTime, movieDescription, movieCast, movieGenre }) {
  const [showPopup, setShowPopup] = useState(false);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <button onClick={() => setShowPopup(true)}>
        <img src={movieImg} alt={alt} className="w-96 h-auto" />
      </button>
      {showPopup && (
        <ReadMovie
          movieImg={movieImg}
          movieTitle={movieTitle}
          movieTime={movieTime}
          movieDescription={movieDescription}
          movieCast={movieCast}
          movieGenre={movieGenre}
          onClose={handleClosePopup}
        />
      )}
    </>
  );
}

export default MovieButton;
