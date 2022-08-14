import React from 'react';
import Navigation from 'src/common/navigation';

// Routing
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import Home from 'src/pages/home';
import Products from 'src/pages/products';
import Login from 'src/pages/login';
import SignUp from 'src/pages/signup';

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
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </BrowserRouter>
      <Cart />
    </CartProvider>
  );
};

export default App;
