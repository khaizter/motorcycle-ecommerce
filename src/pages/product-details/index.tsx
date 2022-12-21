import React, { useContext, useEffect, useState } from 'react';
import { Avatar, Box, Button, Grid, Stack, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import ProductApi from 'src/common/api/product';
import { Product } from './models';
import { AuthContext } from 'src/context/auth-context';
import { CartContext } from 'src/context/cart-context';
import { toCurrency } from 'src/utils/util';

import { useSnackbar } from 'notistack';
import useModal from 'src/hooks/useModal';
import StocksForm from 'src/pages/product-details/stocks-form';

const ProductDetail = () => {
  const { productId } = useParams();
  const { isLoggedIn, currentToken, currentUserType } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState<Product>();
  const [noImage, setNoImage] = useState<boolean>(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [openStocksModal, handleOpenStocksModal, handleCloseStocksModal] = useModal();

  const getProductInfo = () => {
    if (!productId) return;
    ProductApi.getProduct(productId)
      .then(response => {
        setProduct(response.data.product);
      })
      .catch(err => {
        enqueueSnackbar(err?.response?.data?.message || err.message, { variant: 'error' });
      });
  };

  useEffect(() => {
    getProductInfo();
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
        enqueueSnackbar(response.data.message || 'Login successful', { variant: 'success' });
        navigate('/products');
      })
      .catch(err => {
        enqueueSnackbar(err?.response?.data?.message || err.message, { variant: 'error' });
      });
  };

  return (
    <Box component='main' sx={{ maxWidth: 'var(--horizontal-wrapper)', mx: 'auto', py: '4rem', px: { xs: '2rem' } }}>
      {product && (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} sx={{ px: '1rem' }}>
              <Avatar
                src={noImage ? 'assets/images/no-image-placeholder.png' : `${product?.imageUrl}`}
                onError={errorImageHandler}
                alt={product?.name}
                variant='square'
                sx={{ width: '100%', height: 'auto' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography
                variant='h2'
                sx={{ fontWeight: '400', mt: '1rem', color: 'var(--primary-color)' }}
                gutterBottom
              >
                {product?.name}
              </Typography>
              <Typography variant='subtitle1' sx={{ fontSize: '12px', color: 'rgba(0, 0, 0, 0.6)' }}>
                {product?.availableStocks ? `${product.availableStocks} pieces available` : 'Sold out'}
              </Typography>
              <Typography variant='subtitle1' gutterBottom>
                {product?.description}
              </Typography>
              <Typography variant='subtitle2' gutterBottom>
                {toCurrency(product?.price)}
              </Typography>
              <Stack direction='row' spacing={2} sx={{ mt: '1rem' }}>
                {currentUserType !== 'admin' && (
                  <Button variant='contained' onClick={addToCartHandler} disabled={!product.availableStocks}>
                    Add to cart
                  </Button>
                )}

                {currentUserType === 'admin' && (
                  <>
                    <Button variant='contained' onClick={handleOpenStocksModal}>
                      Update Stocks
                    </Button>
                    <StocksForm
                      open={openStocksModal}
                      handleClose={handleCloseStocksModal}
                      refreshInfo={getProductInfo}
                      productId={productId}
                    />
                    <Button variant='contained' onClick={deleteProductHandler}>
                      Delete Product
                    </Button>
                  </>
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
