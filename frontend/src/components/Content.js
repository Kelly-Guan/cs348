import React, { useState } from "react";
import { Circle, ThumbsUp, ThumbsDown, MessageCircle, ChevronDown } from "lucide-react";
import ProfileTitle from "./ui/profileTitle";
import Movie from "../assets/movie.jpeg";
import slice from "lodash";

function Content({ ProfilePic, profileName, timePosted, fullName, description, movie }) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const truncatedDescription = showFullDescription
    ? description
    : `${description.slice(0, 100)}...`;

  const toggleDescriptionVisibility = () => {
    setShowFullDescription((prevState) => !prevState);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <ProfileTitle ProfilePic={Circle} profileName={profileName} timePosted={timePosted} />
        <img src={Movie} alt="Movie" className="w-full h-56 object-cover" />
        <div className="absolute bottom-0 left-0 p-4">
          <div className="flex space-x-2">
            <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500">
              <ThumbsUp className="w-5 h-5" />
            </button>
            <button className="flex items-center space-x-1 text-gray-500 hover:text-red-500">
              <ThumbsDown className="w-5 h-5" />
            </button>
            <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500">
              <MessageCircle className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="font-bold">{fullName}</div>
        <div className="text-gray-600">
          {truncatedDescription}
          {description.length > 100 && (
            <button
              className="text-blue-500 hover:text-blue-700 ml-2"
              onClick={toggleDescriptionVisibility}>
              <ChevronDown
                className={`w-4 h-4 inline-block transition-transform ${
                  showFullDescription ? "rotate-180" : ""
                }`}
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Content;
