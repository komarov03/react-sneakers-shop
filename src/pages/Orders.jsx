import { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get("http://localhost:3000/orders");
        console.log(`Получили данные с бека: ${{ data }}`);

        setOrders(data);
        console.log(
          `Обновили данные заказов с бека, нужно отрисовать: ${orders}`
        );
        setIsLoading(false);
      } catch (error) {
        alert("Не удалось получить данные о заказах");
        console.error(error);
      }
    }
    fetchData();
  }, [orders]);

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои заказы</h1>
      </div>
      <div className="d-flex flex-wrap">
        {isLoading
          ? [Array[8]]
          : orders.flatMap((order) =>
              order.items.map((item) => (
                <Card key={item.id} loading={isLoading} {...item} />
              ))
            )}
      </div>
    </div>
  );
}

export default Orders;
