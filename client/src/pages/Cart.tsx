import Footer from "../components/Footer";
import Header from "../components/Header";
import CartTable from "../components/CartTable";
import OrderForm from "../components/OrderForm";

const Cart = () => {
  return (
    <>
      <Header />
      <section className="cart">
        <h2 className="text-center">Корзина</h2>
        <CartTable />
        <OrderForm />
      </section>
      <Footer />
    </>
  );
};

export default Cart;
