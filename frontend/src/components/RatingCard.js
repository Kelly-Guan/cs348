import React, { useEffect, useState } from "react";
import { ThumbsUp, ThumbsDown, ChevronDown } from "lucide-react";
import ProfileTitle from "./ui/profileTitle";
import Cookies from "js-cookie";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { posterLinkToImgURL } from "../utils";

function RatingCard({ ratingInfo, movieInfo, username, cast, genres }) {
  const navigate = useNavigate();
  const reviewer_uid = ratingInfo.uid;
  const { mid, score, rating_text, date_posted } = ratingInfo;
  const { title, release_date, runtime, description, poster_link } = movieInfo;

  const signedInUser = Cookies.get("signedInUser");
  const isSignedIn = signedInUser != undefined;

  const [showFullDescription, setShowFullDescription] = useState(false);

  const truncatedDescription = showFullDescription ? rating_text : `${rating_text.slice(0, 100)}`;

  const toggleDescriptionVisibility = () => {
    setShowFullDescription((prevState) => !prevState);
  };

  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isDownvoted, setIsDownvoted] = useState(false);

  const upvoteOnClick = async () => {
    if (!isSignedIn) return;
    try {
      const response = await fetch(
        `http://localhost:3001/api/ratings/vote?mid=${mid}&reviewer_uid=${signedInUser}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            voter_uid: signedInUser,
            reviewer_uid: reviewer_uid,
            mid: mid,
            vote: true,
          }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setIsUpvoted(true);
      setIsDownvoted(false);
    } catch (err) {
      console.log(err);
    }
  };

  const downvoteOnClick = async () => {
    if (!isSignedIn) return;
    try {
      const response = await fetch(`http://localhost:3001/api/ratings/vote?mid=${mid}&reviewer_uid=${signedInUser}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          voter_uid: signedInUser,
          reviewer_uid: reviewer_uid,
          mid: mid,
          vote: false
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setIsUpvoted(false);
      setIsDownvoted(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!isSignedIn) return;
    const getHasVoted = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/users/hasVotedOn?mid=${mid}&reviewer_uid=${reviewer_uid}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        if (data.vote != null) {
          if (data.vote) {
            setIsUpvoted(true);
            setIsDownvoted(false);
          } else {
            setIsUpvoted(false);
            setIsDownvoted(true);
          }
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getHasVoted();
  }, [isSignedIn, mid, reviewer_uid]);


  return (
    <div
      className="max-w-md min-w-96 bg-white rounded-lg p-6 overflow-hidden border-2 border-gray-100 cursor-pointer"
      onClick={() => navigate(`/movies/${ratingInfo.mid}`)}
    >
      {username && <ProfileTitle profileName={username} timePosted={date_posted.split("T")[0]} />}

      <div className="mt-4 mx-auto max-w-full">
        <img
          src={poster_link}
          alt={`${title} poster`}
          className="w-full h-auto max-w-96 object-cover rounded"
        />
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="flex space-x-2">
          <button
            className={`flex items-center space-x-1  hover:text-blue-500 ${
              isUpvoted ? "text-blue-500" : "text-gray-500"
            }`}
            aria-label="Like"
            onClick={(e) => {
              e.stopPropagation();
              upvoteOnClick();
            }}
          >
            <ThumbsUp className="w-5 h-5" />
          </button>

          <button
            className={`flex items-center space-x-1 hover:text-red-500 ${
              isDownvoted ? "text-red-500" : "text-gray-500"
            }`}
            aria-label="Dislike"
            onClick={(e) => {
              e.stopPropagation();
              downvoteOnClick();
            }}
          >
            <ThumbsDown className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex">
          <div className="font-bold text-lg mr-2">{title}</div>
          <div className="flex">
            {Array.from({ length: score }).map((_, index) => (
              <Star key={index} className="text-yellow-500" />
            ))}
          </div>
        </div>

        <div className="text-gray-600 mt-2">
          {truncatedDescription}
          {rating_text.length > 100 && (
            <button
              className="text-blue-500 hover:text-blue-700 ml-2"
              onClick={(e) => {
                e.stopPropagation();
                toggleDescriptionVisibility();
              }}
              aria-label="Toggle description visibility"
            >
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

export default RatingCard;
