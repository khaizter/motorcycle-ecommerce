import React, { useContext, useEffect } from 'react';

import { Button, Drawer, IconButton, Stack, Typography } from '@mui/material';

import CartList from 'src/common/cart/cart-list';
import { CartContext } from 'src/context/cart-context';
import CloseIcon from '@mui/icons-material/Close';
import { AuthContext } from 'src/context/auth-context';

import CartApi from 'src/common/api/cart';

const Cart: React.FC = () => {
  const { isOpen, hideCart, cartItems, setCart } = useContext(CartContext);
  const { currentToken } = useContext(AuthContext);

  useEffect(() => {
    if (!currentToken) return;
    CartApi.getCart(currentToken)
      .then(response => {
        setCart(response.data.cart.items);
      })
      .catch(err => {
        console.log(err);
      });
  }, [currentToken]);

  return (
    <Drawer anchor='right' open={isOpen} onClose={hideCart}>
      <Stack sx={{ width: { xs: '100vw', md: '450px' }, height: '100%' }} direction='column'>
        <Stack direction='row' sx={{ justifyContent: 'space-between', px: '2rem', py: '1rem' }}>
          <Typography variant='h4'>My Cart</Typography>
          <IconButton onClick={hideCart}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <CartList cartItems={cartItems} />
        <Stack direction='column' spacing={2} sx={{ px: '2rem', py: '1rem' }}>
          <Stack direction='row' sx={{ justifyContent: 'space-between' }}>
            <Typography>Total</Typography>
            <Typography>14.00</Typography>
          </Stack>
          <Button variant='contained'>Order</Button>
        </Stack>
      </Stack>
    </Drawer>
  );
};

export default Cart;
