import Head from "next/head";
import Layout from "../components/Layout"
import { Breadcrumb, Row, Button } from "react-bootstrap";
import GradBar from "../components/GradBar";

export default function About() {

  return (
    <>
      <Head>
        <title>GAS Automobile Sales | About</title>
        <meta name="keywords" content="cars" />
      </Head>
      <div className="d-flex justify-content-between my-5">
        <h1>
          About Us
          <GradBar/>
        </h1>
        <Breadcrumb className="fst-italic">
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/contact">About</Breadcrumb.Item>
          <style jsx global>{`
            a {
              color: var(--main-color) !important;
            } 
            a:hover {
              color: var(--secondary-color) !important;
            }
          `}</style>
        </Breadcrumb>
      </div> 
    </>
  );
}

About.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}
