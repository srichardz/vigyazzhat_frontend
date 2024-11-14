import React, { useState, useEffect } from "react";
import PreMenu from "./pages/pre_menu";
import Menu from "./pages/menu";
import JoinTable from "./pages/join_table";
import CreateTable from "./pages/create_table";
import Lobby from "./pages/lobby";
import './App.css';

function App() {
  const [_playerName, _setPlayerName] = useState("");
  const [frState, setFrState] = useState("login");
  const [inviteLink, setInviteLink] = useState("");
  const [_password, _setPassword] = useState("");
  // Asztal létrehozásához szükséges állapotok
  const [tableId, setTableId] = useState(null);
  const [owner, setOwner] = useState(false);
  // Csatlakozáshoz szükséges állapotok
  const [playerId, setPlayerId] = useState(null);
  const [playerNames, setPlayerNames] = useState([]);
  const [playerName, setPlayerName] = useState("");
  // Új állapot a "készen állok" funkcióhoz
  const [readyPlayers, setReadyPlayers] = useState([]);


  const joinGame = (event) => {
    event.preventDefault()
    if (_playerName !== "") {
      setFrState("menu")
    } else {
      alert("Hülyegyerek")
    }
  }

  const createTable = (event) => {
    event.preventDefault()
    setFrState("create_table")
  }

  const joinTable = (event) => {
    event.preventDefault()
    setFrState("join_table")
  }

  useEffect(() => {
      // Define the function you want to run every 500ms
      const get_game_state = async () => {
        if (tableId !== null) {
          try {
            const response = await fetch(`/get_game_state/${tableId}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              }
            });
      
            if (response.ok) {
              const result = await response.json();
              console.log(result)
              setPlayerNames(Object.keys(result.players))
              // kezdjen fél secenkénti pingelésbe
            } else {
              alert("Cannot join table.");
            }
          } catch (error) {
            console.error("Error while fetching endpoint:", error);
          }
        }
      }
      // Set up the interval to call the pingServer function every 500ms
      const interval = setInterval(get_game_state, 2000);

      // Clean up the interval when the component unmounts
      return () => {
        clearInterval(interval);
      };
  }, [tableId]); // Empty dependency array ensures this runs once when the component mounts

  // Asztal létrehozása
  const handleCreateTable = async (event) => {
    event.preventDefault();
    // Log data before sending it
    console.log("Creating table with:", {
      _playerName: _playerName,
      _password: _password,
    });
    try {
      const response = await fetch("/create_table", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _playerName: _playerName,
          _password: _password,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setTableId(result.table_id);
        setPlayerId(result.player_id);
        setInviteLink(result.inviteLink);
        setFrState("lobby")

        // kezdjen fél secenkénti pingelésbe
      } else {
        console.log("Table cannot be created.");
      }
    } catch (error) {
      console.error("Error while fetching endpoint:", error);
    }
  };

  // Csatlakozás az asztalhoz
  const handleJoinTable = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/join_game", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _playerName: _playerName,
          inviteLink: inviteLink,
          _password: _password,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setPlayerId(result.player_id);
        setTableId(result.table_id);
        setFrState("lobby")
        // kezdjen fél secenkénti pingelésbe
      } else {
        alert("Cannot join table.");
      }
    } catch (error) {
      console.error("Error while fetching endpoint:", error);
    }
  };

  /*TODO: implement*/
  const handleReady = async () => {
    try {
      const response = await fetch("/ready", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tableId: tableId,
          playerId: playerName,  // A már meglévő playerName változót használjuk
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

    /*TODO: implement*/
  const handleStartGame = async () => {
    try {
      const response = await fetch("/start_game", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tableId: tableId,
          playerId: playerId,
        }),
      });
    
      if (response.ok) {
        const result = await response.json();

      } else {
        alert("Hiba történt a jelentkezés során!");
      }
    } catch (error) {
      console.error("Hiba a küldés során:", error);
    }
  };
  

  return (
    <div className="App">
      {frState === "login" ? (
        <PreMenu joinGame={joinGame} playerName={_playerName} setPlayerName={_setPlayerName} />
      ) : frState === "menu" ? (
        <Menu createTable={createTable} joinTable={joinTable} playerName={_playerName}/>
      ) : frState === "create_table" ? (
        <CreateTable playerName={_playerName} handleCreateTable={handleCreateTable} password={_password} setPassword={_setPassword} setOwner={setOwner} playerNames={playerNames}/>
      ) : frState === "join_table" ? (
        <JoinTable playerName={_playerName} handleJoinTable={handleJoinTable} setInviteLink={setInviteLink} password={_password} setPassword={_setPassword}/>
      ) : frState === "lobby" ? (
        <Lobby playerName={_playerName} players={[""]} inviteLink={inviteLink} playerNames={playerNames} handleStartGame={handleStartGame} owner={owner}/>
      ) : (
          alert("TODO: default case")
      )}
    </div>
  );
}

export default App;
