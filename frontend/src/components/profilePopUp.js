import React, { useEffect } from "react";
import { X, Circle, Star } from "lucide-react";
import Comment from "../components/commentSection"

function ProfilePopUp({ movieImgVert, movieTitle, reviewDescription, profileName, timePosted, starRating, onClose }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const handleClickOutside = (e) => {
    if (e.target.classList.contains("popup-overlay")) {
      onClose();
    }
  };

  return (
    <div
      className="popup-overlay fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      onClick={handleClickOutside}>
      <div className="popup-content bg-white rounded-lg relative flex w-3/5 h-4/5">
        <button className="absolute right-0 text-black p-3" onClick={onClose} >
          <X size={40} />
        </button>
        <div className="w-1/2">
          <img src={movieImgVert} alt={movieTitle} className="w-full h-full object-cover rounded-l-lg" />
        </div>
        <div className="w-1/2 flex flex-col p-4">
          <div className="flex items-center mb-4">
            <h2 className="text-2xl font-bold mx-2 ">Little Women</h2>
            <div className="flex mx-2 mt-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className={`h-5 w-5 ${index < starRating ? "text-yellow-500" : "text-gray-300"}`} />
              ))}
            </div>
          </div>

          <div className="mb-2">
            <div className="flex mb-1">
              <div className="align-left mx-3">
                <h3 className="text-sm font-semibold mb-1">{profileName}</h3>
                <p className="text-xs text-gray-400">{timePosted}</p>
              </div>
              <p className="text-sm mb-2">During the final day of the 2024 European Junior Championships in Vilnius, Lithuania, 15-year-old Tajus Juska from Lithuania won the boys’ 100 freestyle in 48.74. He is the youngest swimmer to ever crack the 49-second barrier, as he is the first 15-year-old swimmer to swim in the 48-second territory.</p>
            </div>
          </div>

          <div className="mt-2">
            <h3 className="text-lg font-bold mb-1">Comments</h3>
            <Comment author="Arjun.Walia" time = "2W" content="great post kelly u are awesome"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePopUp;
