import React, { useState } from 'react';
import Navigation from 'src/common/navigation';

// Routing
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import Home from 'src/pages/home';
import Products from 'src/pages/products';
import Cart from 'src/common/cart';

// Context Providers
import { CartProvider } from 'src/context/cart-context';

const App: React.FC = () => {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Products />} />
        </Routes>
        <Cart />
      </BrowserRouter>
    </CartProvider>
  );
};

export default App;
