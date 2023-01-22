import React, { useContext, useEffect, useState } from 'react';
import { Avatar, Box, Button, Grid, IconButton, Stack, Typography, Tooltip } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import ProductApi from 'src/common/api/product';
import { Product } from './models';
import { AuthContext } from 'src/context/auth-context';
import { CartContext } from 'src/context/cart-context';
import { toCurrency } from 'src/utils/util';

import { useSnackbar } from 'notistack';
import useModal from 'src/hooks/useModal';
import StocksForm from 'src/pages/product-details/stocks-form';
import ProductForm from 'src/pages/product-details/product-form';

import EditIcon from '@mui/icons-material/Edit';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import ConfirmationModal from 'src/common/confirmation-modal';

const ProductDetail = () => {
  const { productId } = useParams();
  const { isLoggedIn, currentToken, currentUserType } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState<Product>();
  const [noImage, setNoImage] = useState<boolean>(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [openStocksModal, handleOpenStocksModal, handleCloseStocksModal] = useModal();
  const [openProductModal, handleOpenProductModal, handleCloseProductModal] = useModal();
  const [openDeleteConfirmation, handleOpenDeleteConfirmation, handleCloseDeleteConfirmation] = useModal(false);

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
              <Stack direction='row' alignItems='center' justifyContent='space-between'>
                <Typography
                  variant='h2'
                  sx={{ fontWeight: '400', mt: '1rem', color: 'var(--primary-color)' }}
                  gutterBottom
                >
                  {product?.name}
                </Typography>
                {currentUserType === 'admin' && (
                  <>
                    <Tooltip title='Edit product'>
                      <IconButton
                        color='primary'
                        aria-label='edit product'
                        size='medium'
                        onClick={handleOpenProductModal}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>

                    <ProductForm
                      open={openProductModal}
                      handleClose={handleCloseProductModal}
                      refreshInfo={getProductInfo}
                      productId={productId}
                      initialValues={{
                        name: product.name,
                        description: product.description,
                        price: product.price,
                        availableStocks: product.availableStocks
                      }}
                    />
                  </>
                )}
              </Stack>

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
                    <Button variant='contained' startIcon={<EditOutlinedIcon />} onClick={handleOpenStocksModal}>
                      Update Stocks
                    </Button>
                    <StocksForm
                      open={openStocksModal}
                      handleClose={handleCloseStocksModal}
                      refreshInfo={getProductInfo}
                      productId={productId}
                      initialValues={{ availableStocks: product.availableStocks }}
                    />
                    <Button
                      variant='contained'
                      startIcon={<DeleteForeverOutlinedIcon />}
                      onClick={handleOpenDeleteConfirmation}
                      color='error'
                    >
                      Delete Product
                    </Button>
                    <ConfirmationModal
                      open={openDeleteConfirmation}
                      handleClose={handleCloseDeleteConfirmation}
                      message='Are you sure you want to delete this product?'
                      confirmFunction={deleteProductHandler}
                    />
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
