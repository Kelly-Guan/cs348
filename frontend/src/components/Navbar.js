import React from "react";
import { Link } from "react-router-dom";
import { Home, Search, Compass, PlusCircle, User, LogOut } from "lucide-react";
import NavBarButtons from "./ui/navBarButtons";

function NavBar() {
  return (
    <nav className="max-w-screen-5xl flex flex-wrap items-center justify-between mx-auto p-4">
      <h1 className="text-3xl font-bold pr-2">Lime Light</h1>
      <div className="flex space-x-8">
        <Link to="/" className="text-gray-800">
          <NavBarButtons Icon={Home} label="Home" />
        </Link>
        <Link to="/search" className="text-gray-800">
          <NavBarButtons Icon={Search} label="Search" />
        </Link>
        <Link to="/explore" className="text-gray-800">
          <NavBarButtons Icon={Compass} label="Explore" />
        </Link>
        <Link to="/create" className="text-gray-800">
          <NavBarButtons Icon={PlusCircle} label="Create" />
        </Link>
        <Link to="/profile" className="text-gray-800">
          <NavBarButtons Icon={User} label="Profile" />
        </Link>
        <Link to="/logout" className="text-gray-800">
          <NavBarButtons Icon={LogOut} label="Log Out" />
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
