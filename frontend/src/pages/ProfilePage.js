import React, { useState, useEffect } from "react";
import ProfileHeader from "../components/profileHeader";


import profilePicFiller from "../assets/profilePic.jpg";


function Profile() {
  useEffect(() => {
    fetch("http://localhost:3001/api/ratings/allRatings")
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
        <div className="flex justify-center">
            <ProfileHeader
                profilePic = {profilePicFiller}
                profileName = "Kelly Guan"
                username = "kellyg.png"
                numPosts = "5"
                numFollowers = "726"
                numFollowing = "1,123" 
                bioDescription = "i love food and movies"
            />
        </div>
      
    </div>
    </>
  );
}

export default Profile;
