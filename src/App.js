import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [cards, setCards] = useState([
    { id: 1, img: 'image1.jpg', isFlipped: false },
    { id: 2, img: 'image2.jpg', isFlipped: false },
    { id: 1, img: 'image3.jpg', isFlipped: false },
    { id: 2, img: 'image4.jpg', isFlipped: false },
    { id: 1, img: 'image5.jpg', isFlipped: false },
    { id: 2, img: 'image6.jpg', isFlipped: false },
    { id: 1, img: 'image7.jpg', isFlipped: false },
    { id: 2, img: 'image8.jpg', isFlipped: false },
    { id: 1, img: 'image9.jpg', isFlipped: false },
    { id: 2, img: 'image10.jpg', isFlipped: false },
    { id: 1, img: 'image1c.jpg', isFlipped: false },
    { id: 2, img: 'image2c.jpg', isFlipped: false },
    { id: 1, img: 'image3c.jpg', isFlipped: false },
    { id: 2, img: 'image4c.jpg', isFlipped: false },
    { id: 1, img: 'image5c.jpg', isFlipped: false },
    { id: 2, img: 'image6c.jpg', isFlipped: false },
    { id: 1, img: 'image7c.jpg', isFlipped: false },
    { id: 2, img: 'image8c.jpg', isFlipped: false },
    { id: 1, img: 'image9c.jpg', isFlipped: false },
    { id: 1, img: 'image10c.jpg', isFlipped: false },
    // Ajoutez d'autres paires d'images ici
  ]);

  const [flippedCount, setFlippedCount] = useState(0);
  const [flippedIndexes, setFlippedIndexes] = useState([]);

  const handleCardClick = (index) => {
    if (flippedCount < 2 && !flippedIndexes.includes(index)) {
      setCards((prevCards) =>
        prevCards.map((card, i) =>
          i === index ? { ...card, isFlipped: true } : card
        )
      );

      setFlippedIndexes([...flippedIndexes, index]);
      setFlippedCount(flippedCount + 1);
    }
  };

  // Fonction pour vérifier les cartes retournées
  const checkFlippedCards = () => {
    const firstIndex = flippedIndexes[0];
    const secondIndex = flippedIndexes[1];
    const newCards = [...cards];

    if (newCards[firstIndex].img === newCards[secondIndex].img) {
      newCards[firstIndex].isFlipped = true;
      newCards[secondIndex].isFlipped = true;
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

  return (
    <div className="App">
      {cards.map((card, index) => (
        <div
          key={card.id}
          className={`card ${card.isFlipped ? 'flipped' : ''}`}
          onClick={() => handleCardClick(index)}
        >
          <img
            src={card.isFlipped ? `/images/${card.img}` : '/images/back.jpg'}
            alt="Card"
          />
        </div>
      ))}
    </div>
  );
};

export default App;
