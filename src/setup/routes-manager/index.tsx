import React, { useContext } from 'react';

// Routing
import { Routes, Route } from 'react-router-dom';

// Pages
import Home from 'src/pages/home';
import Products from 'src/pages/products';
import Login from 'src/pages/login';
import SignUp from 'src/pages/signup';
import AddProduct from 'src/pages/add-product';

// Context
import { AuthContext } from 'src/context/auth-context';

const RoutesManager = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/products' element={<Products />} />
      {!isLoggedIn && (
        <>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
        </>
      )}
      {true && (
        <>
          <Route path='/add-product' element={<AddProduct />} />
        </>
      )}
    </Routes>
  );
};

export default RoutesManager;
