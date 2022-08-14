import React, { useContext } from 'react';

// Material UI
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

// Types
import { Product } from '../models';
import { CartContext } from 'src/context/cart-context';
import Typography from '@mui/material/Typography';

interface propType {
  product: Product;
}

const ProductItem: React.FC<propType> = props => {
  const { addToCart } = useContext(CartContext);

  const addToCartHandler = () => {
    const item = {
      id: props.product.id,
      thumbnail: props.product.image,
      name: props.product.name,
      quantity: 1,
      price: props.product.price
    };
    addToCart(item);
  };

  return (
    <Grid item xs={3}>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardActionArea sx={{ flexGrow: '1', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
          <CardMedia
            component='img'
            width='100%'
            image={props.product.image}
            alt={props.product.name}
            sx={{ flexGrow: '1', objectFit: 'initial' }}
          />
          <CardContent>
            <Typography variant='subtitle1'>{props.product.name}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Typography variant='caption'>{props.product.price}</Typography>
          <IconButton color='primary' onClick={addToCartHandler} sx={{ marginLeft: 'auto' }}>
            <AddIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ProductItem;