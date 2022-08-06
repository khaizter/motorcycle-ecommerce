import React from 'react';

import { Drawer } from '@mui/material';

import CartList from 'src/common/cart/cart-list';

interface propType {
  open: boolean;
  onClose: () => void;
}

const Cart: React.FC<propType> = props => {
  return (
    <Drawer anchor='right' open={props.open} onClose={props.onClose}>
      <CartList />
    </Drawer>
  );
};

export default Cart;
