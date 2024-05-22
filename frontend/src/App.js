import React, { useState, useEffect } from "react";

function App() {
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
