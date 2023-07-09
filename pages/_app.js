import { AuthProvider } from "../contexts/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FormspreeProvider } from "@formspree/react";
import PrivateRoute from "../components/PrivateRoute";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css"; 

const noAuthRequired = [
  "/",
  "/login",
  "/cars",
  "/contact",
  "/about",
  "/carDetails",
  "/apply",
  "/404",
  "/services",
];

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  const router = useRouter();

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  return (
    <AuthProvider>
      {noAuthRequired.includes(router.pathname) ? (
        getLayout(
          <FormspreeProvider project={process.env.NEXT_PUBLIC_FORMSPREE_PROJECT_ID}>
            <Component {...pageProps} />
          </FormspreeProvider>
        )
      ) : (
        <PrivateRoute>
          <Component {...pageProps} />
        </PrivateRoute>
      )}
    </AuthProvider>
  );
}

export default MyApp;
