import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { posterLinkToImgURL } from "../utils";
import MovieCard from "../components/MovieCard"; 

function MovieDetailPage() {
  const { mid } = useParams();
  const [movie, setMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3001/api/movies/movie?mid=${mid}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then(async (data) => {
        // Convert poster link to a full URL
        const updatedMovie = {
          ...data,
          poster_link: await posterLinkToImgURL(data.poster_link),
        };
        setMovie(updatedMovie);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });

    fetch(`http://localhost:3001/api/movies/moviesLikeThis/${mid}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        Promise.all(
          data.data.map(async (movie) => {
            const res = await fetch(`http://localhost:3001/api/movies/movie?mid=${movie.mid}`);
            if (res.ok) {
              const movieData = await res.json();
              return {
                ...movieData,
                poster_link: await posterLinkToImgURL(movieData.poster_link),
              };
            }
            return null;
          })
        ).then((movies) => {
          setSimilarMovies(movies.filter((m) => m)); 
        });
      })
      .catch((err) => {
        console.error("Error fetching similar movies:", err);
      });
  }, [mid]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const truncatedDescription = showFullDescription
    ? movie.description
    : `${movie.description.slice(0, 100)}...`;

  return (
    <div className="max-w-4xl mx-auto p-4">
      {movie && (
        <>
          <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
          <div className="flex justify-center mb-4">
            <img
              src={movie.poster_link}
              alt={`${movie.title} Poster`}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
          <div className="text-gray-700 mb-4">
            <p>
              <strong>Release Date:</strong> {new Date(movie.release_date).toLocaleDateString()}
            </p>
            <p>
              <strong>Runtime:</strong> {movie.runtime} minutes
            </p>
            {movie.genres && (
              <p>
                <strong>Genres:</strong> {movie.genres.join(", ")}
              </p>
            )}
            {movie.cast && (
              <p>
                <strong>Cast:</strong> {movie.cast.join(", ")}
              </p>
            )}
            <div className="text-gray-700 mt-2">
              <p>{truncatedDescription}</p>
              {movie.description.length > 100 && (
                <button
                  className="text-blue-500 hover:text-blue-700 ml-2"
                  onClick={() => setShowFullDescription(prevState => !prevState)}
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
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Movies Like This</h2>
            <div className="grid gap-x-3 gap-y-10 grid-cols-3">
              {similarMovies.map((movie) => (
                <MovieCard key={movie.mid} movieInfo={movie} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
export default MovieDetailPage;
