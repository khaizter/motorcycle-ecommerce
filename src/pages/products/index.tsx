import React from 'react';

import Box from '@mui/material/Box';

import ProductList from './product-list';
import { Typography } from '@mui/material';

const DUMMY_PRODUCTS = [
  {
    id: '1213',
    image: '/assets/images/product-placeholder_0.jpg',
    name: 'Triangle',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse.',
    price: 14.99
  },
  {
    id: '1214',
    image: '/assets/images/product-placeholder_2.jpg',
    name: 'Triangle1',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse.',
    price: 12.99
  },
  {
    id: '1215',
    image: '/assets/images/product-placeholder_1.jpg',
    name: 'Triangle2',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse.',
    price: 12.95
  },
  {
    id: '1216',
    image: '/assets/images/product-placeholder_0.jpg',
    name: 'Triangle3',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse.',
    price: 42.99
  }
];

const Products: React.FC = () => {
  return (
    <Box component='main' sx={{ maxWidth: 'var(--horizontal-wrapper)', mx: 'auto' }}>
      <Typography variant='h3'>Products</Typography>
      <ProductList products={DUMMY_PRODUCTS} />
    </Box>
  );
};

export default Products;
