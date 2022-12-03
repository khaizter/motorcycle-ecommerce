import React, { useContext, useEffect, useState } from 'react';
import { Avatar, Box, Button, Grid, Stack, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import ProductApi from 'src/common/api/product';
import { Product } from './models';
import { AuthContext } from 'src/context/auth-context';
import { CartContext } from 'src/context/cart-context';
import { toCurrency } from 'src/utils/util';

import { useSnackbar } from 'notistack';

const ProductDetail = () => {
  const { productId } = useParams();
  const { isLoggedIn, currentToken, currentUserType } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState<Product>();
  const [noImage, setNoImage] = useState<boolean>(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (!productId) return;
    ProductApi.getProduct(productId)
      .then(response => {
        setProduct(response.data.product);
      })
      .catch(err => {
        enqueueSnackbar(err?.response?.data?.message || err.message, { variant: 'error' });
      });
  }, [productId]);

  const errorImageHandler = () => setNoImage(true);

  const addToCartHandler = () => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    if (!product) return;
    const item = {
      id: product.id,
      imageKey: product.imageKey,
      imageUrl: product.imageUrl,
      name: product.name,
      quantity: 1,
      price: product.price
    };
    addToCart(item);
  };

  const deleteProductHandler = () => {
    if (!productId || !currentToken) return;
    ProductApi.deleteProduct(currentToken, productId)
      .then(response => {
        enqueueSnackbar(response.data.message || 'Login success', { variant: 'success' });
        navigate('/products');
      })
      .catch(err => {
        enqueueSnackbar(err?.response?.data?.message || err.message, { variant: 'error' });
      });
  };

  return (
    <Box component='main' sx={{ maxWidth: 'var(--horizontal-wrapper)', mx: 'auto' }}>
      {product && (
        <>
          <Grid container spacing={2} sx={{ mt: '4rem' }}>
            <Grid item xs={6} sx={{ px: '1rem' }}>
              <Avatar
                src={noImage ? 'assets/images/no-image-placeholder.png' : `${product?.imageUrl}`}
                onError={errorImageHandler}
                alt={product?.name}
                variant='square'
                sx={{ width: '100%', height: 'auto' }}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant='h2'
                sx={{ fontWeight: '400', mt: '1rem', color: 'var(--primary-color)' }}
                gutterBottom
              >
                {product?.name}
              </Typography>
              <Typography variant='subtitle1' gutterBottom>
                {product?.description}
              </Typography>
              <Typography variant='subtitle2' gutterBottom>
                {toCurrency(product?.price)}
              </Typography>
              <Stack direction='row' spacing={2}>
                {currentUserType !== 'admin' && (
                  <Button variant='contained' onClick={addToCartHandler}>
                    Add to cart
                  </Button>
                )}

                {currentUserType === 'admin' && (
                  <Button variant='contained' onClick={deleteProductHandler}>
                    Delete Product
                  </Button>
                )}
              </Stack>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default ProductDetail;
