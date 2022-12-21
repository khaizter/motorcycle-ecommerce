import { Box, Divider, Stack, Typography } from '@mui/material';
import React from 'react';
import ProductForm from './product-form';

const AddProduct = () => {
  return (
    <Box
      component='main'
      sx={{ maxWidth: 'var(--horizontal-wrapper)', mx: 'auto', py: '2rem', px: { xs: '1rem', md: '0' } }}
    >
      <Typography variant='h3'>Add Product</Typography>
      <Divider sx={{ my: '2rem' }} />
      <ProductForm />
    </Box>
  );
};

export default AddProduct;
