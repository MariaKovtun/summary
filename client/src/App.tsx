import "./App.css";
import Contacts from "./pages/Contacts";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Catalog from "./pages/Catalog";
import MainPage from "./pages/MainPage";
import CatalogItemCardFull from "./components/CatalogItemCardFull";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart";
import { useState } from "react";
import { CartContext, CartContextElementType } from "./contexts/CartContext";

function App() {
  const currentStorage = window.localStorage.getItem("order");
  let initialState = !!currentStorage ? JSON.parse(currentStorage) : [];

  const [order, setOrder] = useState<CartContextElementType[]>(initialState);

  return (
    <CartContext.Provider value={{ order, setOrder }}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/about" element={<About />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:id" element={<CatalogItemCardFull />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </CartContext.Provider>
  );
}

export default App;
