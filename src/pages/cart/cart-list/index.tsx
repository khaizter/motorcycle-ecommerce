import { Button, Typography } from '@mui/material';
import List from '@mui/material/List';
import { Stack } from '@mui/system';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CartItem from 'src/pages/cart/cart-item';
import { Item } from 'src/pages/cart/model';

interface propType {
  cartItems: Array<Item>;
}

const CartList: React.FC<propType> = props => {
  const navigate = useNavigate();
  return (
    <List>
      {props.cartItems.map((item, index) => {
        return <CartItem key={index} item={item} />;
      })}
      {props.cartItems.length === 0 && (
        <Stack spacing={2} alignItems='center'>
          <Typography variant='h5' sx={{ color: '#00000081' }}>
            There are no items here.
          </Typography>
          <Button variant='contained' onClick={() => navigate('/products')}>
            Start shopping!
          </Button>
        </Stack>
      )}
    </List>
  );
};

export default CartList;
