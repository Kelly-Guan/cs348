import React, { useState, useEffect } from "react";
import GenreDropdown from "../components/genreDropDown";
import Content from "../components/Content";
import Cookies from "js-cookie";
import { posterLinkToImgURL } from "../utils";
const genres = ["Comedy", "Horror", "Drama", "Romance", "Action", "Science Fiction"]; // Add more genres as needed

function Home() {
  const [selectedGenre, setSelectedGenre] = useState("Genres");
  const [recentReleases, setRecentReleases] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [recentRatings, setRecentRatings] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [following,setFollowing] = useState([]);
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

    // const fetcher = async(api_url, setter) => {
    //   try {
    //     const results = await fetch("http://localhost:3001/api/movies/recentReleases",{credentials:'include'});
    //     if (!results.ok) {
    //       throw new Error(`HTTP error! Status: ${results.status}`);
    //     }

    //     const json_response = await results.json();
    //     const updated_response = await Promise.all(
    //       json_response.data.map(async (r) => ({
    //         ...r,
    //         poster_link: await posterLinkToImgURL(r.poster_link),
    //       }))
    //     );

    //     setter(updated_response);
    //     console.log(updated_response);
    //   } catch (err) {
    //     console.error("Failed on: ", api_url)
    //     console.error("Fetch error:", err);
    //     setRecentReleases([]);
    //   }
    // }
    // const currUser = Cookies.get("signedInUser");
    // fetcher("http://localhost:3001/api/movies/recentReleases", setRecentReleases);
    // fetcher("http://localhost:3001/api/ratings/recentRatings", setRecentRatings);
    // fetcher("http://localhost:3001/api/movies/popularMovies", setPopularMovies);
    
    // fetcher(`http://localhost:3001/api/users/${currUser}/recommendedForYou`, setRecommendedMovies);

    const fetchRecentReleases = async () => {
      try {
        const recentReleasesRes = await fetch("http://localhost:3001/api/movies/recentReleases");
        if (!recentReleasesRes.ok) {
          throw new Error(`HTTP error! Status: ${recentReleasesRes.status}`);
        }

        const recentReleasesResponse = await recentReleasesRes.json();
        const updatedRecentReleases = await Promise.all(
          recentReleasesResponse.data.map(async (r) => ({
            ...r,
            poster_link: await posterLinkToImgURL(r.poster_link),
          }))
        );

        setRecentReleases(updatedRecentReleases);
      } catch (err) {
        console.error("Fetch error:", err);
        setRecentReleases([]);
      }
    };

    const fetchPopularMovies = async () => {
      try {
        const popularMoviesRes = await fetch("http://localhost:3001/api/movies/popularMovies");
        if (!popularMoviesRes.ok) {
          throw new Error(`HTTP error! Status: ${popularMoviesRes.status}`);
        }

        const popularMoviesResponse = await popularMoviesRes.json();
        const updatedPopularMovies = await Promise.all(
          popularMoviesResponse.data.map(async (r) => ({
            ...r,
            poster_link: await posterLinkToImgURL(r.poster_link),
          }))
        );

        setPopularMovies(updatedPopularMovies);
      } catch (err) {
        console.error("Fetch error:", err);
        setPopularMovies([]);
      }
    };

    const fetchRecentRatings = async () => {
      try {
        const recentRatingsRes = await fetch("http://localhost:3001/api/ratings/recentRatings");
        if (!recentRatingsRes.ok) throw new Error(`HTTP error! Status: ${recentRatingsRes.status}`);
      
        const recentRatingsResponse = await recentRatingsRes.json();
        const updatedRecentRatings = await Promise.all(
          recentRatingsResponse.data.map(async (r) => ({
            ...r,
            poster_link: await posterLinkToImgURL(r.poster_link),
          }))
        );
        setRecentRatings(updatedRecentRatings);
      } catch (err) {
        console.error("Fetch error:", err);
        setRecentReleases([]);
      }
    };

    const fetchRecommendedForYou = async (signedInUser) => {
      try {
        const res = await fetch(
          `http://localhost:3001/api/users/${signedInUser}/recommendedForYou`
        );
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
        setRecommendedMovies(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setRecommendedMovies([]);
      }
    };

    const fetchFollowing = async(signedInUser) => {
      try {
        const res = await fetch(`http://localhost:3001/api/users/${signedInUser}/following`);
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

    const currUser = Cookies.get("signedInUser");
    fetchRecentReleases();
    fetchPopularMovies();
    fetchRecentRatings();
    fetchRecommendedForYou(currUser);
  }, []);

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
  };

  return (
    <div className="w-5/6 ml-auto p-12">
      <div className="flex flex-col justify-start">
        <div className="w-1/4 flex flex-row items-center mb-8">
          <h3 className="text-4xl font-bold pr-10 ">Home</h3>
          <GenreDropdown name="Genre" genres={genres} onSelect={handleGenreSelect} />
        </div>

        <div className="mb-20">
          <h3 className="text-2xl font-bold mb-4">Recent Releases</h3>
          <div className="flex flex-row overflow-x-auto space-x-4 no-scrollbar overflow-y-auto">
            {recentReleases.map((r, i) => (
              <Content
                key={i}
                title={r.title}
                description={r.description}
                imageURL={r.poster_link}
              />
            ))}
          </div>
        </div>
        <div className="mb-20">
          <h3 className="text-2xl font-bold mb-4">Recent Ratings</h3>
          <div className="flex flex-row overflow-x-auto space-x-4 no-scrollbar overflow-y-auto">
            {recentRatings.map((r, i) => (
              <Content
                key={i}
                title={r.title}
                description={r.rating_text}
                imageURL={r.poster_link}
              />
            ))}
          </div>
        </div>
        <div className="mb-20">
          <h3 className="text-2xl font-bold mb-4">Popular Movies</h3>
          <div className="flex flex-row overflow-x-auto space-x-4 no-scrollbar overflow-y-auto">
            {popularMovies.map((r, i) => (
              <Content
                key={i}
                title={r.title}
                description={r.description}
                imageURL={r.poster_link}
              />
            ))}
          </div>
        </div>

        <div className="mb-20">
          <h3 className="text-2xl font-bold mb-4">Recommended For You</h3>
          <div className="flex flex-row overflow-x-auto space-x-4 no-scrollbar overflow-y-auto">
            {recommendedMovies.map((r, i) => (
              <Content
                key={i}
                title={r.title}
                description={r.description}
                imageURL={r.poster_link}
              />
            ))}
          </div>
        </div>

        <div className="mb-20">
          <h3 className="text-2xl font-bold mb-4">Friends Watching</h3>
          <div className="flex flex-row overflow-x-auto space-x-4 no-scrollbar overflow-y-auto">
            {following.map((r, i) => (
              <Content
                key={i}
                title={r.title}
                description={r.description}
                imageURL={r.poster_link}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
