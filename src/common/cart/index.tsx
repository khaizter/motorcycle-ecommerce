import React, { useContext } from 'react';

import { Button, Drawer, IconButton, Stack, Typography } from '@mui/material';

import CartList from 'src/common/cart/cart-list';
import { CartContext } from 'src/context/cart-context';
import CloseIcon from '@mui/icons-material/Close';

const Cart: React.FC = () => {
  const cartCtx = useContext(CartContext);

  return (
    <Drawer anchor='right' open={cartCtx.isOpen} onClose={cartCtx.hideCart}>
      <Stack sx={{ width: { xs: '100vw', md: '450px' }, height: '100%' }} direction='column'>
        <Stack direction='row' sx={{ justifyContent: 'space-between', px: '2rem', py: '1rem' }}>
          <Typography variant='h4'>My Cart</Typography>
          <IconButton onClick={cartCtx.hideCart}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <CartList cartItems={cartCtx.cartItems} />
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
