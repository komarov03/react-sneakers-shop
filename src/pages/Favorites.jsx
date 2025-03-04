import { useContext } from "react";
import Card from "../components/Card";
import { AppContext } from "../App";

function Favorites() {
  const { favorites, onAddToFavorite, isAddedToFavorites } = useContext(
    AppContext
  );

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои закладки</h1>
      </div>
      <div className="d-flex flex-wrap">
        {favorites.map((item, index) => (
          <Card
            key={index}
            favorited={isAddedToFavorites(item.id)}
            onFavorite={onAddToFavorite}
            {...item}
          />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
