import React from "react";

function NavBarButtons({ Icon, label }) {
  return (
    <button className="flex items-center px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300 transition duration-300">
      <Icon className="w-6 h-6 mr-2" />
      <span className="text-xl">{label}</span>
    </button>
  );
}

export default NavBarButtons;
