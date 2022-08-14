import { Card } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';

import SignUpForm from './signup-form';

const SignUp = () => {
  return (
    <div>
      <Card>
        <h1>Sign Up</h1>
        <SignUpForm />
      </Card>
    </div>
  );
};

export default SignUp;
