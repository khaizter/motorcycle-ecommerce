import React, { useContext, useEffect } from 'react';

import { Box, Button, Drawer, IconButton, Stack, Typography } from '@mui/material';

import CartList from 'src/common/cart-drawer/cart-list';
import { CartContext } from 'src/context/cart-context';
import CloseIcon from '@mui/icons-material/Close';
import { AuthContext } from 'src/context/auth-context';
import { toCurrency } from 'src/utils/util';
import CircularProgress from '@mui/material/CircularProgress';

import CartApi from 'src/common/api/cart';

import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

const CartDrawer: React.FC = () => {
  const { isOpen, hideCart, cartItems, setCart } = useContext(CartContext);
  const { currentToken } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();
  const totalPrice = cartItems.reduce((previousValue, item) => previousValue + item.price * item.quantity, 0);

  const navigate = useNavigate();

  return (
    <Drawer anchor='right' open={isOpen} onClose={hideCart}>
      <Stack sx={{ width: { xs: '100vw', md: '450px' }, height: '100%' }} direction='column'>
        <Stack direction='row' sx={{ justifyContent: 'space-between', px: '2rem', py: '1rem' }}>
          <Typography variant='h4'>My Cart</Typography>
          <IconButton onClick={hideCart}>
            <CloseIcon />
          </IconButton>
        </Stack>
        {false ? (
          <Stack sx={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress />
          </Stack>
        ) : (
          <CartList cartItems={cartItems} />
        )}
        <Stack direction='column' spacing={2} sx={{ px: '2rem', py: '1rem' }}>
          <Stack direction='row' sx={{ justifyContent: 'space-between' }}>
            <Typography>Total</Typography>
            <Typography>{toCurrency(totalPrice)}</Typography>
          </Stack>
          <Button
            variant='contained'
            onClick={() => {
              navigate('/cart');
              hideCart();
            }}
          >
            Checkout
          </Button>
        </Stack>
      </Stack>
    </Drawer>
  );
};

export default CartDrawer;
