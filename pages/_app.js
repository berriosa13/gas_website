import { AuthProvider } from "../contexts/AuthContext";
import { useRouter } from 'next/router';
import { useEffect } from 'react'
import PrivateRoute from '../components/PrivateRoute';
import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.css';

const noAuthRequired = ['/', '/login', '/cars', '/contact', '/about', '/carDetails', '/apply', '/404'];

function MyApp({ Component, pageProps }) {
   // Use the layout defined at the page level, if available
   const getLayout = Component.getLayout || ((page) => page)
   
  const router = useRouter();

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  return (
    <AuthProvider>
      {noAuthRequired.includes(router.pathname) ? ( 
          getLayout(<Component {...pageProps} />)
      ) : (
        <PrivateRoute>
          <Component {...pageProps} />
        </PrivateRoute>
      )}
    </AuthProvider>
  );
}

export default MyApp
