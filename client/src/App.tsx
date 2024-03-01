import './App.css'
import Contacts from './components/Contacts'
import NotFound from './components/NotFound'
import BasicComponent from './components/BasicComponent'
import About from './components/About'
import Catalog from './components/Catalog'
import MainPage from './components/MainPage'
import Banner from './components/Banner'
import CatalogItemCardFull from './components/CatalogItemCardFull'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cart from './components/Cart'
import { useState } from 'react'
import {CartContext, CartContextElementType} from './contexts/CartContext';

function App() {
  const [order,setOrder] = useState<CartContextElementType[]>([]);

  return (
    <CartContext.Provider value={{order,setOrder}}>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<BasicComponent><NotFound/></BasicComponent>} />
        <Route path="/" element={<BasicComponent><MainPage/></BasicComponent>}/>
        <Route path="/contacts" element={<BasicComponent><Contacts/></BasicComponent>}/>
        <Route path="/about" element={<BasicComponent><About/></BasicComponent>}/>
        <Route path="/catalog" element={<BasicComponent><Catalog><Banner/></Catalog></BasicComponent>}/>
        <Route path="/catalog/:id" element={<BasicComponent><CatalogItemCardFull/></BasicComponent>}/>
        <Route path="/cart" element={<BasicComponent><Cart/></BasicComponent>}/>
      </Routes>
    </BrowserRouter>
   </CartContext.Provider>
  )
}

export default App;
