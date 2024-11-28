// src/players.js
import React, { useState, useEffect } from "react";
import './styles/players.css';

const Players = (props) => {
    
    const [prev, setPrev] = useState(0)
    const [diff, setDiff] = useState(0)
    const [classNames, setClassNames] = useState("def");
    const [skip, setSkip] = useState(false)

    useEffect(() => {
        setDiff(props.bh-prev)
        setPrev(props.bh)
        if (skip) {
            const timeout = setTimeout(() => setClassNames("def plus"), 50); // Adjust based on animation duration
            setClassNames("def");
            return () => clearTimeout(timeout);
        }
        setSkip(true)
    }, [props.bh]);

    return <><span key={classNames} className={classNames}>+{diff}</span>{props.bh} {props.playerName}</>
};

export default Players;