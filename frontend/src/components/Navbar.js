import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Home, Search, Compass, PlusCircle, User, LogOut } from "lucide-react";
import NavBarButtons from "./ui/navBarButtons";
import searchMovieReview from "./searchMovieReview";


function NavBar() {
  const [showSearchReviewPopUp, setSearchReviewPopUp] = useState(false); 
  const [showReadMoviePopup, setShowReadMoviePopup] = useState(false); 
  const [showReviewPopup, setShowReviewPopup] = useState(false);


  const handleCloseSearchReviewPopup = () => {
    setSearchReviewPopUp(false);
  };

  const handleOpenSearchReviewPopup = () => {
    setSearchReviewPopUp(false);
    setShowReadMoviePopup(true);
  };

  const handleCloseReadMoviePopup = () => {
    setShowReadMoviePopup(false);
  };

  const handleOpenReviewPopup = () => {
    setShowReadMoviePopup(false);
    setShowReviewPopup(true);
  };

  const handleCloseReviewPopup = () => {
    setShowReviewPopup(false);
  };


  return (
    <div className="fixed flex flex-col top-0 left-0 w-1/6 h-screen bg-gray-100 p-4 items-center">
      <h1 className="text-3xl font-bold mb-4 mt-5 ml-2">Lime Light</h1>
      <div className="h-4/5 mt-10 flex flex-col justify-between items-start">
        <div className="flex flex-col items-start">
          <Link to="/" className="mb-4 ml-2">
            <NavBarButtons Icon={Home} label="Home" />
          </Link>
          <Link to="/search" className="mb-4 ml-2">
            <NavBarButtons Icon={Search} label="Search" />
          </Link>
          <Link to="/explore" className="mb-4 ml-2">
            <NavBarButtons Icon={Compass} label="Explore" />
          </Link>
          <Link to="/create" className="mb-4 ml-2">
            <NavBarButtons Icon={PlusCircle} label="Create"/>
          </Link>
        </div>
        <div className="flex flex-col items-start">
          <Link to="/profile" className="mb-4 ml-2">
            <NavBarButtons Icon={User} label="Profile" />
          </Link>
          <Link to="/logout" className="mb-4 ml-2">
            <NavBarButtons Icon={LogOut} label="Log Out" />
          </Link>
        </div>
      </div>
{/* 
      {showSearchReviewPopUp && (
        <searchMovieReview
          movieImg={movieImg}
          movieTitle={movieTitle}
          movieTime={movieTime}
          movieDescription={movieDescription}
          movieCast={movieCast}
          movieGenre={movieGenre}
          onClose={handleCloseSearchReviewPopup}
          onAddReview={handleOpenSearchReviewPopup}
        />
      )}


      {showReadMoviePopup && (
        <ReadMovie
          movieImg={movieImg}
          movieTitle={movieTitle}
          movieTime={movieTime}
          movieDescription={movieDescription}
          movieCast={movieCast}
          movieGenre={movieGenre}
          onClose={handleCloseReadMoviePopup}
          onAddReview={handleOpenReviewPopup}
        />
      )}

      {showReviewPopup && (
        <CreateNewReview
          movieImgVert={movieImgVert}
          movieTitle={movieTitle}
          onClose={handleCloseReviewPopup}
        />
      )} */}
    </div>


    



  );
}

export default NavBar;