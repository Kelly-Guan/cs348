import React, { useState, useEffect } from "react";

function App() {
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code>.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
  const [response, setResponse] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setResponse(JSON.stringify(data));
      })
      .catch((err) => {
        setResponse("Error: " + err);
      });
  }, []);

  return (
    <div>
      <h1>Response from server:</h1>
      <p>{response}</p>
    </div>
  );
}

export default App;
