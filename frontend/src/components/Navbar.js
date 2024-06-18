import React from "react";
import { Link } from "react-router-dom";
import { Home, Search, Compass, PlusCircle, User, LogOut } from "lucide-react";
import NavBarButtons from "./ui/navBarButtons";

function NavBar() {
  return (
    <div className="fixed flex flex-col top-0 left-0 w-1/6 h-screen bg-gray-100 p-4 items-center">
      <h1 className="text-3xl font-bold mb-4 mt-5">Lime Light</h1>
      <div className="h-4/5 mt-10 flex flex-col justify-between items-left">
        <div className="flex flex-col items-left">
          <Link to="/" className="mb-4">
            <NavBarButtons Icon={Home} label="Home" />
          </Link>
          <Link to="/search" className="mb-4">
            <NavBarButtons Icon={Search} label="Search" />
          </Link>
          <Link to="/explore" className="mb-4">
            <NavBarButtons Icon={Compass} label="Explore" />
          </Link>
          <Link to="/create" className="mb-4">
            <NavBarButtons Icon={PlusCircle} label="Create" />
          </Link>
        </div>
        <div className="flex flex-col items-left">
          <Link to="/profile" className="mb-4">
            <NavBarButtons Icon={User} label="Profile" />
          </Link>
          <Link to="/logout" className="mb-4">
            <NavBarButtons Icon={LogOut} label="Log Out" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
