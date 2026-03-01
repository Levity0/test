import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("Loading...");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://Beavgredients.onrender.com/api/hello")
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(err => {
        console.error("Fetch error:", err);
        setError("Backend not responding");
      });
  }, []);

  return (
    <div>
      <h1>Frontend is working</h1>
      {error ? <h2>{error}</h2> : <h2>{message}</h2>}
    </div>
  );
}

export default App;
