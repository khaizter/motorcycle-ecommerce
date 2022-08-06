import React, { useState } from 'react';
import Navigation from 'src/common/navigation';

// Routing
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import Home from 'src/pages/home';
import Products from 'src/pages/products';
import Cart from 'src/common/cart';

const App: React.FC = () => {
  const [showCart, setShowCart] = useState<boolean>(false);

  const openCartHandler = () => {
    setShowCart(true);
  };

  const closeCartHandler = () => {
    setShowCart(false);
  };

  return (
    <BrowserRouter>
      <Navigation openCart={openCartHandler} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
      </Routes>
      <Cart open={showCart} onClose={closeCartHandler} />
    </BrowserRouter>
  );
};

export default App;
