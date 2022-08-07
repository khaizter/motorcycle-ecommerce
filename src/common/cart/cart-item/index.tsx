import { Avatar, Box, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack } from '@mui/material';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import React from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Item } from 'src/common/cart/model';

interface propType {
  item: Item;
}

const CartItem: React.FC<propType> = props => {
  return (
    <ListItem sx={{ width: '100%', minHeight: '160px', px: 0, py: '1rem', alignItems: 'center' }}>
      <ListItemAvatar sx={{ width: '30%' }}>
        <Avatar alt={props.item.name} src={props.item.thumbnail} sx={{ width: '100%', height: '100%' }} />
      </ListItemAvatar>
      <Box flexGrow={1}>
        <Stack direction='row' justifyContent='center'>
          <ListItemText primary={props.item.name} sx={{ flexGrow: 1 }} />
          <ListItemButton sx={{ flexGrow: 0 }}>
            <ListItemIcon sx={{ minWidth: 0 }}>
              <DeleteForeverIcon />
            </ListItemIcon>
          </ListItemButton>
        </Stack>
        <Stack direction='row' alignItems='center' justifyContent='space-between'>
          <Stack direction='row' alignItems='center'>
            <ListItemButton sx={{ flexGrow: 0 }}>
              <ListItemIcon sx={{ minWidth: 0 }}>
                <AddIcon />
              </ListItemIcon>
            </ListItemButton>
            <ListItemText primary={props.item.quantity} sx={{ flexGrow: 0 }} />
            <ListItemButton sx={{ flexGrow: 0 }}>
              <ListItemIcon sx={{ minWidth: 0 }}>
                <RemoveIcon />
              </ListItemIcon>
            </ListItemButton>
          </Stack>
          <ListItemText sx={{ flexGrow: 0 }}>14.99</ListItemText>
        </Stack>
      </Box>
    </ListItem>
  );
};

export default CartItem;
