import React, { useState } from "react";
import './App.css';

function App() {
  // Asztal létrehozásához szükséges állapotok
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [tableId, setTableId] = useState(null);

  // Csatlakozáshoz szükséges állapotok
  const [playerName, setPlayerName] = useState("");
  const [joinTableId, setJoinTableId] = useState("");
  const [tablePasswd, setTablePasswd] = useState("");
  const [joinedNames, setJoinedNames] = useState([]);

  // Új állapot a "készen állok" funkcióhoz
  const [readyPlayers, setReadyPlayers] = useState([]);

  //szám elküldéshez szükséges állapotok
  const numbers = [23, 45, 67, 12, 89, 3, 56, 77, 102, 14];
  const [responseNumber, setResponseNumber] = useState(null);

  // Asztal létrehozása
  const handleCreateTable = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/dummy_create_table", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_name: userName,
          password: password,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setTableId(result.table_id);  // Sikeres válasz: table_id mentése
      } else {
        alert("Hiba történt az asztal létrehozása során!");
      }
    } catch (error) {
      console.error("Hiba a küldés során:", error);
    }
  };

  // Csatlakozás az asztalhoz
  const handleJoinTable = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/dummy_join_game", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          playerName: playerName,
          table_id: joinTableId,
          table_passwd: tablePasswd,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setJoinedNames(result.names);  // Sikeres válasz: csatlakozott nevek listája
      } else {
        alert("Hiba történt a csatlakozás során!");
      }
    } catch (error) {
      console.error("Hiba a küldés során:", error);
    }
  };

  const handleReady = async () => {
    try {
      const response = await fetch("/dummy_ready", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          playerName: playerName,  // A már meglévő playerName változót használjuk
        }),
      });
  
      if (response.ok) {
        const result = await response.json();
        setReadyPlayers(result.ready_players);  // Frissítjük a készen álló játékosok listáját
      } else {
        alert("Hiba történt a jelentkezés során!");
      }
    } catch (error) {
      console.error("Hiba a küldés során:", error);
    }
  };

   // A szám küldése a szervernek
   const handleClick = async (number) => {
    try {
      const response = await fetch("/dummy_send_number", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ number: number }),
      });

      if (response.ok) {
        const result = await response.json();
        setResponseNumber(result.number_received); // Frissítjük a választott számot
      } else {
        alert("Hiba történt a szám küldésekor!");
      }
    } catch (error) {
      console.error("Hiba a küldés során:", error);
    }
  };


  return (
    <div className="App">
      {/* Asztal létrehozása */}
      <h2>Asztal Létrehozása</h2>
      <form onSubmit={handleCreateTable}>
        <label>
          Felhasználói név (user_name):
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Jelszó:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Asztal létrehozása</button>
      </form>
      
      {/* Létrehozott table_id megjelenítése */}
      {tableId && <p>Létrehozott asztal ID: {tableId}</p>}
      <p>----------------------------------------------------------------------------------</p>
      {/* Csatlakozás asztalhoz */}
      <h2>Csatlakozás Az Asztalhoz</h2>
      <form onSubmit={handleJoinTable}>
        <label>
          Játékosnév:
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Asztal ID:
          <input
            type="text"
            value={joinTableId}
            onChange={(e) => setJoinTableId(e.target.value)}
          />
        </label>
        <br />
        <label>
          Asztal Jelszó:
          <input
            type="password"
            value={tablePasswd}
            onChange={(e) => setTablePasswd(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Csatlakozás</button>
      </form>
      
      {/* Csatlakozott játékosok listája */}
      {joinedNames.length > 0 && (
        <div>
          <h3>Csatlakozott Játékosok:</h3>
            {joinedNames.map((name, index) => (
              <p key={index}>{name}</p>
            ))}
        </div>
      )}
      <p>----------------------------------------------------------------------------------</p>
      {/* Új gomb a készen állok funkcióhoz */} 
      <button onClick={handleReady}>Készen állok</button>

      {/* Készen álló játékosok listájának megjelenítése */}
      {readyPlayers.length > 0 && (
        <div>
          <h3>Készen álló játékosok:</h3>
            {readyPlayers.map((name, index) => (
              <p key={index}>{name}</p>
            ))}
        </div>
      )}
      <p>----------------------------------------------------------------------------------</p>

      <h2>Kattints egy számra!</h2>
      <div className="number-container">
        {numbers.map((number) => (
          <button
            key={number}
            onClick={() => handleClick(number)}
            className="number-box"
          >
            {number}
          </button>
        ))}
      </div>

      {responseNumber && (
        <div>
          <h3>A kiválasztott kártya:</h3>
          <p>{responseNumber}</p>
        </div>
      )}
      <p>----------------------------------------------------------------------------------</p>

      

    </div>
  );
}

export default App;
