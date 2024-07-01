import React, { useState } from 'react';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/NavBar/ItemListContainer/ItemListContainer';
import Footer from './components/NavBar/Footer/Footer';

function App() {
  const [cartCount, setCartCount] = useState(5);

  return (
    <>
      <NavBar cartCount={cartCount} />
      <ItemListContainer greetings="Bienvenido a Nia Ecotienda" />
      <Footer />
    </>
  );
}

export default App;
