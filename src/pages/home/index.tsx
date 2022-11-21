import React from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// Routing
import { Link as RouterLink } from 'react-router-dom';
import Hero from './hero';
import About from './about';
import Services from './services';
import Faq from 'src/pages/home/faq';

const Home: React.FC = () => {
  return (
    <Box component='main'>
      <Hero />
      <About />
      <Services />
      <Faq />
    </Box>
  );
};

export default Home;
