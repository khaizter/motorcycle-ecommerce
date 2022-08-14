import React from 'react';

import Drawer from '@mui/material/Drawer';
import { Box, List, ListItem, ListItemButton, ListItemText } from '@mui/material';

// Routing
import { Link as RouterLink } from 'react-router-dom';

// Types
import { NavigationItem } from 'src/common/navigation/model';

interface propType {
  open: boolean;
  onClose: () => void;
  navigations: Array<NavigationItem>;
}

const NavigationMenu: React.FC<propType> = props => {
  return (
    <Drawer anchor='left' open={props.open} onClose={props.onClose}>
      <Box sx={{ minWidth: '250px' }}>
        <List>
          {props.navigations.map((navigation, index) => {
            return (
              <ListItem key={index}>
                <ListItemButton component={RouterLink} to={navigation.path} onClick={props.onClose}>
                  <ListItemText primary={navigation.label} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
};

export default NavigationMenu;
