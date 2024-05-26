import React, { useState, useEffect } from 'react';
import Card from './Card';

const initialCards = [
  { id: 1, matched: false, value: 'A', isEven:false },
  { id: 2, matched: false, value: 'A', isEven:true },
  { id: 3, matched: false, value: 'B', isEven:false },
  { id: 4, matched: false, value: 'B', isEven:true },
  { id: 5, matched: false, value: 'C', isEven:false },
  { id: 6, matched: false, value: 'C', isEven:true },
  { id: 7, matched: false, value: 'D', isEven:false },
  { id: 8, matched: false, value: 'D', isEven:true },
  { id: 9, matched: false, value: 'E', isEven:false },
  { id: 10, matched: false, value: 'E', isEven:true },
  { id: 11, matched: false, value: 'F', isEven:false },
  { id: 12, matched: false, value: 'F', isEven:true }
];

export default function App() {
  const [cards, setCards] = useState([]);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [lockBoard, setLockBoard] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    setCards(shuffleArray([...initialCards]));
  }, []);

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };
  const flipCard = (card) => {
    if (lockBoard || card.flipped) return;
    if (card === firstCard) return;
  
    if (!firstCard) {
      setFirstCard(card);
      setCards(cards.map(c => (c.id === card.id ? { ...c, flipped: true } : c)));
      return;
    }
    
    if(!secondCard) {
      setSecondCard(card);
      setCards(cards.map(c => (c.id === card.id ? { ...c, flipped: true } : c)));
      setLockBoard(true);
    }
  
    if (firstCard.value === card.value) {
      setCards(cards.map(c => (c.value === card.value ? { ...c, matched: true } : c)));
      setScore(score + 10);
      if (score + 10 > highScore) {
        setHighScore(score + 10);
      }
      resetBoard();
    } else {
      setTimeout(() => {
        setCards(cards.map(c => (c.id === card.id || c.id === firstCard.id ? { ...c, flipped: false } : c)));
        if(score > 5) {
          setScore(prev => (prev - 5));
        }
        resetBoard();
      }, 1000);
    }
  };

  const resetBoard = () => {
    setFirstCard(null);
    setSecondCard(null);
    setLockBoard(false);
  };

  const resetGame = () => {
    setScore(0);
    setCards(shuffleArray([...initialCards]));
  };

  // function IsEven(card) {
  //   if(card.isEven === false) {
  //     <Card key={card.key} card={card} onClick={() => flipCard(card)} />
  //   }
  // }

  // function NotEven({card}) {
  //   if(card.isEven === true) {
  //     <Card key={card.key} card={card} onClick={() => flipCard(card)} />
  //   }
  // }
  return (
    <>
      <div className="scoreboard">
        <div>Score: {score}</div>
        <div>High Score: {highScore}</div>
        <button onClick={resetGame} >Reset Game</button>
      </div>
      <div className="board">
          <div className='board-left'>
            {
              cards.map(card => {
                if(card.isEven === false) {
                  return <Card key={card.id} card={card} onClick={() => flipCard(card)} />
                }
                return null;
              })
            }
          </div>
          <div className='board-right'>
            {
              cards.map(card => {
                if(card.isEven === true) {
                  return <Card key={card.id} card={card} onClick={() => flipCard(card)} />
                }
                return null;
              })
            }
          </div>
      </div>
    </>
  );
}