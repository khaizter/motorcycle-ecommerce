import React from 'react';

import { OutlinedInput, FormControl, InputLabel, FormHelperText, Card, Button } from '@mui/material';

import LoginForm from './login-form';

const Login = () => {
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <div>
      <Card>
        <h1>Login</h1>
        <LoginForm />
      </Card>
    </div>
  );
};

export default Login;
