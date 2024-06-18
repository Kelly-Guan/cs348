import React from "react";

function NavBarButtons({ Icon, label }) {
  return (
    <button className="flex items-center justify-between w-28 p-2 my-2 text-left bg-gray-100 hover:bg-gray-200 transition duration-300">
      <Icon className="w-5 h-5 mr-2" />
      <span>{label}</span>
    </button>
  );
}

export default NavBarButtons;
