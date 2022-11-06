import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React, { useState, useContext } from 'react';

import { AuthContext } from 'src/context/auth-context';
import { CartContext } from 'src/context/cart-context';
import CartList from 'src/pages/cart/cart-list';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import CheckoutModal from 'src/pages/cart/checkout-modal';
import OrderApi from 'src/common/api/order';
import useModal from 'src/hooks/useModal';
import AddressModal from 'src/pages/cart/address-modal';

const Cart = () => {
  const { cartItems, emptyCart } = useContext(CartContext);
  const { currentToken } = useContext(AuthContext);
  const [deliveryAddress, setDeliveryAddress] = useState<string>('');
  const [openAddress, handleOpenAddress, handleCloseAddress] = useModal(false);
  const [openCheckout, handleOpenCheckout, handleCloseCheckout] = useModal(false);

  const updateAddressHandler = (address: string) => {
    setDeliveryAddress(address);
    handleCloseAddress();
  };

  const placeOrderHandler = () => {
    console.log('place holder');
    if (!currentToken) {
      console.log('not auth');
      return;
    }

    const transformedItems = cartItems.map(item => {
      return {
        productId: item.id,
        imageKey: item.imageKey,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      };
    });
    OrderApi.postOrder(currentToken, transformedItems, deliveryAddress)
      .then(response => {
        console.log(response);
        emptyCart();
        handleCloseCheckout();
      })
      .catch(err => {
        console.log(err);
        handleCloseCheckout();
      });
  };

  return (
    <Box component='main' sx={{ maxWidth: 'var(--horizontal-wrapper)', mx: 'auto' }}>
      <Typography variant='h3'>My Cart</Typography>
      <CartList cartItems={cartItems} />
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
      <AddressModal open={openAddress} handleClose={handleCloseAddress} confirmHandler={updateAddressHandler} />
      <CheckoutModal open={openCheckout} handleClose={handleCloseCheckout} confirmHandler={placeOrderHandler} />
    </Box>
  );
};

export default Cart;
