import { useState } from "react";
import ContentLoader from "react-content-loader";
import styles from "./Card.module.scss";

function Card({
  id,
  onFavorite,
  title,
  imageUrl,
  price,
  onPlus,
  favorited = false,
  added,
  loading = false,
}) {
  const [isFavorite, setIsFavorite] = useState(favorited);

  const onClickFavorite = () => {
    onFavorite({ id, title, imageUrl, price });
    setIsFavorite(!isFavorite);
  };

  const onClickPlus = () => {
    onPlus({ id, title, imageUrl, price });
  };

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={155}
          height={250}
          viewBox="0 0 150 265"
          backgroundColor="#d1d1d1"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="10" ry="10" width="150" height="150" />
          <rect x="0" y="169" rx="3" ry="3" width="150" height="15" />
          <rect x="0" y="192" rx="3" ry="3" width="100" height="15" />
          <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
          <rect x="118" y="227" rx="5" ry="5" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          {onFavorite && (
            <div className="favorite">
              <img
                className="cu-p"
                onClick={onClickFavorite}
                src={
                  isFavorite
                    ? "img/heart-filled.svg"
                    : "img/heart-not-filled.svg"
                }
                alt="heart-filled"
              />
            </div>
          )}
          <img width={133} height={112} src={imageUrl} alt="sneakers" />
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>{price}</b>
            </div>
            {onPlus && (
              <img
                className={styles.plus}
                onClick={onClickPlus}
                src={added ? "img/checked.svg" : "img/btn-add.svg"}
                alt="add"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
