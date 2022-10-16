import React, { useContext, useEffect, useState } from 'react';
import { Avatar, Box, Button, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import ProductApi from 'src/common/api/product';
import { Product } from './models';
import { AuthContext } from 'src/context/auth-context';
import { CartContext } from 'src/context/cart-context';

const ProductDetail = () => {
  const { productId } = useParams();
  const { isLoggedIn } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState<Product>();
  const [noImage, setNoImage] = useState<boolean>(false);
  const navigate = useNavigate();

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
          <Button onClick={addToCartHandler}>Add to card</Button>
        </>
      )}
    </Box>
  );
};

export default ProductDetail;
