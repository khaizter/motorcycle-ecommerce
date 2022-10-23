import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React, { useContext, useEffect } from 'react';

import CartApi from 'src/common/api/cart';
import { AuthContext } from 'src/context/auth-context';
import { CartContext } from 'src/context/cart-context';
import CartList from 'src/pages/cart/cart-list';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import CheckoutModal from 'src/pages/cart/checkout-modal';

const Cart = () => {
  const { cartItems } = useContext(CartContext);
  const deliveryAddress = '18 castaneda St';
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box component='main' sx={{ maxWidth: 'var(--horizontal-wrapper)', mx: 'auto' }}>
      <Typography variant='h3'>My Cart</Typography>
      <CartList cartItems={cartItems} />
      <Stack direction='row' alignItems='center'>
        <PlaceOutlinedIcon />
        <Typography flexGrow={1} variant='body1'>
          Ship to {deliveryAddress}
        </Typography>
        <Button variant='text'>Change</Button>
      </Stack>
      <Button variant='contained' onClick={handleOpen}>
        Checkout
      </Button>
      <CheckoutModal open={open} handleClose={handleClose} />
    </Box>
  );
};

export default Cart;
