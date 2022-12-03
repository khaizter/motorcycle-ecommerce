import React from 'react';

import { Card, Typography, Box } from '@mui/material';

import LoginForm from './login-form';

const Login = () => {
  return (
    <Box sx={{ maxWidth: '500px', marginInline: 'auto' }}>
      <Card sx={{ padding: '1rem', marginTop: '2rem' }}>
        <Typography variant='h3' sx={{ marginBottom: '2rem', textAlign: 'center' }}>
          Login
        </Typography>
        <LoginForm />
      </Card>
    </Box>
  );
};

export default Login;
