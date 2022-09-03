import { Grid, Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, IconButton } from '@mui/material';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const navigate = useNavigate();

  const addProductHandler = () => {
    navigate('/add-product');
  };

  return (
    <Grid item xs={3} sx={{ minHeight: '258px' }}>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardActionArea
          sx={{
            flexGrow: '1',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onClick={addProductHandler}
        >
          <AddIcon fontSize='large' />
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default AddProduct;
