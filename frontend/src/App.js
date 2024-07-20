// Mostly for handling routes or other behind the scene globals
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from './Layout';

// import './index.css';
// import App from './App';
// import CreateAccount from './pages/CreateAccountPage';
import Explore from './pages/ExplorePage';
import Home from './pages/HomePage';
// import Landing from './pages/LandingPage';
import Search from './pages/SearchPage';
import Profile from './pages/ProfilePage';
// import Create from './pages/CreatePage';
import SignUp from './pages/SignUpPage';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/search" element={<Search/>}/>
          <Route exact path="/explore" element={<Explore/>}/>
          <Route exact path="/profile" element={<Profile/>}/>
          <Route exact path="/login" element={<SignUp/>}/>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
