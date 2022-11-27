import React, { useContext } from 'react';

// Routing
import { Routes, Route } from 'react-router-dom';

// Pages
import Home from 'src/pages/home';
import Products from 'src/pages/products';
import Login from 'src/pages/login';
import SignUp from 'src/pages/signup';
import AddProduct from 'src/pages/add-product';
import Account from 'src/pages/account';

// Context
import { AuthContext } from 'src/context/auth-context';
import ProductDetail from 'src/pages/product-details';
import Cart from 'src/pages/cart';
import Order from 'src/pages/order';

const RoutesManager = () => {
  const { isLoggedIn, currentUserType } = useContext(AuthContext);
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/products' element={<Products />} />
      <Route path='/products/:productId' element={<ProductDetail />} />
      {!isLoggedIn && (
        <>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
        </>
      )}
      {isLoggedIn && (
        <>
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<Order />} />
          <Route path='/account' element={<Account />} />
        </>
      )}
      {currentUserType === 'admin' && (
        <>
          <Route path='/add-product' element={<AddProduct />} />
        </>
      )}
    </Routes>
  );
};

export default RoutesManager;
