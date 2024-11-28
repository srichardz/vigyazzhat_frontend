// src/pages/lobby.js
import React from "react";
import '../styles/premenu.css';

const JoinTable = (props) => {
    let player_keys = Object.keys(props.playerNames)
    return props.owner ? <div id='lobby' className="menu">
                            <p className="first">Players ({player_keys.length}/6) Invite link: {props.inviteLink}</p>
                            <ul>
                                {player_keys.map((player, index) => (
                                    <li key={index} style={props.playerNames[player]?{color: "green"}:{color: "red"}}>{player}</li>
                                ))}
                            </ul>
                            <button onClick={props.handleStartGame}>Start Game</button>
                            <span className={props.err === "200" ? "noerr" : "err"}>{props.err}</span>
                         </div> 
                       : 
                        <div id='lobby' className="menu">
                            <p className="first">Players ({player_keys.length}/6) Invite link: {props.inviteLink}</p>
                            <ul>
                                {player_keys.map((player, index) => (
                                    <li key={index} style={props.playerNames[player]?{color: "green"}:{color: "red"}}>{player}</li>
                                ))}
                            </ul>
                            <button onClick={props.handleReady}>Ready</button>
                            <span className={props.err === "200" ? "noerr" : "err"}>{props.err}</span>
                        </div> 
};

export default JoinTable;