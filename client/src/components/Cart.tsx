import { Table } from "react-bootstrap"
import {CartContext} from '../contexts/CartContext';
import {useContext} from 'react';

const Cart = () => {
    const {order,setOrder} = useContext(CartContext);
    
    return (
        <>
        <section className="cart">
            <h2 className="text-center">Корзина</h2>
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
                {order?.map((elem, index) => 
                <tr key={elem.id}>
                  <td scope="row">{index+1}</td>
                  <td><a href={`/products/${elem.id}`}>{elem.title}</a></td>
                  <td>{elem.size}</td>
                  <td>{elem.quantity}</td>
                  <td>{elem.price}</td>
                  <td>{elem.price * elem.quantity}</td>
                  <td>
                    <button className="btn btn-outline-danger btn-sm" onClick={() => 
                    setOrder(order.filter(item => item.id !== elem.id))}>
                    Удалить
                    </button>
                  </td>
                  </tr>
                )}
                <tr>
                  <td className="text-right">Общая стоимость</td>
                  <td>{order.reduce((acc,elem) => acc + elem.quantity * elem.price,0)}</td>
                </tr>
              </tbody>
            </Table>
          </section>
          <section className="order">
            <h2 className="text-center">Оформить заказ</h2>
            <div className="card">
              <form className="card-body">
                <div className="form-group">
                  <label htmlFor="phone">Телефон</label>
                  <input className="form-control" id="phone" placeholder="Ваш телефон"></input>
                </div>
                <div className="form-group">
                  <label htmlFor="address">Адрес доставки</label>
                  <input className="form-control" id="address" placeholder="Адрес доставки"></input>
                </div>
                <div className="form-group form-check">
                  <input type="checkbox" className="form-check-input" id="agreement">
                  
                  </input>
                  <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
                </div>
                <button type="submit" className="btn btn-outline-secondary">Оформить</button>
              </form>
            </div>
          </section>
        </>
    )   
}

export default Cart;