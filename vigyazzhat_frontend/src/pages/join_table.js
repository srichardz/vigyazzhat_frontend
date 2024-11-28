// src/pages/join_table.js
import React from "react";
import '../styles/premenu.css';

const JoinTable = (props) => {
    return  <div id='join_table' className="menu">
                <p className="first">Player: {props.playerName}</p>
                <form onSubmit={props.handleJoinTable}>
                    <label>Table invite link:</label>
                    <input
                        type="text"
                        value={props.inviteLink}
                        onChange={(e) => props.setInviteLink(e.target.value)}
                    />
                    <label>Table Password:</label>
                    <input
                        type="text"
                        value={props.password}
                        onChange={(e) => props.setPassword(e.target.value)}
                    />
                    <button type="submit">Join Table</button>
                </form>
                <span className={props.err === "200" ? "noerr" : "err"}>{props.err}</span>
            </div>
};

export default JoinTable;