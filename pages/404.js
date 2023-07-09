import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/page_styles/404.module.css";
import { BsExclamationCircle } from "react-icons/bs";
import config from "../config"

/*  User is prompted with 404 page and 
redirected back to the homepage using { useRouter }
*/
const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 5000);
  });

  return (
    <>
      <Head>
        <title>{config.dealership.name} | Page Not Found</title>
        <meta name="keywords" content="cars" />
      </Head>
      <div className={styles.center}>
        <div className={styles.not_found}>
          <Image
            src="/imgs/GAS-Logo.png"
            alt="full logo"
            width={842}
            height={186}
          />
          <h1>404</h1>
          <h2>
            <BsExclamationCircle className="mx-2"/>
            We could not find the page you are looking for 
            <BsExclamationCircle className="mx-2"/>
          </h2>
          <p>You will now be redirected back to the home page.</p>
        </div>
      </div>
    </>
  );
};

export default NotFound;
