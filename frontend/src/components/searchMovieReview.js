import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import movieFillerVer from "../assets/fillerVert.jpg";
import SearchBar from "../components/ui/searchBar";
import SearchResultCreateMovieButton from "../components/ui/searchResultCreateButton";


function SearchReviewPopUp({ movieImg,  movieTitle, movieImgVert, movieTime, movieDescription, movieCast, movieGenre, onClose, onAddReview }) {
//   useEffect(() => {
//     const handleEscape = (e) => {
//       if (e.key === "Escape") {
//         onClose();
//       }
//     };

//     document.addEventListener("keydown", handleEscape);
//     return () => {
//       document.removeEventListener("keydown", handleEscape);
//     };
//   }, [onClose]);

//   const handleClickOutside = (e) => {
//     if (e.target.classList.contains("popup-overlay")) {
//       onClose();
//     }
//   };


  return (
    <div
      className="popup-overlay fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50" >

      <div className="popup-content bg-white rounded-lg relative flex flex-col w-full max-w-3xl p-4 ">
        <div className="flex items-center justify-between p-5">
          <h1 className="text-3xl font-bold text-black">Create New Review</h1>
          <button className="top-0 right-0 text-black " onClick={onClose}> <X size={40} /> </button>        
        </div>

        <div className="w-2/3 px-5">
            <SearchBar/>
        </div>
        
        <div className="flex flex-row overflow-x-auto space-x-4 no-scrollbar overflow-y-auto">
            <SearchResultCreateMovieButton movieImgVert={movieFillerVer}/>
            <SearchResultCreateMovieButton movieImgVert={movieFillerVer}/>
            <SearchResultCreateMovieButton movieImgVert={movieFillerVer}/>
            <SearchResultCreateMovieButton movieImgVert={movieFillerVer}/>
            <SearchResultCreateMovieButton movieImgVert={movieFillerVer}/>
            <SearchResultCreateMovieButton movieImgVert={movieFillerVer}/>
            <SearchResultCreateMovieButton movieImgVert={movieFillerVer}/>
            <SearchResultCreateMovieButton movieImgVert={movieFillerVer}/>
            <SearchResultCreateMovieButton movieImgVert={movieFillerVer}/>
            <SearchResultCreateMovieButton movieImgVert={movieFillerVer}/>
            <SearchResultCreateMovieButton movieImgVert={movieFillerVer}/>
            <SearchResultCreateMovieButton movieImgVert={movieFillerVer}/>
            <SearchResultCreateMovieButton movieImgVert={movieFillerVer}/>
            <SearchResultCreateMovieButton movieImgVert={movieFillerVer}/>
            <SearchResultCreateMovieButton movieImgVert={movieFillerVer}/>
            <SearchResultCreateMovieButton movieImgVert={movieFillerVer}/>
        </div>
      </div>
    </div>

  );
}

export default SearchReviewPopUp;
