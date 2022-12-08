import React from 'react';

import { Card, Typography, Box, Button } from '@mui/material';

import LoginForm from './login-form';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ maxWidth: '500px', marginInline: 'auto' }}>
      <Card sx={{ padding: '1rem', marginTop: '2rem' }}>
        <Typography variant='h3' sx={{ marginBottom: '2rem', textAlign: 'center' }}>
          Login
        </Typography>
        <LoginForm />
        <Button sx={{ marginTop: '1rem' }} color='secondary' onClick={() => navigate('/reset-password')}>
          Forgot password?
        </Button>
        <Box sx={{ textAlign: 'center' }}>
          <Typography sx={{ marginTop: '1rem', display: 'inline' }} variant='body1'>
            Not a member?
          </Typography>
          <Button onClick={() => navigate('/signup')}>Signup now</Button>
        </Box>
      </Card>
    </Box>
  );
};

export default Login;
