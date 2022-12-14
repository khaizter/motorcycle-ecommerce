import { Box, Stack, Typography, Button } from '@mui/material';
import React from 'react';

// Routing
import { Link as RouterLink } from 'react-router-dom';

const Hero = () => {
  return (
    <Box
      id='hero'
      sx={{
        background: "linear-gradient(-45deg, #0000009b, transparent), url('/assets/images/hero-bg.jpg')",
        minHeight: '650px',
        backgroundSize: 'cover',
        backgroundPosition: { xs: '65% 75%', sm: '50% 75%', md: 'initial' },
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
        <Typography variant='h2' component='h1' sx={{ color: '#FFF' }}>
          GNE Motorcycle Parts Shop
        </Typography>
        <Typography sx={{ color: '#ffffffcc' }}>Your Motorcycle Parts in South!</Typography>
        <Button component={RouterLink} to='/products' variant='contained' color='primary'>
          Shop Now
        </Button>
      </Stack>
    </Box>
  );
};

export default Hero;
