import { Box, Typography } from '@mui/material';
import React from 'react';
import products from 'src/pages/products';
import ProductList from 'src/pages/products/product-list';

const AddProduct = () => {
  return (
    <Box component='main' sx={{ maxWidth: 'var(--horizontal-wrapper)', mx: 'auto' }}>
      <Typography variant='h3'>Add Product</Typography>
    </Box>
  );
};

export default AddProduct;
