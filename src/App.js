import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const images = ['image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg', 'image5.jpg',
  'image6.jpg', 'image7.jpg', 'image8.jpg', 'image9.jpg', 'image10.jpg'];
  const totalCards = images.length * 2;

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const generateCards = () => {
    const shuffledImages = shuffleArray([...images, ...images]);

    const cards = shuffledImages.map((img, index) => ({
      id: index + 1,
      img,
      isFlipped: false,
      matched: false,
    }));

    return cards;
  };

  const [cards, setCards] = useState(generateCards());
  const [flippedCount, setFlippedCount] = useState(0);
  const [flippedIndexes, setFlippedIndexes] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(10); // Temps de jeu (60 secondes dans cet exemple)
  const [timerInterval, setTimerInterval] = useState(null);

  const handleCardClick = (index) => {
    if (!gameStarted) {
      setGameStarted(true);
      startTimer();
    }

    if (!gameOver && flippedCount < 2 && !flippedIndexes.includes(index)) {
      setCards((prevCards) =>
        prevCards.map((card, i) =>
          i === index ? { ...card, isFlipped: true } : card
        )
      );

      setFlippedIndexes([...flippedIndexes, index]);
      setFlippedCount(flippedCount + 1);
    }
  };
  useEffect(() => {  
    if (!gameOver) {
    const matchedCards = cards.filter((card) => card.matched);         
    if (matchedCards.length === totalCards) {       
    clearInterval(timerInterval);
    setGameOver(true); 
          }
        }
      }, [cards, gameOver, timerInterval, totalCards]);

  const checkFlippedCards = () => {
    const firstIndex = flippedIndexes[0];
    const secondIndex = flippedIndexes[1];
    const newCards = [...cards];

    if (newCards[firstIndex].img === newCards[secondIndex].img) {
      newCards[firstIndex].isFlipped = true;
      newCards[secondIndex].isFlipped = true;
      newCards[firstIndex].matched = true;
      newCards[secondIndex].matched = true;
    } else {
      newCards[firstIndex].isFlipped = false;
      newCards[secondIndex].isFlipped = false;
    }

    setCards(newCards);
    setFlippedIndexes([]);
    setFlippedCount(0);
  };

  useEffect(() => {
    if (flippedCount === 2) {
      setTimeout(() => {
        checkFlippedCards();
      }, 1000);
    }
  }, [flippedCount]);

  useEffect(() => {
    if (gameOver) {
      clearInterval(timerInterval);
    }
  }, [gameOver, timerInterval]);

  useEffect(() => {
    if (secondsRemaining === 0) {
      setGameOver(true);
    }
  }, [secondsRemaining]);

  const startTimer = () => {
    const interval = setInterval(() => {
      setSecondsRemaining((prevSeconds) => prevSeconds - 1);
    }, 1000);

    setTimerInterval(interval);
  };

  const restartGame = () => {
    setGameStarted(false);
    setGameOver(false);
    setSecondsRemaining(60);
    setFlippedCount(0);
    setFlippedIndexes([]);
    setCards(generateCards());
    clearInterval(timerInterval);
  };

  return (
 <div>
          
      <div className="timer">{cards.filter((card) => card.matched).length === totalCards | secondsRemaining == 0 ?(gameOver&&<button onClick={restartGame}>Rejouer</button>):(`Temps restant : ${secondsRemaining} secondes`)}</div>
      {gameStarted ? (
        gameOver ? (
          <div className="status">{secondsRemaining === 0?'Vous avez perdu.':'Vous avez gagné !'}</div>
        ) : (
          <div className="status">
          {`${
            cards.filter((card) => card.matched).length === totalCards ? 'Vous avez gagné !' : 'À vous de jouer !'
          }`}
        </div>
        )
      ) : (
        <div className="status">Cliquez sur une carte pour commencer le jeu </div>
      )}
    
        <div className="App">
      <div className="game-board">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={`card ${card.isFlipped ? 'flipped' : ''} ${card.matched ? 'matched' : ''}`}
            onClick={() => handleCardClick(index)}
          >
            <img
              src={card.isFlipped || card.matched ? `/images/${card.img}` : '/images/back.jpg'}
              alt="Card"
            />
          </div>
        ))}
      </div>

    </div>
    </div>
  );
};

export default App;
