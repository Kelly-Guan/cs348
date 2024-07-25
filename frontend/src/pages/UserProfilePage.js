// UserProfilePage.js
import React, { useState, useEffect } from "react";
import OtherProfileHeader from "../components/userProfileHeader";
import profilePicFiller from "../assets/profilePic.jpg";
import Content from "../components/Content";
import Cookies from "js-cookie";
import { useParams } from 'react-router-dom';

function UserProfilePage() {
  const { uid } = useParams(); // Profile being viewed
  const currUser = Cookies.get("signedInUser"); // Currently logged-in user
  const [user, setUser] = useState({});
  const [ratings, setRatings] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false); // Track follow state

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/users/${uid}`);
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const data = await res.json();
        setUser(data);

        // Fetch following list of the current user
        const followRes = await fetch(`http://localhost:3001/api/users/${currUser}/following`);
        if (followRes.ok) {
          const followData = await followRes.json();
          // Check if the viewed profile's uid is in the list of followed users
          setIsFollowing(followData.some(follow => follow.following_uid === uid));
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setUser({});
      }
    };

    const fetchRatings = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/ratings/ratingsByUser/${uid}`);
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const data = await res.json();
        setRatings(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setRatings([]);
      }
    };

    fetchUserData();
    fetchRatings();
  }, [uid, currUser]);

  const handleFollow = async () => {
    const action = isFollowing ? "unfollow" : "follow";
    const method = isFollowing ? "DELETE" : "POST";
    try {
      const res = await fetch(`http://localhost:3001/api/users/${action}?following_uid=${uid}&follower_uid=${currUser}`, {
        method: method,
      });
      if (res.ok) {
        setIsFollowing(!isFollowing); // Toggle follow state
        setFollowers((prev) => isFollowing ? prev - 1 : prev + 1); // Update followers count
      }
    } catch (error) {
      console.error("Error updating follow status:", error);
    }
  };

  return (
    <div className="w-5/6 ml-auto p-12">
      <div className="flex flex-col justify-start">
        <div className="flex justify-center mb-10">
          <OtherProfileHeader
            profilePic={profilePicFiller}
            profileName={user.username}
            username={user.username}
            numPosts={ratings.length}
            numFollowers={followers.length}
            numFollowing={following.length}
            bioDescription="I love food and movies"
            isFollowing={isFollowing} // Pass follow state
            onFollowToggle={handleFollow} // Pass the follow handler
          />
        </div>
        <div className="mb-20">
          <h3 className="text-2xl font-bold mb-4">Their Ratings</h3>
          <div className="flex flex-row overflow-x-auto space-x-4 no-scrollbar overflow-y-auto">
            {ratings.map((r, i) => (
              <Content
                key={i}
                title={r.title}
                description={r.rating_text}
                profileName={r.username}
                imageURL={r.poster_link}
                timePosted={r.date_posted.split("T")[0]}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfilePage;
