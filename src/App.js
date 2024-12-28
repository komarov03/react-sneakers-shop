import { useEffect, useState } from "react";
import Card from "./components/Card";
import Drawer from "./components/Drawer";
import Header from "./components/Header";

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpened, setCartOpened] = useState(false);

  useEffect(() => {
    fetch("https://676aefb4bc36a202bb83b237.mockapi.io/items")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setItems(data);
      });
  }, []);

  const onAddToCard = (item) => {
    setCartItems((prev) => [...prev, item]);
  };

  return (
    <div className="wrapper clear">
      {isCartOpened && (
        <Drawer items={cartItems} setCartClosed={() => setCartOpened(false)} />
      )}
      <Header setCartOpened={() => setCartOpened(true)} />
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input type="text" placeholder="Поиск..." />
          </div>
        </div>
        <div className="d-flex flex-wrap">
          {items.map((obj) => (
            <Card
              title={obj.title}
              price={obj.price}
              imageUrl={obj.imageUrl}
              onPlus={(item) => {
                onAddToCard(item);
              }}
              onFavorite={() => {
                console.log("Добавили в избрбанное");
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
