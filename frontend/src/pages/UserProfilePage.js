import React, { useState, useEffect } from "react";
import OtherProfileHeader from "../components/userProfileHeader";
import profilePicFiller from "../assets/profilePic.jpg";
import Content from "../components/Content";
import movieVert from "../assets/fillerVert.jpg";
import Cookies from "js-cookie";
import { useParams } from 'react-router-dom';
// import ProfileMovieBtn from "../components/ui/profileMovieBtn";

function UserProfilePage() {
  const { uid } = useParams();
  const [user, setUser] = useState([]);
  const [ratings,setRatings] = useState([]);
  const [favourites,setFavourites] = useState([]);
  const [watched,setWatched] = useState([]);
  const [watchLater, setWatchLater] = useState([]);
  const [followers,setFollowers] = useState([]);
  const [following,setFollowing] = useState([]);
  const [similarUsers,setSimilarUsers] = useState([]);
  const checkImageURL = async (url, defaultURL) => {
    try {
      const response = await fetch(url);
      if (response.status === 200) {
        return url;
      } else {
        return defaultURL;
      }
    } catch (error) {
      return defaultURL;
    }
  };
  
  useEffect(() => {
    const fetchUser = async(uid) => {
      try {
        const res = await fetch(`http://localhost:3001/api/users/${uid}`);
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setUser([]);
      }
    };

    const fetchRatings = async(uid) => {
      try {
        const res = await fetch(`http://localhost:3001/api/ratings/ratingsByUser/${uid}`);
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        setRatings(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setRatings([]);
      }
    };
    
    const fetchFavourites = async(uid) => {
      try {
        const res = await fetch(`http://localhost:3001/api/users/${uid}/favourites`);
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        const updatedData = await Promise.all(
          data.map(async (r) => ({
            ...r,
            poster_link: await checkImageURL(
              `https://image.tmdb.org/t/p/w500${r.poster_link}`,
              "https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg"
            ),
          }))
        );
        setFavourites(updatedData);
      } catch (err) {
        console.error("Fetch error:", err);
        setFavourites([]);
      }
    };

    const fetchWatched = async(uid) => {
      try {
        const res = await fetch(`http://localhost:3001/api/users/${uid}/watched`);
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        const updatedData = await Promise.all(
          data.map(async (r) => ({
            ...r,
            poster_link: await checkImageURL(
              `https://image.tmdb.org/t/p/w500${r.poster_link}`,
              "https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg"
            ),
          }))
        );
        setWatched(updatedData);
      } catch (err) {
        console.error("Fetch error:", err);
        setWatched([]);
      }
    };
    const fetchWatchLater = async(uid) => {
      try {
        const res = await fetch(`http://localhost:3001/api/users/${uid}/watch_later`);
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        const updatedData = await Promise.all(
          data.map(async (r) => ({
            ...r,
            poster_link: await checkImageURL(
              `https://image.tmdb.org/t/p/w500${r.poster_link}`,
              "https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg"
            ),
          }))
        );
        setWatchLater(updatedData);
      } catch (err) {
        console.error("Fetch error:", err);
        setWatchLater([]);
      }
    };
    const fetchFollowers = async(uid) => {
      try {
        const res = await fetch(`http://localhost:3001/api/users/${uid}/followers`);
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        const updatedData = await Promise.all(
          data.map(async (r) => ({
            ...r,
            poster_link: await checkImageURL(
              `https://image.tmdb.org/t/p/w500${r.poster_link}`,
              "https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg"
            ),
          }))
        );
        setFollowers(updatedData);
      } catch (err) {
        console.error("Fetch error:", err);
        setWatchLater([]);
      }
    };
    const fetchFollowing = async(uid) => {
      try {
        const res = await fetch(`http://localhost:3001/api/users/${uid}/following`);
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        const updatedData = await Promise.all(
          data.map(async (r) => ({
            ...r,
            poster_link: await checkImageURL(
              `https://image.tmdb.org/t/p/w500${r.poster_link}`,
              "https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg"
            ),
          }))
        );
        setFollowing(updatedData);
      } catch (err) {
        console.error("Fetch error:", err);
        setWatchLater([]);
      }
    };
    const fetchSimilarTaste = async(uid) => {
      try {
        const res = await fetch(`http://localhost:3001/api/users/${uid}/similarTaste`);
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        setSimilarUsers(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setSimilarUsers([]);
      }
    };
    const currUser = uid;
    fetchUser(currUser);
    fetchRatings(currUser);
    fetchFavourites(currUser);
    fetchWatched(currUser);
    fetchWatchLater(currUser);
    fetchFollowers(currUser);
    fetchFollowing(currUser);
    fetchSimilarTaste(currUser);
    console.log(user);
  }, []);

  return (
    <div className="w-5/6 ml-auto p-12">
      <div className="flex flex-col justify-start">
        <div className="flex justify-center mb-10">
            <OtherProfileHeader
              profilePic={profilePicFiller}
              profileName={uid}
              username={user.username}
              numPosts={ratings.length}
              numFollowers={followers.length}
              numFollowing={following.length}
              bioDescription="i love food and movies"
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
