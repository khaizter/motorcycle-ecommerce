import React, { useContext } from 'react';

import { Drawer } from '@mui/material';

import CartList from 'src/common/cart/cart-list';
import { CartContext } from 'src/context/cart-context';

const Cart: React.FC = () => {
  const cartCtx = useContext(CartContext);

  return (
    <Drawer anchor='right' open={cartCtx.isOpen} onClose={cartCtx.hideCart}>
      <CartList />
    </Drawer>
  );
};

export default Cart;
