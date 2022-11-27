import { Box, Divider, IconButton, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from 'src/context/auth-context';

import AuthApi from 'src/common/api/auth';
import { Home } from '@mui/icons-material';
import PersonIcon from '@mui/icons-material/Person';
import KeyIcon from '@mui/icons-material/Key';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import EditIcon from '@mui/icons-material/Edit';

import { UserInfoType } from './model';

const Account = () => {
  const { currentToken } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState<UserInfoType>();

  console.log(userInfo);

  useEffect(() => {
    if (!currentToken) return;
    AuthApi.getUserInfo(currentToken)
      .then(response => {
        if (response?.data?.user) {
          setUserInfo(response.data.user);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <Box component='main' sx={{ maxWidth: 'var(--horizontal-wrapper)', mx: 'auto' }}>
      <Typography variant='h3' sx={{ textAlign: 'center' }}>
        Manage Account
      </Typography>
      <List sx={{ maxWidth: '400px', mx: 'auto' }}>
        <ListItem disablePadding>
          <ListItemIcon>
            <PersonIcon color='action' />
          </ListItemIcon>
          <ListItemText primary='Name' secondary={userInfo?.name} />
        </ListItem>
        <ListItem
          disablePadding
          secondaryAction={
            <IconButton edge='end' aria-label='edit'>
              <EditIcon />
            </IconButton>
          }
        >
          <ListItemIcon>
            <KeyIcon color='action' />
          </ListItemIcon>
          <ListItemText primary='Password' secondary={'********'} />
        </ListItem>

        <ListItem disablePadding>
          <ListItemIcon>
            <EmailIcon color='action' />
          </ListItemIcon>
          <ListItemText primary='Email' secondary={userInfo?.email} />
        </ListItem>

        <ListItem
          disablePadding
          secondaryAction={
            <IconButton edge='end' aria-label='edit'>
              <EditIcon />
            </IconButton>
          }
        >
          <ListItemIcon>
            <LocalPhoneIcon color='action' />
          </ListItemIcon>
          <ListItemText primary='Contact' secondary={userInfo?.contactNumber} />
        </ListItem>

        <ListItem
          disablePadding
          secondaryAction={
            <IconButton edge='end' aria-label='edit'>
              <EditIcon />
            </IconButton>
          }
        >
          <ListItemIcon>
            <Home color='action' />
          </ListItemIcon>
          <ListItemText primary='Home Address' secondary={userInfo?.homeAddress} />
        </ListItem>

        <ListItem
          disablePadding
          secondaryAction={
            <IconButton edge='end' aria-label='edit'>
              <EditIcon />
            </IconButton>
          }
        >
          <ListItemIcon>
            <LocationOnIcon color='action' />
          </ListItemIcon>
          <ListItemText primary='Delivery Address' secondary={userInfo?.deliveryAddress} />
        </ListItem>

        <ListItem disablePadding>
          <ListItemIcon>
            <AccessibilityIcon color='action' />
          </ListItemIcon>
          <ListItemText primary='Account Type' secondary={userInfo?.type} />
        </ListItem>
      </List>
    </Box>
  );
};

export default Account;
