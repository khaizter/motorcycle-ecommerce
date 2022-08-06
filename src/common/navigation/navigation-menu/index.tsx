import React from 'react';

import Drawer from '@mui/material/Drawer';
import { Box, List, ListItem, ListItemButton, ListItemText } from '@mui/material';

// Routing
import { Link as RouterLink } from 'react-router-dom';

interface propType {
  open: boolean;
  onClose: () => void;
}

const NavigationMenu: React.FC<propType> = props => {
  return (
    <Drawer anchor='left' open={props.open} onClose={props.onClose}>
      <Box sx={{ minWidth: '250px' }}>
        <List>
          <ListItem>
            <ListItemButton component={RouterLink} to='/' onClick={props.onClose}>
              <ListItemText primary='Home' />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton component={RouterLink} to='/products' onClick={props.onClose}>
              <ListItemText primary='Products' />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default NavigationMenu;
