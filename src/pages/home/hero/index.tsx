import { Box, Stack, Typography, Button } from '@mui/material';
import React from 'react';

// Routing
import { Link as RouterLink } from 'react-router-dom';

const Hero = () => {
  return (
    <Box
      sx={{
        background: "url('/assets/images/hero-bg.jpg')",
        minHeight: '650px',
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start'
      }}
    >
      <Stack
        sx={{
          alignItems: 'flex-start',
          width: { xs: '95%', sm: '90%', md: '100%', lg: '100%', xl: '100%' },
          maxWidth: 'var(--horizontal-wrapper)',
          mx: 'auto'
        }}
        spacing={2}
      >
        <Typography variant='h2' component='h1'>
          GNE Motorcycle Parts Shop
        </Typography>
        <Typography>Your Motorcycle Parts in South!</Typography>
        <Button component={RouterLink} to='/products' variant='contained' color='primary'>
          Shop Now
        </Button>
      </Stack>
    </Box>
  );
};

export default Hero;
