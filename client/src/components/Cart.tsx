import { Button, Form, Table, Spinner} from "react-bootstrap"
import {CartContext, CartContextElementType} from '../contexts/CartContext';
import {useContext, useState} from 'react';
import axios from "axios";


const OrderForm = () => {
    const {order, setOrder} = useContext(CartContext);

    const toCartItem = (item: CartContextElementType) => {
      return {id: item.id,price: item.price, count: item.quantity}
    }
    
    const [address,setAddress] = useState<string>();
    const [phone,setPhone] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>();
    const [success, setSuccess] = useState<boolean>();

    const handleSubmit = () => {
      setIsLoading(true);
      axios.post('http://localhost:7070/api/order', {
        "owner": {
          "phone": phone,
           "address": address
        },
        "items": order.map((item) => toCartItem(item))
      })
      .then((response) => {
        setIsLoading(false);
        if (response.status == 204) {
          setSuccess(true);
          setOrder([]);
        } else { setSuccess(false);}
      })
      .catch((error) => {
        setIsLoading(false);
        setSuccess(false);
        setError(error);
      });
    }

    const handlePhoneChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
      const {value} = event.target;
      setPhone(value);
    }

    const handleAddressChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
      const {value} = event.target;
      setAddress(value);
    }

    return (
      success ?
      <h2>Заказ успешно оформлен</h2> :
      error ?
      <h2>Не удалось оформить заказ, переагрузите страницу и попробуйте еще раз</h2> :
      (order.length > 0) ?
      <section className="order">
        <h2 className="text-center">Оформить заказ</h2>
        <div className="card">
          <Form className="card-body" onSubmit={(e: React.SyntheticEvent) => {
             e.preventDefault();
             handleSubmit();
            }}>
              <Form.Group controlId="phone">
                <Form.Label>Телефон</Form.Label>
                <Form.Control type="text" placeholder="+7XXXXXXXXX" required={true} onChange={handlePhoneChanged}/>
              </Form.Group>
              <Form.Group controlId="address">
                <Form.Label>Адрес доставки</Form.Label>
                <Form.Control type="text" placeholder="Например: г. Москва, ул. Б. Якиманка, д. 42" required={true} onChange={handleAddressChanged}/>
              </Form.Group>
              <Form.Group controlId="agreement">
                <Form.Check
                required={true}
                type="checkbox"
                id="agreementCheckbox"
                label="Согласен с правилами доставки"
                />
              </Form.Group>
              <div className="text-center">
              {isLoading ? 
              <Button variant="outline-secondary" disabled>
                <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true"/>
                Оформление...
              </Button> : 
               <Button type="submit" variant="outline-secondary">Оформить</Button>}
              </div>
          </Form>
        </div>
      </section> :
      <h4>Добавьте товары в корзину для оформления заказа</h4>
    )
    
}

const Cart = () => {
    const {order, setOrder} = useContext(CartContext);
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
            <OrderForm/>
          </section>
        </>
    )   
}

export default Cart;