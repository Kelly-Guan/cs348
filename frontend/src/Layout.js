// Permanent window that all other pages are shown within
import React from "react";
import NavBar from "./components/Navbar";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col p-3">
      <NavBar />
      <main className="p-0">
        {children}
      </main>
    </div>
  );
};

export default Layout;
