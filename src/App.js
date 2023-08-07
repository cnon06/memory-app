import React, { useState, useEffect } from "react";
import MemoryCard from "./components/MemoryCard";

const cardList = [
  { path: "/img/1.jpeg", matched: false },
  { path: "/img/2.jpeg", matched: false },
  { path: "/img/3.jpeg", matched: false },
  { path: "/img/4.jpeg", matched: false },
  { path: "/img/5.jpeg", matched: false },
  { path: "/img/6.jpeg", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [selectedOne, setSelectedOne] = useState(null);
  const [selectedTwo, setSelectedTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [score, setScore] = useState(0);

  const prepareCards = () => {
    const sortedCards = [...cardList, ...cardList]
      .sort(() => 0.5 - Math.random())
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(sortedCards);
    setSelectedOne(null);
    setSelectedTwo(null);
    setScore(0);
  };

  useEffect(() => {
    prepareCards();
  }, []);

  useEffect(() => {
    if (selectedOne && selectedTwo) {
      setDisabled(true);

      if (selectedOne.path === selectedTwo.path) {
        setScore((prevScore) => prevScore + 1);
        setCards((prevcards) => {
          return prevcards.map((card) => {
            if (card.path === selectedOne.path) {
           
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });

        resetState();
      } else {
        setTimeout(() => {
          resetState();
        }, 1000);
      }
    }
    // prepareCards();
  }, [selectedOne, selectedTwo]);

  const resetState = () => {
    setSelectedOne(null);
    setSelectedTwo(null);
    setDisabled(false);
    // setScore((prevScore) => prevScore + 1);
  };

  const handleSelected = (card) => {
    selectedOne != null ? setSelectedTwo(card) : setSelectedOne(card);
  };

  return (
    <div className="container">
      <h1>Memory App</h1>
      <button className="btn btn-danger" onClick={prepareCards}>Start Game</button>
      <p>{score}</p>
      <div className="card-grid">
        {cards.map((card, index) => (
          <MemoryCard
            key={index}
            card={card}
            handleSelected={handleSelected}
            disabled={disabled}
            rotated={
              card === selectedOne || card === selectedTwo || card.matched
            }
          />
        ))}
      </div>
    </div>
  );
}

export default App;
