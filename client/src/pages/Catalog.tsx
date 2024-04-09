import Footer from "../components/Footer";
import Header from "../components/Header";
import Banner from "../components/Banner";
import CatalogComponent from "../components/CatalogComponent";

const Catalog = () => {
  return (
    <>
      <Header />
      <CatalogComponent>
        <Banner />
      </CatalogComponent>
      <Footer />
    </>
  );
};

export default Catalog;
