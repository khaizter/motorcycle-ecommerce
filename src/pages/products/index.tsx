import React from 'react';

import Box from '@mui/material/Box';

import ProductList from './product-list';
import { Typography } from '@mui/material';

const Products: React.FC = () => {
  return (
    <Box component='main' sx={{ maxWidth: 'var(--horizontal-wrapper)', mx: 'auto' }}>
      <Typography variant='h3'>Products</Typography>
      <ProductList />
    </Box>
  );
};

export default Products;
