import Bestsellers from "../components/BestSellers";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Catalog from "../components/CatalogComponent";

const MainPage = () => {
  return (
    <>
      <Header />
      <div>
        <Bestsellers />
        <Catalog showSearchField={false} />
      </div>
      <Footer />
    </>
  );
};

export default MainPage;
