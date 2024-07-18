import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/NavBar/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/NavBar/ItemDetailContainer/ItemDetailContainer'; 
import Footer from './components/NavBar/Footer/Footer';

function App() {
  const [cartCount, setCartCount] = useState(5);

  return (
    <BrowserRouter>
      <NavBar cartCount={cartCount} />
      <Routes>
        <Route path='/' element={<ItemListContainer greetings={"Lista de Productos"} />} />
        <Route path='/category/:category' element={<ItemListContainer greetings={"Lista de Productos"} />} />
        <Route path='/item/:id' element={<ItemDetailContainer />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;


