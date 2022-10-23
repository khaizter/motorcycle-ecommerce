import List from '@mui/material/List';
import React from 'react';
import CartItem from 'src/pages/cart/cart-item';
import { Item } from 'src/pages/cart/model';

interface propType {
  cartItems: Array<Item>;
}

const CartList: React.FC<propType> = props => {
  return (
    <List>
      {props.cartItems.map((item, index) => {
        return <CartItem key={index} item={item} />;
      })}
    </List>
  );
};

export default CartList;
