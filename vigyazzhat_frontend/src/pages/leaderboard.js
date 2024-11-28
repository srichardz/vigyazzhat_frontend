import React, { useState, useEffect } from "react";
import '../styles/premenu.css';

const Leaderboard = (props) => {
    return <div className="menu">
            <div className="leaderboard">
            <ul className="">
            {Object.keys(props.lb)
                .sort((a, b) => props.lb[a] - props.lb[b])
                .map((player, index) => (
                <li key={index}>
                    {index===0 ? "Winner is: " : ""}{player} {props.lb[player]}
                </li>
                ))}
            </ul>
                <button onClick={() => window.location.reload()}>Back to the main menu</button>
            </div>
            </div>
};

export default Leaderboard;