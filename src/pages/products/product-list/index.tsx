import React from 'react';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

import ProductItem from 'src/pages/products/product-item';

const DUMMY_PRODUCTS = [
  {
    id: '1213',
    image: '/assets/images/product-placeholder.jpg',
    name: 'Triangle',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse.',
    price: 12.99
  },
  {
    id: '1214',
    image: '/assets/images/product-placeholder.jpg',
    name: 'Triangle',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse.',
    price: 12.99
  },
  {
    id: '1215',
    image: '/assets/images/product-placeholder.jpg',
    name: 'Triangle',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse.',
    price: 12.99
  },
  {
    id: '1216',
    image: '/assets/images/product-placeholder.jpg',
    name: 'Triangle',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse.',
    price: 12.99
  }
];

const ProductList: React.FC = () => {
  return (
    <Grid container spacing={2}>
      {DUMMY_PRODUCTS.map(product => {
        return <ProductItem key={product.id} product={product} />;
      })}
    </Grid>
  );
};

export default ProductList;
