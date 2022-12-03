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

const Cart = () => {
  const { cartItems } = useContext(CartContext);
  const { currentToken } = useContext(AuthContext);
  const [deliveryAddress, setDeliveryAddress] = useState<string>('');
  const [openAddress, handleOpenAddress, handleCloseAddress] = useModal(false);
  const [openCheckout, handleOpenCheckout, handleCloseCheckout] = useModal(false);

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
        console.log(err);
      });
  };

  useEffect(() => {
    getUserInfo();
  }, [currentToken]);

  return (
    <Box component='main' sx={{ maxWidth: 'var(--horizontal-wrapper)', mx: 'auto' }}>
      <Typography variant='h3'>Cart</Typography>
      <CartList cartItems={cartItems} />
      <Typography variant='body1' sx={{ textAlign: 'end' }}>
        Subtotal : {toCurrency(subTotal)}
      </Typography>
      <Stack direction='row' alignItems='center'>
        <PlaceOutlinedIcon />
        <Typography flexGrow={1} variant='body1'>
          Ship to {deliveryAddress || 'No delivery address added yet.'}
        </Typography>
        <Button variant='text' onClick={handleOpenAddress}>
          Change
        </Button>
      </Stack>

      <Button variant='contained' onClick={handleOpenCheckout}>
        Checkout
      </Button>
      <DeliveryAddressForm open={openAddress} handleClose={handleCloseAddress} refreshInfo={getUserInfo} />
      <CheckoutModal open={openCheckout} handleClose={handleCloseCheckout} deliveryAddress={deliveryAddress} />
    </Box>
  );
};

export default Cart;
