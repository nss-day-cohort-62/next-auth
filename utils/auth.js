import axios from 'axios';

const login = (user) => (
  axios.post('http://localhost:8000/login', user, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
);

const register = (user) => (
  axios.post('http://localhost:8000/register', user, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
);

export { login, register };
