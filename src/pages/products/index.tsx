import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';

import ProductList from './product-list';
import { Typography } from '@mui/material';

import { Product } from 'src/pages/products/models';

import ProductApi from 'src/common/api/product';

const Products: React.FC = () => {
  const [products, setProducts] = useState<Array<Product>>([]);

  useEffect(() => {
    ProductApi.getProducts()
      .then(response => {
        console.log(response.data.products);
        const transformedProducts = response.data.products.map((product: any) => {
          return {
            id: product._id,
            image: product.image,
            name: product.name,
            description: product.description,
            price: product.price
          };
        });
        setProducts(transformedProducts);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <Box component='main' sx={{ maxWidth: 'var(--horizontal-wrapper)', mx: 'auto' }}>
      <Typography variant='h3'>Products</Typography>
      <ProductList products={products} />
    </Box>
  );
};

export default Products;
