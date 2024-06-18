import React, { useEffect,useState } from "react";

function SearchResultCreateMovieButton({movieImgVert, movieTitle, onClose, onAddReview }) {

  return (
    <div>
      <button className="min-w-1/4 mr-4" onClick={onAddReview}>
        <img src={movieImgVert}></img>
      </button>

    </div>

  );
}

export default SearchResultCreateMovieButton;
