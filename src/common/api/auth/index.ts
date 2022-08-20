import axios from 'axios';

const login = async (email: string, password: string) => {
  const endpoint = '/auth/login';
  const response = await axios.post(process.env.REACT_APP_BACKEND_URI + endpoint, {
    email,
    password
  });

  return response;
};

const signup = async (email: string, password: string, name: string) => {
  const endpoint = '/auth/signup';
  const response = await axios.post(process.env.REACT_APP_BACKEND_URI + endpoint, {
    email,
    password,
    name
  });

  return response;
};

const module = { login, signup };

export default module;
