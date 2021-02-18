import { useState, useEffect } from "react";
import Score from "./Score";
import Card from "./Card";
import charactersJson from "../characters.json";

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

const Game = () => {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(
    localStorage.getItem('best_score') || 0
  );

  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    setCharacters(shuffle(charactersJson));
  }, [score, bestScore]);

  function handleClick(isClicked, id) {
    if (!isClicked) {
      setCharacters(
        characters.map((item) => {
          if (item.id === id) {
            item.clicked = true;
          }
          return item;
        })
      );

      setScore(score + 1);
    } else {
      newGame();
    }
  }

  function newGame() {
    if (score > bestScore) {
      setBestScore(score);
      localStorage.setItem('best_score', score)
      setScore(0);
    }
    setCharacters(
      characters.map((item) => {
        if (item.clicked) item.clicked = false;
        return item;
      })
    );
  }

  const cardCharacters = characters.map((item, idArray) => {
    return (
      <Card
        key={idArray}
        id={item.id}
        url={item.image}
        name={item.name}
        job={item.occupation}
        clicked={item.clicked}
        handleClick={handleClick}
      />
    );
  });
  return (
    <div>
      <Score score={score} bestScore={bestScore} />
      <div className="card-container">{cardCharacters}</div>
    </div>
  );
};

export default Game;
