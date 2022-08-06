import React from 'react';

import { List } from '@mui/material';

import CartItem from 'src/common/cart/cart-item';

const CartList: React.FC = () => {
  return (
    <List>
      <CartItem />
    </List>
  );
};

export default CartList;
