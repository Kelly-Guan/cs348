// import React from 'react';
// import ReactDOM from 'react-dom';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import './index.css';
// import App from './App';
// import CreateAccount from './pages/CreateAccountPage';
// import Explore from './pages/ExplorePage';
// import Home from './pages/HomePage';
// import Landing from './pages/LandingPage';
// import LogIn from './pages/LogInPage';
// import Search from './pages/SearchPage';
// import Profile from './pages/ProfilePage';

// const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <Routes>
//         <Route exact path="/" element={<Landing/>} />
//         <Route path="/home" component={<Home/>} />
//         <Route path="/explore" component={<Explore/>} />
//         <Route path="/search" component={<Search/>} />
//         <Route path="/profile" component={<Profile/>} />
//         <Route path="/login" component={<LogIn/>} />
//         <Route path="/create-account" component={<CreateAccount/>} />
//         {/* Add more routes as needed */}
//         <Route component={<Landing/>} /> {/* Default route in case no match */}
//       </Routes>
//     </BrowserRouter>
//   </React.StrictMode>
// );

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>
);