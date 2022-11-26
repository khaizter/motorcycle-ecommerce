import { Box, Stack, Typography } from '@mui/material';
import React from 'react';

const About = () => {
  return (
    <Box id='about' sx={{ background: '#FFFFFF', py: '6rem' }}>
      <Stack
        sx={{
          width: { xs: '95%', sm: '90%', md: '100%', lg: '100%', xl: '100%' },
          maxWidth: 'var(--horizontal-wrapper)',
          mx: 'auto'
        }}
        spacing={2}
      >
        <Typography variant='h2' component='h1' sx={{ textAlign: 'center' }}>
          About Us
        </Typography>
        <Typography>
          GNE Motorcycle Parts Shop was first established back in 2012 as a means of creating the best type of store for
          vehicle enthusiasts. Our goal has always been to inspire a sense of creativity and entrepreneurship. and be
          more than your average Motorcycle Parts Store.
        </Typography>
        <Typography>
          Each of our staff members is an automobile lover with years of experience. who is able to offer you the best
          advice regarding your repair or restoration. Stop by our store today and talk with our friendly employees to
          learn more about what we can offer you.
        </Typography>
        <Typography>Get in Touch</Typography>
      </Stack>
    </Box>
  );
};

export default About;
