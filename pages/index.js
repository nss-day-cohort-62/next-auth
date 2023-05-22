import { useEffect } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getItems } from '../utils/data/example';

function Home() {
  const { user, signOut } = useAuth();

  useEffect(() => {
    // Example of how to use the token to fetch all items from the API
    getItems(user.token).then((res) => {
      console.log(res);
    });
  }, [user.token]);

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <h1>Hello! </h1>
      <p>Click the button below to logout!</p>
      <button className="btn btn-danger btn-lg copy-btn" type="button" onClick={signOut}>
        Sign Out
      </button>
    </div>
  );
}

export default Home;
