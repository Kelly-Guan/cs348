import React, { useState, useEffect } from "react";
import logo from "./favicon.ico";
import NavBar from "./components/Navbar"
import Home from "./pages/HomePage"
import Search from "./pages/SearchPage"


function App() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Data received from server:", data);
        setResponse(JSON.stringify(data));
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setResponse("Error: " + err.message);
      });
  }, []);
  

  return (
    <div className="App">
      <header className="App-header"></header>
      <Home/>
      <Search/>


      
      {/* <div>
        <h1>Response from server:</h1>
        <p>{response}</p>
      </div> */}
    </div>
  );
}

export default App;
