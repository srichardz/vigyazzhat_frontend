// src/pages/create_table.js
import React, { useEffect } from "react";
import '../styles/premenu.css';

const CreateTable = (props) => {
    useEffect(() => {
        props.setOwner(true);
    }, [props.setOwner]);

    return  <div id='create_table' className="menu">
                <p className="first">Welcome {props.playerName}!</p>
                <form onSubmit={props.handleCreateTable}>
                    <label>Password:</label>
                    <input
                        type="text"
                        value={props.password}
                        onChange={(e) => props.setPassword(e.target.value)}
                    />
                    <button type="submit">Create Table</button>
                </form>
                <span className={props.err === "200" ? "noerr" : "err"}>{props.err}</span>
            </div>
};

export default CreateTable;