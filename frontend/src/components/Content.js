import React, { useState } from "react";
import {Circle, ThumbsUp, ThumbsDown, MessageCircle, ChevronDown } from 'lucide-react';
import ProfileTitle from "./ui/profileTitle";


function Content({ profilePic, profileName, timePosted, fullName, description, imageURL, title }) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const truncatedDescription = showFullDescription
    ? description
    : `${description.slice(0, 100)}`;

  const toggleDescriptionVisibility = () => {
    setShowFullDescription((prevState) => !prevState);
  };

  return (
    <div className="min-w-96 bg-white rounded-lg p-6 overflow-hidden border-2 border-gray-100">
      {profileName === undefined ? (
        <></>
      ) : (
        <ProfileTitle ProfilePic={Circle} profileName={profileName} timePosted={timePosted} />
      )}

      <div className="mt-4 mx-auto max-w-full">
        <img src={imageURL} alt="Movie" className="w-full h-auto max-w-96 object-cover" />
      </div>

      <div className="flex justify-between items-end mt-4">
        <div>
          <p>{title}</p>
        </div>
        <div className="flex space-x-2">
          <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500">
            <ThumbsUp className="w-5 h-5" />
          </button>
          <button className="flex items-center space-x-1 text-gray-500 hover:text-red-500">
            <ThumbsDown className="w-5 h-5" />
          </button>
          {/* <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500">
            <MessageCircle className="w-5 h-5" />
          </button> */}
        </div>
      </div>
      <div className="mt-4">
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