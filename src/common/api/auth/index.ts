import axios from 'axios';

const login = async (email: string, password: string) => {
  const endpoint = '/auth/login';
  const response = await axios.post(process.env.REACT_APP_BACKEND_URI + endpoint, {
    email,
    password
  });

  return response;
};

const signup = async (email: string, password: string, name: string, homeAddress: string, contactNumber: string) => {
  const endpoint = '/auth/signup';
  const response = await axios.post(process.env.REACT_APP_BACKEND_URI + endpoint, {
    email,
    password,
    name,
    homeAddress,
    contactNumber
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

const module = { login, signup, checkToken, getUserInfo };

export default module;
