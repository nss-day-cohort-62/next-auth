/* eslint-disable react/prop-types */
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import '../styles/globals.css';
import { AuthProvider } from '../utils/context/authContext';
import NavBar from '../components/NavBar';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap');
  }, []);

  return (
    <AuthProvider>
      <NavBar />
      <div className="container">
        <Component {...pageProps} />
      </div>
    </AuthProvider>
  );
}

export default MyApp;
