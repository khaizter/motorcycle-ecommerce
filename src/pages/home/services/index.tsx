import { Box, Stack, Card, CardContent, Typography, CardMedia, Grid } from '@mui/material';
import React from 'react';

const CONTENT = [
  {
    icon: 'assets/icons/engineering.png',
    title: 'Oil and Battery Recycling',
    description: 'Services We Supply'
  },
  {
    icon: 'assets/icons/motorcycle.png',
    title: 'Motorcycle Condition',
    description: "We've Got it Taken Care of"
  },
  {
    icon: 'assets/icons/petrol.png',
    title: 'Oil and Battery Recycling',
    description: 'Services We Supply'
  }
];

const Services = () => {
  return (
    <Box id='services' sx={{ background: 'var(--primary-color)', py: '6rem' }}>
      <Typography variant='h2' component='h1' sx={{ color: '#FFFFFF', textAlign: 'center' }}>
        Services
      </Typography>
      <Grid
        container
        spacing={4}
        sx={{
          width: { xs: '95%', sm: '90%', md: '100%', lg: '100%', xl: '100%' },
          maxWidth: 'var(--horizontal-wrapper)',
          mx: 'auto',
          mt: '.75rem',
          alignItems: 'stretch'
        }}
      >
        {CONTENT.map((item, index) => {
          return (
            <Grid item xs={4} key={index}>
              <Card sx={{ p: '1.5rem', height: '100%' }}>
                <CardMedia
                  component='img'
                  src={item.icon}
                  alt='green iguana'
                  sx={{ height: '60px', background: 'initial', width: 'auto', mx: 'auto' }}
                />
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography gutterBottom variant='h5' component='div'>
                    {item.title}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Services;
