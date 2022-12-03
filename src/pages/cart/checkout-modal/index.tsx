import React, { useState, useContext } from 'react';
import Button from '@mui/material/Button';
import { LoadingButton } from '@mui/lab';
import { Dialog, DialogTitle, DialogContent, Stack, DialogActions } from '@mui/material';
import OrderApi from 'src/common/api/order';
import { AuthContext } from 'src/context/auth-context';
import { CartContext } from 'src/context/cart-context';

import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

interface propType {
  open: boolean;
  handleClose: () => void;
  deliveryAddress: string;
}

const CheckoutModal: React.FC<propType> = props => {
  const { currentToken } = useContext(AuthContext);
  const { cartItems, emptyCart } = useContext(CartContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const confirmHandler = async () => {
    setIsSubmitting(true);

    if (!currentToken) {
      enqueueSnackbar('No token found', { variant: 'error' });
      setIsSubmitting(false);
      return;
    }

    if (!props.deliveryAddress) {
      enqueueSnackbar('Must have valid address', { variant: 'warning' });
      setIsSubmitting(false);
      return;
    }

    if (cartItems.length === 0) {
      enqueueSnackbar("There's no item to checkout", { variant: 'warning' });
      setIsSubmitting(false);
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

    OrderApi.postOrder(currentToken, transformedItems, props.deliveryAddress)
      .then(response => {
        emptyCart();
        setIsSubmitting(false);
        enqueueSnackbar(response.data.message || 'Order created', { variant: 'success' });
        navigate('/order');
        props.handleClose();
      })
      .catch(err => {
        setIsSubmitting(false);
        enqueueSnackbar(err?.response?.data?.message || err.message, { variant: 'error' });
      });
  };

  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle>Are you sure you want to checkout?</DialogTitle>
      <DialogActions>
        <Button variant='outlined' onClick={props.handleClose}>
          Cancel
        </Button>
        <LoadingButton variant='contained' type='submit' loading={isSubmitting} onClick={confirmHandler}>
          Update
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default CheckoutModal;
