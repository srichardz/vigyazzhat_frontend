import React, { useState, useEffect } from "react";
import './App.css';

function App() {
  const [data, setdata] = useState({
    name: "username",
  });

  useEffect(() => {
    // Using fetch to fetch the api from 
    // flask server it will be redirected to proxy
    fetch("/test").then((res) =>
        res.json().then((data) => {
            // Setting a data from api
            setdata({
                name: data.name,
            });
        })
    );
  }, []);

  return (
    <div className="App">
    <p>Eredmeny: {data.name}</p>
    </div>
  );
}

export default App;
