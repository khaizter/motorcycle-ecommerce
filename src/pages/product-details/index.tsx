import React, { useEffect, useState } from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import ProductApi from 'src/common/api/product';
import { Product } from './models';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product>();
  const [noImage, setNoImage] = useState<boolean>(false);
  useEffect(() => {
    if (!productId) return;
    ProductApi.getProduct(productId)
      .then(response => {
        setProduct(response.data.product);
      })
      .catch(err => {
        console.log(err);
      });
  }, [productId]);

  const errorImageHandler = () => setNoImage(true);

  console.log(product);

  return (
    <Box component='main' sx={{ maxWidth: 'var(--horizontal-wrapper)', mx: 'auto' }}>
      <Typography variant='h3'>Product Detail</Typography>
      {product && (
        <>
          <Avatar
            src={noImage ? 'assets/images/no-image-placeholder.png' : `${product?.imageUrl}`}
            onError={errorImageHandler}
            alt={product?.name}
            variant='square'
          />
          <Typography variant='body1'>{product?.name}</Typography>
          <Typography variant='body1'>{product?.description}</Typography>
          <Typography variant='body1'>{product?.price}</Typography>
        </>
      )}
    </Box>
  );
};

export default ProductDetail;
