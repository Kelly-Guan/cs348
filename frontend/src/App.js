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

          <Route exact path="/test" element={<Test />} />

          <Route exact path="/user/:uid" element={<User />} />

        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

/*
INSERT INTO ratings (uid,mid,score,rating_text,date_posted) VALUES
(1,1,5,'This movie is awesome!','2024-06-12 13:23:00');

INSERT INTO votes (voter_uid, reviewer_uid, mid, vote) VALUES
(141, 1, 5, true);
*/