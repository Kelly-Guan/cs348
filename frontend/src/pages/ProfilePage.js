import React, { useState, useEffect } from "react";
import ProfileHeader from "../components/profileHeader";
import profilePicFiller from "../assets/profilePic.jpg";
import movieVert from "../assets/fillerVert.jpg";
// import ProfileMovieBtn from "../components/ui/profileMovieBtn";

function Profile() {
  useEffect(() => {
    fetch("http://localhost:3001/api/ratings/ratingsByUser/10")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })

      .catch((err) => {
        console.error("Fetch error:", err);
      });
  }, []);

  return (
    <>
      <div className="w-5/6 ml-auto p-12">
        <div className="flex justify-center mb-10">
          <ProfileHeader
            profilePic={profilePicFiller}
            profileName="Kelly Guan"
            username="kellyg.png"
            numPosts="5"
            numFollowers="726"
            numFollowing="1,123"
            bioDescription="i love food and movies"
          />
        </div>
        {/* <div>
          <h3 className="text-2xl font-bold p-4">Recent Movies</h3>
          <div className="mb-20 w-full">
            <div className="grid gap-x-3 gap-y-10 grid-cols-3">
                <ProfileMovieBtn
                  movieImgVert={movieVert}
                  movieTitle="{review.movieTitle}"
                  reviewDescription="{review.reviewDescription}"
                  profileName="kellyg.png"
                  timePosted="aug 2023"
                  starRating="{review.starRating}"
                />
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}

export default Profile;
