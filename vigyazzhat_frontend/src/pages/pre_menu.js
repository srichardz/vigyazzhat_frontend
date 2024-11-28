// src/pages/pre_menu.js
import React from "react";
import '../styles/premenu.css';

const PreMenu = (props) => {
    return <div id="pre_menu" className='menu'>
            <div className="logo"></div>
            <form onSubmit={props.joinGame}>
                <input
                    type="text"
                    value={props.playerName}
                    onChange={(e) => props.setPlayerName(e.target.value)}
                />
                <button type="submit">Enter game</button>
            </form>
            <span className={props.err === "200" ? "noerr" : "err"}>{props.err}</span>
        </div>
};

export default PreMenu;