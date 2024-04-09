import { useContext, useEffect } from "react";
import {Table} from "react-bootstrap";
import {CartContext} from "../contexts/CartContext";

const CartTable = () => {
    const { order, setOrder } = useContext(CartContext);

    useEffect(
        () => window.localStorage.setItem("order", JSON.stringify(order)),
        [order]
      );

    return (
        <Table bordered={true}>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Название</th>
              <th scope="col">Размер</th>
              <th scope="col">Кол-во</th>
              <th scope="col">Стоимость</th>
              <th scope="col">Итого</th>
              <th scope="col">Действия</th>
            </tr>
          </thead>
          <tbody>
            {order?.map((elem, index) => (
              <tr key={elem.id}>
                <td scope="row">{index + 1}</td>
                <td>
                  <a href={`/catalog/${elem.id}`}>{elem.title}</a>
                </td>
                <td>{elem.size}</td>
                <td>{elem.quantity}</td>
                <td>{elem.price}</td>
                <td>{elem.price * elem.quantity}</td>
                <td>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() =>
                      setOrder(order.filter((item) => item.id !== elem.id))
                    }
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td className="text-right">Общая стоимость</td>
              <td>
                {order.reduce(
                  (acc, elem) => acc + elem.quantity * elem.price,
                  0
                )}
              </td>
            </tr>
          </tbody>
        </Table>
    )
}
export default CartTable;