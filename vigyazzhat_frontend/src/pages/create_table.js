// src/pages/create_table.js
import React, { useEffect } from "react";

const CreateTable = (props) => {
    useEffect(() => {
        props.setOwner(true);
    }, [props.setOwner]);

    return  <div id='create_table'>
                <p>Player: {props.playerName}</p>
                <form onSubmit={props.handleCreateTable}>
                    <label>Password:</label>
                    <input
                        type="text"
                        value={props.password}
                        onChange={(e) => props.setPassword(e.target.value)}
                    />
                    <button type="submit">Create Table</button>
                </form>
            </div>
};

export default CreateTable;