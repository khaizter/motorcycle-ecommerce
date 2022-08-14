import React from 'react';

import { Card, Typography, Box } from '@mui/material';

import LoginForm from './login-form';

const Login = () => {
  return (
    <Box>
      <Card>
        <Typography variant='h3'>Login</Typography>
        <LoginForm />
      </Card>
    </Box>
  );
};

export default Login;
