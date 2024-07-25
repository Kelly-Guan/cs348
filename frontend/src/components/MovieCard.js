import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

function MovieCard(props) {
  const { movieInfo, cast, genres } = props;
  const { mid, title, release_date, runtime, description, poster_link } = movieInfo;

  const [showFullDescription, setShowFullDescription] = useState(false);
  const truncatedDescription = showFullDescription
    ? description
    : `${description.slice(0, 100)}`;
  const toggleDescriptionVisibility = () => {
    setShowFullDescription((prevState) => !prevState);
  };

  return (
    // <Link to={`/movies/${mid}`} className="no-underline">
    <>
      <div className="max-w-md min-w-96 bg-white rounded-lg shadow-md p-6 overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300 cursor-pointer">
        <div className="flex justify-center">
          <img
            src={poster_link}
            alt={`${title} Poster`}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
        <div className="mt-4">
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          <div className="text-gray-600 mb-2">
            <span className="font-semibold">Release Date:</span>{" "}
            {new Date(release_date).toLocaleDateString()}
          </div>
          <div className="text-gray-600 mb-2">
            <span className="font-semibold">Runtime:</span> {runtime} minutes
          </div>
          {genres && (
            <div className="text-gray-600 mb-2">
              <span className="font-semibold">Genres:</span> {genres.join(", ")}
            </div>
          )}{" "}
          {cast && (
            <div className="text-gray-600 mb-2">
              <span className="font-semibold">Cast:</span> {cast.join(", ")}
            </div>
          )}
          <div className="text-gray-600">
            {truncatedDescription}
            {description.length > 100 && (
              <button
                className="text-blue-500 hover:text-blue-700 ml-2"
                onClick={(e) => {
                  e.preventDefault(); // Prevent navigation when clicking on the description toggle
                  toggleDescriptionVisibility();
                }}>
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
      </>
  );
}

export default MovieCard;
