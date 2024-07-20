import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Home, Search, Compass, PlusCircle, User, LogOut, LogIn } from "lucide-react";
import NavBarButtons from "./ui/navBarButtons";
import SearchMovieReview from "./searchMovieReview";
import Cookies from "js-cookie";

function NavBar() {
  const [showSearchMovieReviewPopup, setShowSearchMovieReviewPopup] = useState(false);
  

  const handleOpenSearchMovieReview = () => {
    setShowSearchMovieReviewPopup(true);
  };

  const handleCloseSearchMovieReview = () => {
    setShowSearchMovieReviewPopup(false);
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
          <button onClick={handleOpenSearchMovieReview} className="mb-4 ml-2">
            <NavBarButtons Icon={PlusCircle} label="Create" />
          </button>
        </div>
        <div className="flex flex-col items-start">
          {Cookies.get("signedInUser") !== undefined ? (
            <Link to="/profile" className="mb-4 ml-2">
              <NavBarButtons Icon={User} label="Profile" />
            </Link>
          ) : (
            <></>
          )}
          {Cookies.get("signedInUser") !== undefined ? (
             
            <Link to="/logout" className="mb-4 ml-2">
              <NavBarButtons Icon={LogOut} label="Log Out" />
            </Link>
          ) : (<Link to="/signup" className="mb-4 ml-2">
              <NavBarButtons Icon={LogIn} label="Sign In" />
            </Link>
          )
        }

        </div>
      </div>
      {showSearchMovieReviewPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <SearchMovieReview onClose={handleCloseSearchMovieReview} />
        </div>
      )}
    </div>
  );
}

export default NavBar;