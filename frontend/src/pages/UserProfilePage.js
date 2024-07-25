import React, { useState, useEffect } from "react";
import OtherProfileHeader from "../components/userProfileHeader";
import profilePicFiller from "../assets/profilePic.jpg";
import Cookies from "js-cookie";
import { useParams } from 'react-router-dom';
import RatingCard from "../components/RatingCard";
import { posterLinkToImgURL } from "../utils";
import MovieCard from "../components/MovieCard";

function UserProfilePage() {
  const { uid } = useParams(); // Profile being viewed
  const currUser = Cookies.get("signedInUser"); // Currently logged-in user
  const [user, setUser] = useState({});
  const [ratings, setRatings] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false); // Track follow state
  const [favourites, setFavourites] = useState([]);

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
        const updatedData = await Promise.all(
          data.map(async (r) => ({
            ...r,
            poster_link: await posterLinkToImgURL(r.poster_link),
          }))
        );
        setRatings(updatedData);
      } catch (err) {
        console.error("Fetch error:", err);
        setRatings([]);
      }
    };

    const fetchFavourites = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/users/${uid}/favourites`);
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const data = await res.json();
        const updatedData = await Promise.all(
          data.map(async (r) => ({
            ...r,
            poster_link: await posterLinkToImgURL(r.poster_link),
          }))
        );
        setFavourites(updatedData);
      } catch (err) {
        console.error("Fetch error:", err);
        setFavourites([]);
      }
    };

    fetchUserData();
    fetchRatings();
    fetchFavourites();
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
              <RatingCard
                key={i}
                ratingInfo={{
                  uid: r.uid,
                  mid: r.mid,
                  score: r.score,
                  rating_text: r.rating_text,
                  date_posted: r.date_posted,
                }}
                movieInfo={{
                  title: r.title,
                  release_date: r.release_date,
                  runtime: r.runtime,
                  description: r.description,
                  poster_link: r.poster_link,
                }}
                username={r.username}
              />
            ))}
          </div>
        </div>
        <div className="mb-20">
          <h3 className="text-2xl font-bold mb-4">Their Favourites</h3>
          <div className="flex flex-row overflow-x-auto space-x-4 no-scrollbar overflow-y-auto">
            {favourites.map((f, i) => (
              <MovieCard
                key={i}
                movieInfo={{
                  mid: f.mid,
                  title: f.title,
                  release_date: f.release_date,
                  runtime: f.runtime,
                  description: f.description,
                  poster_link: f.poster_link,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfilePage;
