// const [response, setResponse] = useState("");

// useEffect(() => {
//   fetch("http://localhost:3001/")
//     .then((res) => {
//       if (!res.ok) {
//         throw new Error(`HTTP error! Status: ${res.status}`);
//       }
//       return res.json();
//     })
//     .then((data) => {
//       console.log("Data received from server:", data);
//       setResponse(JSON.stringify(data));
//     })
//     .catch((err) => {
//       console.error("Fetch error:", err);
//       setResponse("Error: " + err.message);
//     });
// }, []);
