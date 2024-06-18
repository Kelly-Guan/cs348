import React, { useEffect, useState } from "react";
import { X, Star} from "lucide-react";

function CreateNewReview({movieImgVert, movieTitle, onClose}) {
    const [showAddReviewPopup, setAddReviewPopup] = useState(false); 
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

      <button className="absolute top-0 p-8 text-white" onClick={onClose}> <X size={40} /> </button>        

        <div className="flex ">
            <div>
                <h1>Create New Review</h1>
                <img className="w-1/2 relative top-0 object-cover rounded mb-4" src={movieImgVert} alt={movieTitle} />
            </div>

            <div>
                <h2 className="text-2xl font-bold mb-4 text-white">{movieTitle}</h2>
                <div className="flex"><Star/> <Star/> <Star/> <Star/> <Star/></div>
                <div>
                    <div>
                        <h4>Date Watched</h4>
                        <div>enter time</div>
                    </div>
                    <div>
                        <h4>Top 3?</h4>
                        <div>Yes/No</div>
                    </div>
                </div>
                <div>
                    <h4>Description</h4>
                    <div>enter description</div>
                </div>
            </div>
            <button className="bg-blue-500 text-white py-2 px-4 rounded self-end m-10">Add</button>

        </div>
      </div>
    </div>

  );
}

export default CreateNewReview;
