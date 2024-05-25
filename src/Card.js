import React from "react";

export default function Card({card, onClick}) {
    return (
        <div className="card" onClick={onClick}>
            <div className="card-content">
                {card.flipped || card.matched ? card.value: '?'}
            </div>
        </div>
    )
}