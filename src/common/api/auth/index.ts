import axios from 'axios';

const login = async (email: string, password: string) => {
  const endpoint = '/auth/login';
  const response = await axios.post(process.env.REACT_APP_BACKEND_URI + endpoint, {
    email,
    password
  });

  return response;
};

const signup = async (
  email: string,
  password: string,
  name: string,
  homeAddress: string,
  contactNumber: string,
  recoveryQuestion: string,
  recoveryAnswer: string
) => {
  const endpoint = '/auth/signup';
  const response = await axios.post(process.env.REACT_APP_BACKEND_URI + endpoint, {
    email,
    password,
    name,
    homeAddress,
    contactNumber,
    recoveryQuestion,
    recoveryAnswer
  });

  return response;
};

const checkToken = async (token: string) => {
  const endpoint = '/auth/check-token';
  const response = await axios.get(process.env.REACT_APP_BACKEND_URI + endpoint, {
    headers: {
      Authorization: `token ${token}`
    }
  });
  return response;
};

const getUserInfo = async (token: string) => {
  const endpoint = '/auth/user';
  const response = await axios.get(process.env.REACT_APP_BACKEND_URI + endpoint, {
    headers: {
      Authorization: `token ${token}`
    }
  });
  return response;
};

const updatePassword = async (token: string, oldPassword: string, newPassword: string) => {
  const endpoint = '/auth/user/password';
  const response = await axios.put(
    process.env.REACT_APP_BACKEND_URI + endpoint,
    {
      oldPassword,
      newPassword
    },
    {
      headers: {
        Authorization: `token ${token}`
      }
    }
  );
  return response;
};

const updateContactNumber = async (token: string, newContactNumber: string) => {
  const endpoint = '/auth/user/contact-number';
  const response = await axios.put(
    process.env.REACT_APP_BACKEND_URI + endpoint,
    {
      newContactNumber
    },
    {
      headers: {
        Authorization: `token ${token}`
      }
    }
  );
  return response;
};

const updateHomeAddress = async (token: string, newHomeAddress: string) => {
  const endpoint = '/auth/user/home-address';
  const response = await axios.put(
    process.env.REACT_APP_BACKEND_URI + endpoint,
    {
      newHomeAddress
    },
    {
      headers: {
        Authorization: `token ${token}`
      }
    }
  );
  return response;
};

const updateDeliveryAddress = async (token: string, newDeliveryAddress: string) => {
  const endpoint = '/auth/user/delivery-address';
  const response = await axios.put(
    process.env.REACT_APP_BACKEND_URI + endpoint,
    {
      newDeliveryAddress
    },
    {
      headers: {
        Authorization: `token ${token}`
      }
    }
  );
  return response;
};

const checkEmail = async (email: string) => {
  const endpoint = '/auth/user/email';
  const response = await axios.post(process.env.REACT_APP_BACKEND_URI + endpoint, {
    email
  });
  return response;
};

const checkRecovery = async (userId: string, recoveryQuestion: string, recoveryAnswer: string) => {
  const endpoint = '/auth/user/recovery';
  const response = await axios.post(process.env.REACT_APP_BACKEND_URI + endpoint, {
    userId,
    recoveryQuestion,
    recoveryAnswer
  });
  return response;
};

const resetPassword = async (token: string, newPassword: string) => {
  const endpoint = '/auth/user/reset-password';
  const response = await axios.put(process.env.REACT_APP_BACKEND_URI + endpoint, {
    token,
    newPassword
  });
  return response;
};

const module = {
  login,
  signup,
  checkToken,
  getUserInfo,
  updatePassword,
  updateContactNumber,
  updateHomeAddress,
  updateDeliveryAddress,
  checkEmail,
  checkRecovery,
  resetPassword
};

export default module;
