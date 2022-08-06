import React from 'react';

// Material UI
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Link from '@mui/material/Link';

// Routing
import { Link as RouterLink } from 'react-router-dom';

const NavigationBar: React.FC = () => {
  return (
    <AppBar position='static'>
      <Toolbar disableGutters sx={{ flexGrow: 1, maxWidth: 'var(--horizontal-wrapper)', width: '100%', mx: 'auto' }}>
        <IconButton size='large' aria-label='menu' sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant='h6' sx={{ flexGrow: 1 }}>
          Motorcycle
        </Typography>
        <Button component={RouterLink} color='inherit' to='/'>
          Home
        </Button>
        <Button component={RouterLink} color='inherit' to='/products'>
          Products
        </Button>
        <IconButton size='large' aria-label='cart'>
          <ShoppingCartOutlinedIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
