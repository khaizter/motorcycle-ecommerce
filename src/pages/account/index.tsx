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
import useModal from 'src/hooks/useModal';
import PasswordForm from 'src/pages/account/password-form';
import ContactForm from 'src/pages/account/contact-form';
import HomeAddressForm from 'src/pages/account/home-address-form';
import DeliveryAddressForm from 'src/pages/account/delivery-address-form';

import { useSnackbar } from 'notistack';

const Account = () => {
  const { currentToken, currentUserType } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState<UserInfoType>();
  const [openPasswordModal, handleOpenPasswordModal, handleClosePasswordModal] = useModal();
  const [openContactModal, handleOpenContactModal, handleCloseContactModal] = useModal();
  const [openHomeAddressModal, handleOpenHomeAddressModal, handleCloseHomeAddressModal] = useModal();
  const [openDeliveryAddressModal, handleOpenDeliveryAddressModal, handleCloseDeliveryAddressModal] = useModal();

  const { enqueueSnackbar } = useSnackbar();

  const getUserInfo = () => {
    if (!currentToken) return;
    AuthApi.getUserInfo(currentToken)
      .then(response => {
        if (response?.data?.user) {
          setUserInfo(response.data.user);
        }
      })
      .catch(err => {
        enqueueSnackbar(err?.response?.data?.message || err.message, { variant: 'error' });
      });
  };

  useEffect(() => {
    getUserInfo();
  }, [currentToken]);

  return (
    <Box component='main' sx={{ maxWidth: 'var(--horizontal-wrapper)', mx: 'auto', py: '2rem' }}>
      <Typography variant='h3' sx={{ textAlign: 'center' }}>
        Manage Account
      </Typography>
      <List sx={{ maxWidth: '400px', mx: 'auto', mt: '1rem' }}>
        <ListItem disablePadding>
          <ListItemIcon>
            <PersonIcon color='action' />
          </ListItemIcon>
          <ListItemText primary='Name' secondary={userInfo?.name} />
        </ListItem>
        <ListItem
          disablePadding
          secondaryAction={
            <IconButton edge='end' aria-label='edit' onClick={handleOpenPasswordModal}>
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
            <IconButton edge='end' aria-label='edit' onClick={handleOpenContactModal}>
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
            <IconButton edge='end' aria-label='edit' onClick={handleOpenHomeAddressModal}>
              <EditIcon />
            </IconButton>
          }
        >
          <ListItemIcon>
            <Home color='action' />
          </ListItemIcon>
          <ListItemText primary='Home Address' secondary={userInfo?.homeAddress} />
        </ListItem>

        {currentUserType !== 'admin' && (
          <ListItem
            disablePadding
            secondaryAction={
              <IconButton edge='end' aria-label='edit' onClick={handleOpenDeliveryAddressModal}>
                <EditIcon />
              </IconButton>
            }
          >
            <ListItemIcon>
              <LocationOnIcon color='action' />
            </ListItemIcon>
            <ListItemText primary='Delivery Address' secondary={userInfo?.deliveryAddress} />
          </ListItem>
        )}

        <ListItem disablePadding>
          <ListItemIcon>
            <AccessibilityIcon color='action' />
          </ListItemIcon>
          <ListItemText primary='Account Type' secondary={userInfo?.type} />
        </ListItem>
      </List>
      <PasswordForm open={openPasswordModal} handleClose={handleClosePasswordModal} refreshInfo={getUserInfo} />
      <ContactForm open={openContactModal} handleClose={handleCloseContactModal} refreshInfo={getUserInfo} />
      <HomeAddressForm
        open={openHomeAddressModal}
        handleClose={handleCloseHomeAddressModal}
        refreshInfo={getUserInfo}
      />
      <DeliveryAddressForm
        open={openDeliveryAddressModal}
        handleClose={handleCloseDeliveryAddressModal}
        refreshInfo={getUserInfo}
      />
    </Box>
  );
};

export default Account;
