import React, { useEffect, useState } from "react";
import { X, Star} from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function CreateNewReview({movieImgVert, movieTitle, onClose, onSubmit}) {
    const [starRating, setStarRating] = useState(0);
    const [date, setDate] = useState(new Date());

    const [isTop3, setIsTop3] = useState(false);
    const [description, setDescription] = useState('');

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

  const handleStarClick = (index) => {
    setStarRating(index + 1);
  };


  const handleSubmit = () => {
    // Handle the submission logic here (e.g., send data to a server)
    console.log({
      starRating,
      setDate,
      isTop3,
      description,
    });
    onSubmit();
    
  };



  return (
    <div
      className="popup-overlay fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      onClick={handleClickOutside}
      
    >
      <div className="popup-content bg-white rounded-lg relative flex flex-col w-2/5 p-8">
        <div className="flex items-center justify-between p-5">
          <h1 className="text-3xl font-bold text-black">Create New Review</h1>
          <button className="top-0 right-0 text-black " onClick={onClose}> <X size={40} /> </button>        
        </div>
     

        <div className="flex ">
            <div className="w-1/2 px-5 ">
                <img className="w-full relative top-0 object-cover rounded mb-4" src={movieImgVert} alt={movieTitle} />
            </div>

            <div className="w-1/2 px-5">
                <h2 className="text-3xl font-bold mb-1 text-black">{movieTitle}</h2>
                <div className="flex mb-4">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={`cursor-pointer ${
                        index < starRating ? "text-yellow-500" : "text-gray-400"
                      }`}
                      onClick={() => handleStarClick(index)}
                    />
                  ))}
                </div>
                <div>
                <div className="mb-4">
                  <h4 className="font-bold mb-2">Date Watched</h4>
                  <div className="flex gap-2">
                    <DatePicker selected={date} onChange={(date) => setDate(date)} />
                  </div>
                </div>
                <div className="mb-4 flex items-center mb-2">
                  <h4 className="font-bold mr-3 ">Top 3?</h4>
                    <input
                      type="checkbox"
                      checked={isTop3}
                      onChange={() => setIsTop3((prev) => !prev)}
                      className="cursor-pointer"
                    />
                    <label className="ml-1">Yes</label>
                </div>
                <div className="mb-4 flex flex-col h-1/2">
                  <h4 className="font-bold mb-2">Description</h4>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border rounded w-full h-full  px-2 py-1"
                    placeholder="Enter your review here"
                  />
                </div>
              </div>
            </div>
        </div>
      <button className="bg-pink-500 text-white py-2 px-4 rounded self-end m-5 " onClick={handleSubmit}>Submit Review</button>

      </div>
    </div>

  );
}

export default CreateNewReview;
