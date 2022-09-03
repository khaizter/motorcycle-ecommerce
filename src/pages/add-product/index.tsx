import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import ProductForm from './product-form';

const AddProduct = () => {
  return (
    <Box component='main' sx={{ maxWidth: 'var(--horizontal-wrapper)', mx: 'auto' }}>
      <Typography variant='h3'>Add Product</Typography>
      <ProductForm />
    </Box>
  );
};

export default AddProduct;
