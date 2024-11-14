// src/pages/join_table.js
import React from "react";

const JoinTable = (props) => {
    return  <div id='join_table'>
                <p>Player: {props.playerName}</p>
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
            </div>
};

export default JoinTable;