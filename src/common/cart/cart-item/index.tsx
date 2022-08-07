import { Avatar, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import React from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const CartItem: React.FC = () => {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar variant='square'>P</Avatar>
      </ListItemAvatar>
      <ListItemText primary={'item'} />
      <ListItemButton sx={{ flexGrow: 0 }}>
        <ListItemIcon sx={{ minWidth: 0 }}>
          <AddIcon />
        </ListItemIcon>
      </ListItemButton>
      <ListItemText primary={'0'} sx={{ flexGrow: 0 }} />
      <ListItemButton sx={{ flexGrow: 0 }}>
        <ListItemIcon sx={{ minWidth: 0 }}>
          <RemoveIcon />
        </ListItemIcon>
      </ListItemButton>
      <ListItemButton sx={{ flexGrow: 0 }}>
        <ListItemIcon sx={{ minWidth: 0 }}>
          <DeleteForeverIcon />
        </ListItemIcon>
      </ListItemButton>
    </ListItem>
  );
};

export default CartItem;
