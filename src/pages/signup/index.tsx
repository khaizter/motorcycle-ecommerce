import { Box, Card, Typography } from '@mui/material';
import React from 'react';

import SignUpForm from './signup-form';

const SignUp = () => {
  return (
    <Box sx={{ maxWidth: '500px', marginInline: 'auto' }}>
      <Card sx={{ padding: '1rem', marginTop: '2rem' }}>
        <Typography variant='h3' sx={{ marginBottom: '2rem' }}>
          Sign Up
        </Typography>
        <SignUpForm />
      </Card>
    </Box>
  );
};

export default SignUp;
