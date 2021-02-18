const Score = (props) => {
  return (
    <div>
      <h1>Memory Game</h1>
      <h2>Score: {props.score}</h2>
      <h2>Best Score: {props.bestScore}</h2>
    </div>
  );
};

export default Score;
