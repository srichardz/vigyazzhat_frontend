import React, { useState, useEffect } from "react";
import '../styles/premenu.css';
import Card from "../card.js";
import Player from "../player.js";

const Game = (props) => {
    // Define local state for the hand
    const [hand, setHand] = useState([]);

    // Fetch hand data when the component mounts
    useEffect(() => {
        const handleGetHand = async () => {
            try {
                const response = await fetch("/get_hand", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        tableId: props.tableId,
                        playerId: props.playerId,
                    }),
                });

                if (response.ok) {
                    const result = await response.json();
                    setHand(result.hand);
                } else {
                    alert("An error occurred while fetching the hand!");
                }
            } catch (error) {
                console.error("Error during fetch:", error);
            }
        };

        handleGetHand();
    }, [props.tableId, props.playerId]);

    const handleCardSelect = async (card) => {
        try {
            const response = await fetch("/select_card", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    tableId: props.tableId,
                    playerId: props.playerId,
                    card: card,
                }),
            });

            if (response.ok) {
                const result = await response.json();
                setHand(result.hand);
            } else {
                alert("An error occurred while selecting card!");
            }
        } catch (error) {
            console.error("Error during fetch:", error);
        }
    };

    const handleLeave = async () => {
        try {
            const response = await fetch("/leave", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    tableId: props.tableId,
                    playerId: props.playerId,
                }),
            });

            if (response.ok) {
                const result = await response.json();
                window.location.reload();
            } else {
                alert("An error occurred while leaving game!");
            }
        } catch (error) {
            console.error("Error during fetch:", error);
        }
    };

    return (
        <div id="game" className="menu">
            <div className="table">
                <ul>
                    {props.cardsInPlay.map((row, index) => (
                        <li key={index}><Card cd={row} table={true}/></li>
                    ))}
                </ul>
            </div>
            <Card cd={hand} table={false} handleCardSelect={handleCardSelect}/>
            <div className="player_tab">
                <ul className="">{Object.keys(props.playerNames).map((player, index) => (
                        <li key={index}><Player playerName={player} bh={props.playerNames[player]}/></li>
                    ))}
                </ul>
            </div>
            <span className="leave" onClick={() => handleLeave()}>ssss</span>
        </div>
    );
};

export default Game;

/*<span className="plus">{scoreDifferences[player]}</span>{props.playerNames[player]} {player}*/