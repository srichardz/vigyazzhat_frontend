// src/pages/lobby.js
import React from "react";

const JoinTable = (props) => {
    return props.owner ? <div id='lobby'>
                            <p>Players ({props.playerNames.length}/6) Invite link: {props.inviteLink}</p>
                            <ul>
                                {props.playerNames.map((player, index) => (
                                    <li key={index}>{player}</li>
                                ))}
                            </ul>
                            <button onClick={props.handleStartGame}>Start Game</button>
                         </div> 
                       : 
                        <div id='lobby'>
                            <p>Players ({props.playerNames.length}/6) Invite link: {props.inviteLink}</p>
                            <ul>
                                {props.playerNames.map((player, index) => (
                                    <li key={index}>{player}</li>
                                ))}
                            </ul>
                            <button onClick={props.handleReady}>Ready</button>
                        </div> 
};

export default JoinTable;