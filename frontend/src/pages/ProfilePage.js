import React, { useState, useEffect } from "react";
import ProfileHeader from "../components/profileHeader";
import profilePicFiller from "../assets/profilePic.jpg";
import Content from "../components/Content";
import movieVert from "../assets/fillerVert.jpg";
import Cookies from "js-cookie";
// import ProfileMovieBtn from "../components/ui/profileMovieBtn";

function Profile() {
  const [ratings,setRatings] = useState([]);
  const [favourites,setFavourites] = useState([]);
  const [watched,setWatched] = useState([]);
  const [watchLater, setWatchLater] = useState([]);
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
    const fetchRatings = async(signedInUser) => {
      try {
        const res = await fetch(`http://localhost:3001/api/ratings/ratingsByUser/${signedInUser}`);
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
        setRatings(updatedData);
      } catch (err) {
        console.error("Fetch error:", err);
        setRatings([]);
      }
    };
    const fetchFavourites = async(signedInUser) => {
      try {
        const res = await fetch(`http://localhost:3001/api/users/${signedInUser}/favourites`);
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

    const fetchWatched = async(signedInUser) => {
      try {
        const res = await fetch(`http://localhost:3001/api/users/${signedInUser}/favourites`);
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
    const currUser = Cookies.get("signedInUser");
    fetchRatings(currUser);
    fetchFavourites(currUser);
    console.log(Cookies.get("signedInUser"));
  });

  return (
    <div className="w-5/6 ml-auto p-12">
      <div className="flex flex-col justify-start">
        <div className="w-1/4 flex flex-row items-center mb-8">
          <h3 className="text-4xl font-bold pr-10 ">{Cookies.get("signedInUser")}</h3>
          {/* <GenreDropdown genres={genres} onSelect={handleGenreSelect} /> */}
        </div>

          <div className="mb-20">
            <h3 className="text-2xl font-bold mb-4">Your Ratings</h3>
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
          {/* <div className="mb-20">
            <h3 className="text-2xl font-bold mb-4">Users Who Have Similar Taste</h3>
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
          </div> */}
          <div className="mb-20">
            <h3 className="text-2xl font-bold mb-4">Your Favourites</h3>
            <div className="flex flex-row overflow-x-auto space-x-4 no-scrollbar overflow-y-auto">
              {favourites.map((r, i) => (
                <Content
                  key={i}
                  title={r.title}
                  description={r.description}
                  imageURL={r.poster_link}
                  timePosted={r.release_date}
                />
              ))}
            </div>
          </div>
          <div className="mb-20">
            <h3 className="text-2xl font-bold mb-4">Watch Later</h3>
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
          <div className="mb-20">
            <h3 className="text-2xl font-bold mb-4">Watched</h3>
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
          <div className="mb-20">
            <h3 className="text-2xl font-bold mb-4">Follower</h3>
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
          <div className="mb-20">
            <h3 className="text-2xl font-bold mb-4">Following</h3>
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

export default Profile;
