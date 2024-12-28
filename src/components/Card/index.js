import { useState } from "react";
import styles from "./Card.module.scss";

function Card({ onFavorite, title, imageUrl, price, onPlus }) {
  const [isAdded, setIsAdded] = useState(false);

  const onClickPlus = () => {
    onPlus({ title, imageUrl, price });
    setIsAdded(!isAdded);
  };

  return (
    <div className={styles.card} onClick={onFavorite}>
      <div className="favorite">
        <img src="/img/heart-filled.svg" alt="heart-filled" />
      </div>
      <img width={133} height={112} src={imageUrl} alt="sneakers" />
      <h5>{title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <b>{price}</b>
        </div>
        <img
          className={styles.plus}
          onClick={onClickPlus}
          src={isAdded ? "/img/checked.svg" : "/img/btn-add.svg"}
          alt="add"
        />
      </div>
    </div>
  );
}

export default Card;
