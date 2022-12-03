import { Avatar, Button, ListItem, ListItemAvatar, ListItemText, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';

import { ItemType } from 'src/pages/order/model';
import { toCurrency } from 'src/utils/util';

interface PropType {
  item: ItemType;
}

const ProductItem: React.FC<PropType> = props => {
  const { item } = props;
  const [noImage, setNoImage] = useState<boolean>(false);
  const errorImageHandler = () => setNoImage(true);
  return (
    <ListItem
      divider
      secondaryAction={
        <Tooltip title={`₱${item.price} x ${item.quantity}`}>
          <Button aria-label='total price' disableRipple sx={{ cursor: 'default' }} color='info'>
            {toCurrency(item.price * item.quantity)}
          </Button>
        </Tooltip>
      }
    >
      <ListItemAvatar>
        <Avatar
          alt={item.name}
          src={noImage ? 'assets/images/no-image-placeholder.png' : item.imageUrl}
          onError={errorImageHandler}
          variant='square'
        />
      </ListItemAvatar>
      <ListItemText
        primary={
          <>
            <span>{item.name}</span> <span style={{ color: 'rgba(0, 0, 0, 0.6)' }}>x{item.quantity}</span>
          </>
        }
        secondary={toCurrency(item.price)}
      />
    </ListItem>
  );
};

export default ProductItem;
