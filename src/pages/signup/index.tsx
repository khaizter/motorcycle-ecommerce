import { Box, Card, Typography } from '@mui/material';
import React from 'react';

import SignUpForm from './signup-form';

const SignUp = () => {
  return (
    <Box>
      <Card>
        <Typography variant='h3'>Sign Up</Typography>
        <SignUpForm />
      </Card>
    </Box>
  );
};

export default SignUp;
