import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Drawer from "./components/Drawer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";

export const AppContext = createContext({});

function App() {
  const [items, setItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isCartOpened, setCartOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const cartResponse = await axios.get("http://localhost:3000/cart");
        const itemsResponse = await axios.get("http://localhost:3000/items");
        const favoritesResponse = await axios.get(
          "http://localhost:3000/favorites"
        );

        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);

        setIsLoading(false);
      } catch (error) {
        alert("Ошибка при запросе данных");
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const onRemoveCart = (id) => {
    try {
      axios.delete(`http://localhost:3000/cart/${id}`);
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      alert("Ошибка при добавлении в корзину");
      console.error(error);
    }
  };

  const onAddToCart = async (item) => {
    try {
      if (cartItems.find((obj) => obj.id === item.id)) {
        setCartItems((prev) => prev.filter((obj) => obj.id !== item.id));
        await axios.delete(`http://localhost:3000/cart/${item.id}`);
      } else {
        setCartItems((prev) => [...prev, item]);
        await axios.post("http://localhost:3000/cart", item);
      }
    } catch (error) {
      alert("Ошибка при добавлении в корзину");
    }
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => favObj.id === obj.id)) {
        axios.delete(`http://localhost:3000/favorites/${obj.id}`);
        setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
      } else {
        const { data } = await axios.post(
          "http://localhost:3000/favorites",
          obj
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Не удалось добавить в избранное");
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isAddedToCart = (id) => {
    return cartItems.some((obj) => obj.id === id);
  };

  const isAddedToFavorites = (id) => {
    return favorites.some((obj) => obj.id === id);
  };

  return (
    <AppContext.Provider
      value={{
        cartItems,
        favorites,
        items,
        isAddedToCart,
        isAddedToFavorites,
        onAddToFavorite,
        setCartItems,
        onAddToCart,
      }}
    >
      <div className="wrapper clear">
        <Drawer
          items={cartItems}
          onRemove={onRemoveCart}
          setCartClosed={() => setCartOpened(false)}
          opened={isCartOpened}
        />
        <Header setCartOpened={() => setCartOpened(true)} />
        <Routes>
          <Route
            path="/"
            exact
            element={
              <Home
                items={items}
                cartItems={cartItems}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToFavorite={onAddToFavorite}
                onAddToCart={onAddToCart}
                isLoading={isLoading}
              />
            }
          />

          <Route path="/favorites" element={<Favorites />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
