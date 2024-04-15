import { useContext, useState } from "react";
import { CartContext, CartContextElementType } from "../contexts/CartContext";
import useInput from "../hooks/useInput";
import axios from "axios";
import { Button, Form, Spinner } from "react-bootstrap";

const OrderForm = () => {
  const { order, setOrder } = useContext(CartContext);

  const toCartItem = (item: CartContextElementType) => {
    return { id: item.id, price: item.price, count: item.quantity };
  };

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<boolean>();

  const phoneInput = useInput();
  const addressInput = useInput();

  const handleSubmit = () => {
    setIsLoading(true);
    axios
      .post("http://localhost:3000/api/order", {
        owner: {
          phone: phoneInput.value,
          address: addressInput.value,
        },
        items: order.map((item) => toCartItem(item)),
      })
      .then((response) => {
        setIsLoading(false);
        if (response.status == 204) {
          setSuccess(true);
          setOrder([]);
        } else {
          setSuccess(false);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setSuccess(false);
        setError(error);
      });
  };

  if (success) return <h2>Заказ успешно оформлен</h2>;
  if (error)
    return (
      <h2>
        Не удалось оформить заказ, переагрузите страницу и попробуйте еще раз
      </h2>
    );
  return order.length > 0 ? (
    <section className="order">
      <h2 className="text-center">Оформить заказ</h2>
      <div className="card">
        <Form
          className="card-body"
          onSubmit={(e: React.SyntheticEvent) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <Form.Group controlId="phone">
            <Form.Label>Телефон</Form.Label>
            <Form.Control
              type="text"
              placeholder="+7XXXXXXXXX"
              required={true}
              value={phoneInput.value}
              onChange={phoneInput.onChange}
            />
          </Form.Group>
          <Form.Group controlId="address">
            <Form.Label>Адрес доставки</Form.Label>
            <Form.Control
              type="text"
              placeholder="Например: г. Москва, ул. Б. Якиманка, д. 42"
              required={true}
              value={addressInput.value}
              onChange={addressInput.onChange}
            />
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
            {isLoading ? (
              <Button variant="outline-secondary" disabled>
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                Оформление...
              </Button>
            ) : (
              <Button type="submit" variant="outline-secondary">
                Оформить
              </Button>
            )}
          </div>
        </Form>
      </div>
    </section>
  ) : (
    <h4>Добавьте товары в корзину для оформления заказа</h4>
  );
};

export default OrderForm;
