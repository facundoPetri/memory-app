const Card = (props) => {
  return (
    <div className="card" id="lol" onClick={() => props.handleClick(props.clicked, props.id)}>
      <img src={props.url} alt="" />
      <p style={{ fontWeight: "bold" }}>{props.name}</p>
      <p>{props.job}</p>
    </div>
  );
};

export default Card;
