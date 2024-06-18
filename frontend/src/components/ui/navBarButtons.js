import React from "react";

function NavBarButtons({ Icon, label }) {
  return (
    <button className="flex items-center justify-between px-6 py-2 rounded-sm	 hover:bg-gray-300 transition duration-300">
      <Icon className="w-5 h-5 mr-2" />
      <span className="text-xl">{label}</span>
    </button>
  );
}

export default NavBarButtons;
