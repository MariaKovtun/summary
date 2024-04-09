import Footer from "../components/Footer";
import Header from "../components/Header";

const NotFound = () => {
  return (
    <>
      <Header />
      <section className="top-sales">
        <h2 className="text-center">Страница не найдена</h2>
        <p>Извините, такая страница не найдена!</p>
      </section>
      <Footer />
    </>
  );
};

export default NotFound;
