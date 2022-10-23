import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';

const Cart = () => {
  return (
    <Box component='main' sx={{ maxWidth: 'var(--horizontal-wrapper)', mx: 'auto' }}>
      <Typography variant='h3'>My Cart</Typography>
    </Box>
  );
};

export default Cart;
