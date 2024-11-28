import React, { useState, useEffect } from "react";
import PreMenu from "./pages/pre_menu";
import Menu from "./pages/menu";
import JoinTable from "./pages/join_table";
import CreateTable from "./pages/create_table";
import Lobby from "./pages/lobby";
import Game from "./pages/game";
import Leaderboard from "./pages/leaderboard";
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
  const [cardsInPlay, setCardsInPlay] = useState([]);
  // Új állapot a "készen állok" funkcióhoz
  const [readyPlayers, setReadyPlayers] = useState([]);

  const [err, setErr] = useState("");

  const joinGame = (event) => {
    event.preventDefault()
    if (_playerName !== "") {
      setErr("")
      setFrState("menu")
    } else {
      setErr("Please enter a valid name!")
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
              setPlayerNames(result.players)
              if (result.status === "started") {
                setFrState("game")
              } else if (result.status === "ended") {
                setFrState("ended")
              }
              setCardsInPlay(result.cards_in_play)
            } else {
              console.error("Cannot reach that endpoint.")
              setErr("Cannot reach that endpoint.")
            }
          } catch (error) {
            console.error("Cannot reach the server.");
            setErr("Cannot reach the server.");
          }
        }
      }
      // Set up the interval to call the pingServer function every 500ms
      const interval = setInterval(get_game_state, 500);

      // Clean up the interval when the component unmounts
      return () => {
        clearInterval(interval);
      };
  }, [tableId]);

  const handleCreateTable = async (event) => {
    event.preventDefault();
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
        setErr("")

      } else {
        setErr("Table cannot be created.");
      }
    } catch (error) {
      setErr("Error while trying to reach the servers. Please try again later!");
    }
  };

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
        setErr("")
      } else {
        setErr("Bad link or password.");
      }
    } catch (error) {
      setErr("Error while trying to reach the server. Please try again later!");
    }
  };

  const handleReady = async () => {
    try {
      const response = await fetch("/ready", {
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
        setReadyPlayers(result.ready_players);
      } else {
        console.log("Couldn't reach endpoint.")
      }
    } catch (error) {
      console.error("Couldn't reach server.");
    }
  };

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
        setErr("")
      } else {
        setErr("Game could not be started!")
      }
    } catch (error) {
      setErr("Server cannot be reached, please try again later!");
    }
  };

  return (
    <div className="App">
      {frState === "login" ? (
        <PreMenu joinGame={joinGame} playerName={_playerName} setPlayerName={_setPlayerName} err={err}/>
      ) : frState === "menu" ? (
        <Menu createTable={createTable} joinTable={joinTable} playerName={_playerName}/>
      ) : frState === "create_table" ? (
        <CreateTable playerName={_playerName} handleCreateTable={handleCreateTable} password={_password} setPassword={_setPassword} setOwner={setOwner} playerNames={playerNames} err={err}/>
      ) : frState === "join_table" ? (
        <JoinTable playerName={_playerName} handleJoinTable={handleJoinTable} setInviteLink={setInviteLink} password={_password} setPassword={_setPassword} err={err}/>
      ) : frState === "lobby" ? (
        <Lobby inviteLink={inviteLink} playerNames={playerNames} handleStartGame={handleStartGame}  handleReady={handleReady} owner={owner}/>
      ) : frState === "game" ? (
        <Game playerNames={playerNames} tableId={tableId} playerId={playerId} cardsInPlay={cardsInPlay}/>
      ) : frState === "ended" ? (
        <Leaderboard lb={playerNames}/>
      ) : (
          setFrState("login") // default state
      )}
    </div>
  );
}

export default App;
