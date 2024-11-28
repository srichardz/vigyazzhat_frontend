// src/card.js
import React from "react";
import './styles/card.css';

const Card = (props) => {
    const getArt = (card) => {
        const n = (card.toString().slice(-1) === '5' ? 1 : 0) + (card.toString().slice(-1) === '0' ? 2 : 0) + (card.toString().length !== 1 && card.toString()[0] === card.toString()[1] ? 3 : 0) /*3:0 but we dont have 3 yet*/
        return "art art_"+n
    }

    if (props.table) {
        return <ul className="row_of_cards">{props.cd.map((card, index) => (
                        <li key={index}><div className="card table_card"><span className="corner topLeft">{card}</span><span className="corner topRight">{card}</span><span className="corner botLeft">{card}</span><span className="corner botRight">{card}</span><span className={getArt(card)}></span></div></li>
                    ))}
                </ul>
    } else {
        return <ul className="row_of_cards">{props.cd.map((card, index) => (
                        <li key={index}><div className="card hand_card" onClick={() => props.handleCardSelect(card)}><span className="corner topLeft">{card}</span><span className="corner topRight">{card}</span><span className="corner botLeft">{card}</span><span className="corner botRight">{card}</span><span className={getArt(card)}></span></div></li>
                    ))}
                </ul>
    }
};

export default Card;