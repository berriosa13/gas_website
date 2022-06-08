import Layout from '../components/Layout';
import { useEffect } from 'react'
import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.css';

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
    require("jquery");
  }, []);

  return(
    <Layout>
      <Component {...pageProps} />
    </Layout>

  )
}

export default MyApp
