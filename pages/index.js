import Head from "next/head";
import Layout from "../components/Layout"
import Link from "next/link";
import styles from "../styles/page_styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>GAS Automobile Sales | Home</title>
        <meta name="keywords" content="cars" />
      </Head>
      
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}
