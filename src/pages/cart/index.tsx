import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React, { useState, useContext, useEffect } from 'react';

import { AuthContext } from 'src/context/auth-context';
import { CartContext } from 'src/context/cart-context';
import CartList from 'src/pages/cart/cart-list';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import CheckoutModal from 'src/pages/cart/checkout-modal';
import useModal from 'src/hooks/useModal';
import DeliveryAddressForm from 'src/pages/account/delivery-address-form';
import AuthApi from 'src/common/api/auth';
import { toCurrency } from 'src/utils/util';

import { useSnackbar } from 'notistack';
import { Divider } from '@mui/material';

const Cart = () => {
  const { cartItems } = useContext(CartContext);
  const { currentToken } = useContext(AuthContext);
  const [deliveryAddress, setDeliveryAddress] = useState<string>('');
  const [openAddress, handleOpenAddress, handleCloseAddress] = useModal(false);
  const [openCheckout, handleOpenCheckout, handleCloseCheckout] = useModal(false);
  const { enqueueSnackbar } = useSnackbar();

  const subTotal = cartItems?.reduce((value, item) => value + item.quantity * item.price, 0) || 0;

  const getUserInfo = () => {
    if (!currentToken) return;
    AuthApi.getUserInfo(currentToken)
      .then(response => {
        if (response?.data?.user) {
          setDeliveryAddress(response.data.user.deliveryAddress);
        }
      })
      .catch(err => {
        enqueueSnackbar(err?.response?.data?.message || err.message, { variant: 'error' });
      });
  };

  useEffect(() => {
    getUserInfo();
  }, [currentToken]);

  return (
    <Box component='main' sx={{ maxWidth: 'var(--horizontal-wrapper)', mx: 'auto', py: '2rem' }}>
      <Typography variant='h3'>Cart</Typography>
      <Divider sx={{ my: '1rem' }} />
      <CartList cartItems={cartItems} />
      <Divider sx={{ my: '1rem' }} />
      <Typography variant='body1' sx={{ textAlign: 'end' }}>
        Subtotal : {toCurrency(subTotal)}
      </Typography>
      <Stack direction='row' alignItems='center' sx={{ mt: '1rem' }}>
        <PlaceOutlinedIcon />
        <Typography flexGrow={1} variant='body1'>
          Ship to {deliveryAddress || 'No delivery address added yet.'}
        </Typography>
        <Button variant='text' onClick={handleOpenAddress}>
          Edit
        </Button>
      </Stack>

      <Box sx={{ textAlign: 'end', mt: '1rem' }}>
        <Button variant='contained' onClick={handleOpenCheckout}>
          Checkout
        </Button>
      </Box>
      <DeliveryAddressForm open={openAddress} handleClose={handleCloseAddress} refreshInfo={getUserInfo} />
      <CheckoutModal open={openCheckout} handleClose={handleCloseCheckout} deliveryAddress={deliveryAddress} />
    </Box>
  );
};

export default Cart;
