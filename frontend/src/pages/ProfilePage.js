import React, { useState, useEffect } from "react";
import ProfileHeader from "../components/profileHeader";
import OtherProfileHeader from "../components/userProfileHeader";
import profilePicFiller from "../assets/profilePic.jpg";
import Content from "../components/Content";
import movieVert from "../assets/fillerVert.jpg";
import Cookies from "js-cookie";
import { posterLinkToImgURL } from "../utils";
import { useNavigate } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import RatingCard from "../components/RatingCard";
// import ProfileMovieBtn from "../components/ui/profileMovieBtn";

function Profile() {
  const navigate = useNavigate(); // Use navigate for programmatic navigation
  const [ratings,setRatings] = useState([]);
  const [favourites,setFavourites] = useState([]);
  const [watched,setWatched] = useState([]);
  const [watchLater, setWatchLater] = useState([]);
  const [followers,setFollowers] = useState([]);
  const [following,setFollowing] = useState([]);
  const [similarUsers,setSimilarUsers] = useState([]);
  const [similarUserNames,setSimilarUserNames] = useState([]);
  const [userName, setUserName] = useState([]);
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
  
  const fetchUserNameByUid = async (uid) => {
    try {
      const res = await fetch(`http://localhost:3001/api/users/${uid}`);
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      const data = await res.json();
      return data.username;
    } catch (err) {
      console.error("Fetch error:", err);
      return "Unknown User"; // Default value if there's an error
    }
  };

  useEffect(() => {
    const fetchSimilarUserNames = async () => {
      try {
        const usernames = await Promise.all(similarUsers.map(user => fetchUserNameByUid(user.uid)));
        setSimilarUserNames(usernames);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    if (similarUsers.length > 0) {
      fetchSimilarUserNames();
    }
  }, [similarUsers]);


  useEffect(() => {
    const fetchRatings = async (signedInUser) => {
      try {
        const res = await fetch(`http://localhost:3001/api/ratings/ratingsByUser/${signedInUser}`);
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
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
    const fetchFavourites = async (signedInUser) => {
      try {
        const res = await fetch(`http://localhost:3001/api/users/${signedInUser}/favourites`);
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
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

    const fetchWatchLater = async (signedInUser) => {
      try {
        const res = await fetch(`http://localhost:3001/api/users/${signedInUser}/watch_later`);
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        const updatedData = await Promise.all(
          data.map(async (r) => ({
            ...r,
            poster_link: await posterLinkToImgURL(r.poster_link),
          }))
        );
        setWatchLater(updatedData);
        console.log(updatedData);
      } catch (err) {
        console.error("Fetch error:", err);
        setWatchLater([]);
      }
    };
    const fetchFollowers = async (signedInUser) => {
      try {
        const res = await fetch(`http://localhost:3001/api/users/${signedInUser}/followers`);
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        const updatedData = await Promise.all(
          data.map(async (r) => ({
            ...r,
            poster_link: await posterLinkToImgURL(r.poster_link),
          }))
        );
        setFollowers(updatedData);
      } catch (err) {
        console.error("Fetch error:", err);
        setWatchLater([]);
      }
    };
    const fetchFollowing = async (signedInUser) => {
      try {
        const res = await fetch(`http://localhost:3001/api/users/${signedInUser}/following`);
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        const updatedData = await Promise.all(
          data.map(async (r) => ({
            ...r,
            poster_link: await posterLinkToImgURL(r.poster_link),
          }))
        );
        setFollowing(updatedData);
      } catch (err) {
        console.error("Fetch error:", err);
        setWatchLater([]);
      }
    };
    const fetchSimilarTaste = async (signedInUser) => {
      try {
        const res = await fetch(`http://localhost:3001/api/users/${signedInUser}/similarTaste`);
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        // console.log("similar users",data);
        setSimilarUsers(data);
        // const usernames = await Promise.all(similarUsers.map(user => fetchUserNameByUid(user.uid)));
        // setSimilarUserNames(usernames);
      } catch (err) {
        console.error("Fetch error:", err);
        setSimilarUsers([]);
      }
    };
    const fetchUserName = async (signedInUser) => {
      try {
        const res = await fetch(`http://localhost:3001/api/users/${signedInUser}`);
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        console.log(data);
        setUserName(data.username);
      } catch (err) {
        console.error("Fetch error:", err);
        setUserName([]);
      }
    };
    const currUser = Cookies.get("signedInUser");
    fetchRatings(currUser);
    fetchFavourites(currUser);
    fetchWatchLater(currUser);
    fetchFollowers(currUser);
    fetchFollowing(currUser);
    fetchSimilarTaste(currUser);
    fetchUserName(currUser);
    // console.log(Cookies.get("signedInUser"));
    console.log("similar user names",similarUserNames);
  }, []);


  return (
    <div className="w-5/6 ml-auto p-12">
      <div className="flex flex-col justify-start">
        <div className="w-1/4 flex flex-row items-center mb-8">
          <ProfileHeader
            profilePic={profilePicFiller}
            profileName={Cookies.get("signedInUser")}
            username={userName}
            numPosts={ratings.length}
            numFollowers={followers.length}
            numFollowing={following.length}
            bioDescription="i love food and movies"
          />
        </div>
        <div className="mb-20">
          <h3 className="text-2xl font-bold mb-4">Your Ratings</h3>
          <div className="flex flex-row overflow-x-auto space-x-4 no-scrollbar overflow-y-auto">
            {ratings.map((r, i) => (
              <RatingCard
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
          <h3 className="text-2xl font-bold mb-4">Users Who Have Similar Taste</h3>
          <div className="flex flex-row overflow-x-auto space-x-4 no-scrollbar overflow-y-auto">
            {similarUsers.map((r, i) => (
              <button
                key={i}
                onClick={() => navigate(`/user/${user.uid}`)}
                className="bg-blue-500 text-white px-4 py-2 rounded">
                {similarUserNames[i]}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-20">
          <h3 className="text-2xl font-bold mb-4">Your Favourites</h3>
          <div className="flex flex-row overflow-x-auto space-x-4 no-scrollbar overflow-y-auto">
            {favourites.map((r, i) => (
              <RatingCard
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
          <h3 className="text-2xl font-bold mb-4">Watch Later</h3>
          <div className="flex flex-row overflow-x-auto space-x-4 no-scrollbar overflow-y-auto">
            {watchLater.map((r, i) => (
              <MovieCard key={r.mid} movieInfo={r} />
            ))}
          </div>
        </div>{" "}
        */}
      </div>
    </div>
  );
}

export default Profile;
