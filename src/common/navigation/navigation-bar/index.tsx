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
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

// Routing
import { useNavigate } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

// Context
import { CartContext } from 'src/context/cart-context';

// Types
import { NavigationItem } from 'src/common/navigation/model';
import { AuthContext } from 'src/context/auth-context';
import { Box, SpeedDial, SpeedDialAction } from '@mui/material';

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
    <AppBar position='sticky'>
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
          GNE Motorcycle
        </Typography>
        <Stack direction='row' spacing={2} sx={{ display: { xs: 'none', md: 'flex' } }}>
          {props.navigations.map((navigation, index) => {
            return (
              <Button key={index} component={HashLink} color='inherit' to={navigation.path}>
                {navigation.label}
              </Button>
            );
          })}
        </Stack>

        <IconButton size='large' aria-label='cart' onClick={openCartHandler}>
          <ShoppingCartOutlinedIcon />
        </IconButton>
        {isLoggedIn && (
          <Box sx={{ width: '40px', height: '40px' }}>
            <SpeedDial ariaLabel='account menu' icon={<PersonIcon />} direction='down'>
              <SpeedDialAction icon={<ShoppingCartIcon />} tooltipTitle='View Cart' onClick={() => navigate('/cart')} />
              <SpeedDialAction
                icon={<ShoppingBagIcon />}
                tooltipTitle='View Orders'
                onClick={() => navigate('/order')}
              />
              <SpeedDialAction
                icon={<ManageAccountsIcon />}
                tooltipTitle='Manage Account'
                onClick={() => navigate('/account')}
              />
              <SpeedDialAction icon={<LogoutIcon />} tooltipTitle='Log Out' onClick={logout} />
            </SpeedDial>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
