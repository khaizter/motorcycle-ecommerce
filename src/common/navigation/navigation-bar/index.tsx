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
import Avatar from '@mui/material/Avatar';

// Routing
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// Context
import { CartContext } from 'src/context/cart-context';

// Types
import { NavigationItem } from 'src/common/navigation/model';
import { AuthContext } from 'src/context/auth-context';

interface propType {
  menuHandler: () => void;
  navigations: Array<NavigationItem>;
}

const NavigationBar: React.FC<propType> = props => {
  const navigate = useNavigate();
  const { showCart } = useContext(CartContext);
  const { isLoggedIn, logout, currentUserName } = useContext(AuthContext);

  const openCartHandler = () => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    showCart();
  };

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

        <IconButton size='large' aria-label='cart' onClick={openCartHandler}>
          <ShoppingCartOutlinedIcon />
        </IconButton>
        {isLoggedIn && (
          <IconButton size='large' aria-label='cart' onClick={logout}>
            <Avatar>{currentUserName?.charAt(0) || 'A'}</Avatar>
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
