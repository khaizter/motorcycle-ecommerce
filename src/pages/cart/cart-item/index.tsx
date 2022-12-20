import React, { useContext, useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';

import { Item } from 'src/pages/cart/model';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { CartContext } from 'src/context/cart-context';
import { toCurrency } from 'src/utils/util';
import { TextField, Tooltip } from '@mui/material';

import { useSnackbar } from 'notistack';

interface propType {
  item: Item;
}

const CartItem: React.FC<propType> = props => {
  const cartCtx = useContext(CartContext);
  const [noImage, setNoImage] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<string>(props.item.quantity?.toString());

  const { enqueueSnackbar } = useSnackbar();

  const [showTooltip, setShowTooltip] = useState(false);

  const removeItemHandler = () => {
    cartCtx.removeFromCart(props.item.id);
  };

  // const incrementHandler = () => {
  //   cartCtx.editItemQuantity(props.item.id, props.item.quantity + 1);
  // };

  // const decrementHandler = () => {
  //   cartCtx.editItemQuantity(props.item.id, props.item.quantity - 1);
  // };

  const blurInputHandler = (e: any) => {
    setShowTooltip(false);
    if (e.target.value === '') {
      setQuantity('1');
    }
  };

  const quantityInputHandler = (e: any) => {
    if (e.target.value === '0') {
      setQuantity('1');
      return;
    }
    if (props.item.availableStocks === 0) {
      setQuantity('1');
      return;
    }
    if (props.item.availableStocks && +e.target.value > props.item.availableStocks) {
      setQuantity(props.item.availableStocks.toString());
      return;
    }
    setQuantity(e.target.value);
  };

  useEffect(() => {
    if (+quantity <= 0) {
      // enqueueSnackbar('Invalid quantity', { variant: 'warning' });
      return;
    }
    cartCtx.editItemQuantity(props.item.id, +quantity);
  }, [quantity]);

  const errorImageHandler = () => setNoImage(true);

  return (
    <ListItem sx={{ width: '100%', minHeight: '160px', px: 0, py: '1rem', alignItems: 'center' }}>
      <ListItemAvatar sx={{ width: '20%' }}>
        <Avatar
          alt={props.item.name}
          src={noImage ? 'assets/images/no-image-placeholder.png' : props.item.imageUrl}
          onError={errorImageHandler}
          sx={{ width: '100%', height: '100%' }}
          variant='square'
        />
      </ListItemAvatar>
      <Box flexGrow={1}>
        <Stack direction='row' justifyContent='center'>
          <ListItemText primary={props.item.name} sx={{ flexGrow: 1 }} />
          <ListItemButton sx={{ flexGrow: 0 }} onClick={removeItemHandler}>
            <ListItemIcon sx={{ minWidth: 0 }}>
              <DeleteForeverIcon />
            </ListItemIcon>
          </ListItemButton>
        </Stack>
        <Stack direction='row' alignItems='center' justifyContent='space-between'>
          <Stack direction='row' alignItems='center'>
            <ListItemText>{toCurrency(props.item.price)}</ListItemText>
            {/* <ListItemButton sx={{ flexGrow: 0 }} onClick={incrementHandler}>
              <ListItemIcon sx={{ minWidth: 0 }}>
                <AddIcon />
              </ListItemIcon>
            </ListItemButton>
            <ListItemText primary={props.item.quantity} sx={{ flexGrow: 0 }} /> */}
            <Tooltip
              title={`Stocks: ${props.item.availableStocks}`}
              onClose={() => setShowTooltip(false)}
              open={showTooltip}
              disableFocusListener
              disableHoverListener
              disableTouchListener
            >
              <TextField
                value={quantity}
                margin='none'
                type='number'
                onChange={quantityInputHandler}
                size='small'
                sx={{ maxWidth: '100px', ml: '1rem' }}
                onFocus={() => setShowTooltip(true)}
                onBlur={blurInputHandler}
                onKeyDown={(e: any) => {
                  if (e?.key === '-' || e?.key === '+') {
                    e.preventDefault();
                  }
                }}
              />
            </Tooltip>

            {/* <ListItemButton
              sx={{ flexGrow: 0 }}
              onClick={decrementHandler}
              disabled={props.item.quantity === 1 ? true : false}
            >
              <ListItemIcon sx={{ minWidth: 0 }}>
                <RemoveIcon />
              </ListItemIcon>
            </ListItemButton> */}
          </Stack>
          <ListItemText sx={{ flexGrow: 0 }}>{toCurrency(props.item.quantity * props.item.price)}</ListItemText>
        </Stack>
      </Box>
    </ListItem>
  );
};

export default CartItem;
