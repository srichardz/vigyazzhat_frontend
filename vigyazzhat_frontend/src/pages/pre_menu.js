// src/pages/pre_menu.js
import React from "react";

const PreMenu = (props) => {
    return <div id="pre_menu">
            <form onSubmit={props.joinGame}>
                <label>Player name:</label>
                <input
                    type="text"
                    value={props.playerName}
                    onChange={(e) => props.setPlayerName(e.target.value)}
                />
                <button type="submit">Join game</button>
            </form>
        </div>
};

export default PreMenu;