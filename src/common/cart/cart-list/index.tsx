import React, { useContext } from 'react';

import { List } from '@mui/material';
import ListSubheader from '@mui/material/ListSubheader';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import CartItem from 'src/common/cart/cart-item';
import { CartContext } from 'src/context/cart-context';

const CartList: React.FC = () => {
  const cartCtx = useContext(CartContext);

  return (
    <List sx={{ minWidth: { xs: '100vw', md: '450px' } }}>
      <ListSubheader>
        <IconButton onClick={cartCtx.hideCart}>
          <CloseIcon />
        </IconButton>
      </ListSubheader>
      <CartItem />
    </List>
  );
};

export default CartList;
