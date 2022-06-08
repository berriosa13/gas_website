import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { AiOutlineFrown } from "react-icons/ai";
import styles from "../styles/page_styles/404.module.css";

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
        <title>GAS Automobile Sales | Page Not Found</title>
        <meta name="keywords" content="cars" />
      </Head>
      <div className={styles.not_found}>
        <h1>404</h1>
        <h2>
          We could not find the page you are looking for. <AiOutlineFrown />
        </h2>
        <p>We will redirect you back to the hompage shortly.</p>
      </div>
    </>
  );
};

export default NotFound;
