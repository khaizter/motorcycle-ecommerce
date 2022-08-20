import React from 'react';

import { List } from '@mui/material';

import CartItem from 'src/common/cart/cart-item';

import { Item } from 'src/common/cart/model';

interface propType {
  cartItems: Array<Item>;
}

const CartList: React.FC<propType> = props => {
  return (
    <List sx={{ flexGrow: 1, px: '2rem' }}>
      {props.cartItems.map((item, index) => {
        return <CartItem key={index} item={item} />;
      })}
    </List>
  );
};

export default CartList;
