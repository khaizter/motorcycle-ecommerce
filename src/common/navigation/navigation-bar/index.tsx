import React, { useContext } from 'react';

// Material UI
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Stack from '@mui/material/Stack';

// Routing
import { Link as RouterLink } from 'react-router-dom';
import { CartContext } from 'src/context/cart-context';

// Types
import { NavigationItem } from 'src/common/navigation/model';

interface propType {
  menuHandler: () => void;
  navigations: Array<NavigationItem>;
}

const NavigationBar: React.FC<propType> = props => {
  const cartCtx = useContext(CartContext);

  return (
    <AppBar position='static'>
      <Toolbar disableGutters sx={{ flexGrow: 1, maxWidth: 'var(--horizontal-wrapper)', width: '100%', mx: 'auto' }}>
        <IconButton
          size='large'
          aria-label='menu'
          sx={{ display: { xs: 'flex', md: 'none' }, mr: 2 }}
          onClick={props.menuHandler}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant='h6' sx={{ flexGrow: 1 }}>
          Motorcycle
        </Typography>
        <Stack direction='row' spacing={2} sx={{ display: { xs: 'none', md: 'flex' } }}>
          {props.navigations.map((navigation, index) => {
            return (
              <Button key={index} component={RouterLink} color='inherit' to={navigation.path}>
                {navigation.label}
              </Button>
            );
          })}
        </Stack>

        <IconButton size='large' aria-label='cart' onClick={cartCtx.showCart}>
          <ShoppingCartOutlinedIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
