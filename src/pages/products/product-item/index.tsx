import React, { useContext, useState } from 'react';

// Material UI
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

// Types
import { Product } from '../models';
import { CartContext } from 'src/context/cart-context';
import Typography from '@mui/material/Typography';
import { AuthContext } from 'src/context/auth-context';
import { useNavigate } from 'react-router-dom';

import { toCurrency } from 'src/utils/util';

interface propType {
  product: Product;
}

const ProductItem: React.FC<propType> = props => {
  const { addToCart } = useContext(CartContext);
  const { isLoggedIn, currentUserType } = useContext(AuthContext);
  const [noImage, setNoImage] = useState<boolean>(false);
  const navigate = useNavigate();

  const addToCartHandler = () => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    const item = {
      id: props.product.id,
      imageKey: props.product.imageKey,
      imageUrl: props.product.imageUrl,
      name: props.product.name,
      quantity: 1,
      price: props.product.price
    };
    addToCart(item);
  };

  const errorImageHandler = () => setNoImage(true);

  const viewProductHandler = () => {
    navigate(`/products/${props.product.id}`);
  };

  return (
    <Grid item xs={12} sm={3}>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', maxWidth: '270px', mx: 'auto' }}>
        <CardActionArea
          sx={{ flexGrow: '1', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
          onClick={viewProductHandler}
        >
          <CardMedia
            component='img'
            width='100%'
            src={noImage ? 'assets/images/no-image-placeholder.png' : `${props.product.imageUrl}`}
            onError={errorImageHandler}
            alt={props.product.name}
            sx={{ flexGrow: '1', objectFit: 'contain', aspectRatio: '107/70' }}
          />
          <CardContent>
            <Typography variant='subtitle1' sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {props.product.name}
            </Typography>
            <Typography
              variant='subtitle2'
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                fontSize: '12px',
                color: 'rgba(0, 0, 0, 0.6)'
              }}
            >
              {`${props.product.availableStocks} pieces available`}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Typography variant='caption'>{toCurrency(props.product.price)}</Typography>
          {currentUserType !== 'admin' && (
            <IconButton color='primary' onClick={addToCartHandler} sx={{ marginLeft: 'auto' }}>
              <AddIcon />
            </IconButton>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ProductItem;
