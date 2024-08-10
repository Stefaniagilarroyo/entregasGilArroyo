import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from "@chakra-ui/react";
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/NavBar/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/NavBar/ItemDetailContainer/ItemDetailContainer'; 
import Footer from './components/NavBar/Footer/Footer';
import { CartProvider } from './components/context/CartContext';
import { NotificationProvider } from './components/context/NotificationContext';
import Cart from './components/NavBar/Cart/Cart';
import Checkout from './components/NavBar/Checkout/Checkout';

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <NotificationProvider>
          <CartProvider>
            <NavBar title="Coder Store" />
            <Routes>
              <Route exact path="/" element={<ItemListContainer />} />
              <Route exact path="/category/:categoryId" element={<ItemListContainer />} />
              <Route exact path="/detail/:productId" element={<ItemDetailContainer />} />
              <Route exact path="/cart" element={<Cart />} />
              <Route exact path="/checkout" element={<Checkout />} />
              <Route path="*" element={<h1>:( 404 Not found)</h1>} />
            </Routes>
            <Footer />
          </CartProvider>
        </NotificationProvider>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
