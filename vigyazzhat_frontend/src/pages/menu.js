// src/pages/menu.js
import React from "react";

const Menu = (props) => {
    return  <div id='menu'>
                <p>Player: {props.playerName}</p>
                <button onClick={props.createTable}>Create a Game</button>
                <button onClick={props.joinTable}>Join a Table</button>
            </div>
};

export default Menu;