import React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Home: React.FC = () => {
  return (
    <Box component='main'>
      <Box
        sx={{
          background: "url('/assets/images/hero-bg.jpg')",
          minHeight: '650px',
          backgroundSize: 'cover',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Box
          sx={{
            maxWidth: 'var(--horizontal-wrapper)'
          }}
        >
          <Typography variant='h2' component='h1'>
            Lorem, ipsum dolor.
          </Typography>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam iure voluptatum voluptatibus quae,
            nulla deleniti numquam consequuntur exercitationem est nostrum modi, libero temporibus debitis.
          </Typography>
          <Button variant='contained' color='primary'>
            Shop Now
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
