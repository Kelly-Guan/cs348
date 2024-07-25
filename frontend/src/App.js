// Mostly for handling routes or other behind the scene globals
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";

import Explore from "./pages/ExplorePage";
import Home from "./pages/HomePage";
import Search from "./pages/SearchPage";
import Profile from "./pages/ProfilePage";
import SignUp from "./pages/SignUpPage";
import Login from "./pages/Login";
import LogOut from "./pages/LogOut";
import User from "./pages/UserProfilePage";
import MovieDetailPage from "./pages/MovieDetailPage";

import Test from "./pages/TestPage";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/search" element={<Search />} />
          <Route exact path="/explore" element={<Explore />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/logout" element={<LogOut />} />
          <Route exact path="/test" element={<Test />} />
          <Route exact path="/user/:uid" element={<User />} />
          <Route path="/movies/:mid" element={<MovieDetailPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
