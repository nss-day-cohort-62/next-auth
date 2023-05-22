import axios from 'axios'

const getItems = (token) => (
  axios.get('http://localhost:8000/items', {
    headers: {
      Authorization: `Token ${token}`,
    },
  })
);

export { getItems };
