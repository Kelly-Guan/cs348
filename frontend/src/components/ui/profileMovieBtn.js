import React, { useState } from "react";
import ProfilePopUp from '../profilePopUp';

function ProfileMovieBtn({ movieImgVert, alt, movieTitle, reviewDescription, profileName, timePosted, starRating }) {
  const [showProfilePopUp, setShowProfilePopUp] = useState(false);

  const handleOpenProfilePopUp = () => {
    setShowProfilePopUp(true);
  };

  const handleCloseProfilePopUp = () => {
    setShowProfilePopUp(false);
  };

  return (
    <>
      <div className="max-w-full">
        <button
          className="bg-white rounded-lg overflow-hidden w-full h-auto max-w-80 object-cover"
          onClick={handleOpenProfilePopUp}>
          <img src={movieImgVert} alt={alt} />
        </button>
      </div>
      {showProfilePopUp && (
        <ProfilePopUp
          movieImgVert={movieImgVert}
          movieTitle={movieTitle}
          reviewDescription={reviewDescription}
          profileName={profileName}
          timePosted={timePosted}
          starRating={starRating}
          onClose={handleCloseProfilePopUp}
        />
      )}
    </>
  );
}

export default ProfileMovieBtn;
