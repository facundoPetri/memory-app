import { useState, useEffect, useMemo, Component } from "react";
import Score from "./Score";
import Card from "./Card";
import charactersJson from "../characters.json";

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

class Game extends Component {
  constructor() {
    super();
    this.state = {
      score: 0,
      bestScore: 0,
      characters: [],
    };
  }

  // const [score, setScore] = useState(0);
  // const [bestScore, setBestScore] = useState(0);

  // const [characters, setCharacters] = useState(charactersJson);

  // useEffect(() => {
  //   shuffle(characters);
  // });

  // const shuffleCards = useMemo(() => {
  //   return shuffle(characters)
  // }, [])

  // const handleClick = (id, event) => {
  //   console.log(characters);
  //   setCharacters((prevCharacters) => {
  //     characters.map(item => {
  //       if(item.id === id) {
  //         item.clicked = true
  //       }
  //       return item
  //     })
  //   });
  // };
  
  componentDidMount() {
    this.setState({ characters: shuffle(charactersJson) });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.score !== prevState.score)
      this.setState({ characters: shuffle(this.state.characters) });
  }

  handleClick(isClicked, id) {
    if (!isClicked) {
      this.setState((prevState) => {
        return {
          characters: this.state.characters.map((item) => {
            if (item.id === id) {
              item.clicked = true;
            }
            return item;
          }),
          score: prevState.score + 1,
        };
      });
    } else {
      this.newGame();
    }
  }

  newGame() {
    console.log("perdiste");
    if (this.state.score > this.state.bestScore)
      this.setState({ bestScore: this.state.score, score: 0 });
    this.setState({
      characters: this.state.characters.map((item) => {
        if (item.clicked) item.clicked = false;
        return item;
      }),
    });
  }

  render() {
    const cardCharacters = this.state.characters.map((item, idArray) => {
      return (
        <Card
          key={idArray}
          id={item.id}
          url={item.image}
          name={item.name}
          job={item.occupation}
          clicked={item.clicked}
          handleClick={this.handleClick.bind(this)}
        />
      );
    });
    return (
      <div>
        <Score score={this.state.score} bestScore={this.state.bestScore} />
        <div className="card-container">{cardCharacters}</div>
      </div>
    );
  }
}

export default Game;
