import { Box, Card, Typography } from '@mui/material';
import React from 'react';
import ResetForm from './reset-form';

const ResetPassword = () => {
  return (
    <Box sx={{ maxWidth: '500px', marginInline: 'auto' }}>
      <Card sx={{ padding: '1rem', marginTop: '2rem' }}>
        <Typography variant='h3' sx={{ marginBottom: '2rem', textAlign: 'center' }}>
          Forgot Password
        </Typography>
        <ResetForm />
      </Card>
    </Box>
  );
};

export default ResetPassword;
