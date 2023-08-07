import React from "react";
import "./MemoryCard.scss";

export default function MemoryCard({ card, handleSelected, disabled, rotated }) {
  const handleClick = () => {
    if(!disabled)
    {

        handleSelected(card);
    }
  };
  return (
    <div className="card">
        <div className={rotated ? "rotated" :""}>

      <img src={card.path} alt="" className="cardFront" />
      <img
        src="/img/cover.jpeg"
        onClick={handleClick}
        alt=""
        className="cardBack"
      />
        </div>
    </div>
  );
}
