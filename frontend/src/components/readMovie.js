import React, { useEffect,useState } from "react";
import { X } from "lucide-react";

function ReadMovie({ movieImg,  movieTitle, movieTime, movieDescription, movieCast, movieGenre, onClose, onAddReview, onSubmit}) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  const handleClickOutside = (e) => {
    if (e.target.classList.contains("popup-overlay")) {
      onClose();
    }
  };



  return (
    <div
      className="popup-overlay fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      onClick={handleClickOutside}
    >
      <div className="popup-content bg-white rounded-lg relative flex flex-col w-full max-w-3xl">
        <img className="w-full relative top-0 object-cover rounded mb-4" src={movieImg} alt={movieTitle} />

        <div className=" w-full flex justify-between items-center absolute top-0 p-8">
            <h2 className="text-3xl font-bold mb-4 text-white">{movieTitle}</h2>
            <button className="text-white" onClick={onClose}> <X size={40} /> </button>        
        </div>
        
        <div className="mt-8 w-full flex justify-start px-8">
            <div className="w-5/6">
                <div className="text-gray-600 mb-2">{movieTime}</div>
                <div className="text-gray-500">{movieDescription}</div>
            </div>
          
            <div className="">
              <div className="text-gray-600 mb-2">
                <strong>Cast:</strong> {movieCast}
              </div>
              <div className="text-gray-600">
                <strong>Genre:</strong> {movieGenre}
              </div>
            </div>
          
        </div>

        <button
          className="bg-pink-500 text-white py-2 px-4 rounded self-end m-10"
          onClick={onAddReview}> Add Review</button>
      </div>
    </div>

  );
}

export default ReadMovie;
