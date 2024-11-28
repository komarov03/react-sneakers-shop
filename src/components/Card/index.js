function Card(props) {
  return (
    <div className="card">
      <div className="favorite">
        <img src="/img/heart-filled.svg" alt="heart-filled" />
      </div>
      <img width={133} height={112} src={props.imageUrl} alt="sneakers" />
      <h5>{props.title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <b>{props.price}</b>
        </div>
        <button className="button">
          <img width={11} height={11} src="/img/plus.svg" alt="add" />
        </button>
      </div>
    </div>
  );
}

export default Card;
