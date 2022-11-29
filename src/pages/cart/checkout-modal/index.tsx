import React, { useState, useContext } from 'react';
import Button from '@mui/material/Button';
import { LoadingButton } from '@mui/lab';
import { Dialog, DialogTitle, DialogContent, Stack, DialogActions } from '@mui/material';
import OrderApi from 'src/common/api/order';
import { AuthContext } from 'src/context/auth-context';
import { CartContext } from 'src/context/cart-context';

interface propType {
  open: boolean;
  handleClose: () => void;
  deliveryAddress: string;
}

const CheckoutModal: React.FC<propType> = props => {
  const { currentToken } = useContext(AuthContext);
  const { cartItems, emptyCart } = useContext(CartContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const confirmHandler = async () => {
    console.log('place holder');
    setIsSubmitting(true);

    if (!currentToken) {
      console.log('not auth');
      return;
    }

    if (!props.deliveryAddress) {
      console.log('invalid address');
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
        console.log(response);
        emptyCart();
        setIsSubmitting(false);
        props.handleClose();
      })
      .catch(err => {
        console.log(err);
        setIsSubmitting(false);
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
