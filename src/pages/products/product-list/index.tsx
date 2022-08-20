import React from 'react';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

import ProductItem from 'src/pages/products/product-item';
import AddProduct from 'src/pages/products/add-product';

import { Product } from 'src/pages/products/models';

interface propType {
  products: Array<Product>;
}

const ProductList: React.FC<propType> = props => {
  return (
    <Grid container spacing={2} alignItems='stretch'>
      {props.products.map(product => {
        return <ProductItem key={product.id} product={product} />;
      })}
      {true && <AddProduct />}
    </Grid>
  );
};

export default ProductList;
