// src/pages/menu.js
import React from "react";
import '../styles/premenu.css';

const Menu = (props) => {
    return  <div id='menu' className="menu">
                <p className="first">Welcome {props.playerName}!</p>
                <div>
                    <button onClick={props.createTable}>Create a Game</button>
                    <button onClick={props.joinTable}>Join a Table</button>
                </div>
            </div>
};

export default Menu;