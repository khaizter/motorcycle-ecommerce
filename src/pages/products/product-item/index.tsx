import React from 'react';

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

interface propType {
  product: Product;
}

const ProductItem: React.FC<propType> = props => {
  return (
    <Grid item xs={3}>
      <Card>
        <CardActionArea>
          <CardMedia component='img' width='100%' image={props.product.image} alt={props.product.name} />
          <CardContent>{props.product.description}</CardContent>
        </CardActionArea>
        <CardActions disableSpacing>
          <IconButton color='primary'>
            <AddIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ProductItem;
