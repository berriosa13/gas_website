import Head from "next/head";
import Layout from '../components/Layout'
import { Container, Row, Col, Button, Form, InputGroup, Breadcrumb } from "react-bootstrap";

export default function Apply() {
  return (
    <>
      <Head>
        <title>GAS Automobile Sales | Apply</title>
        <meta name="keywords" content="cars" />
      </Head>
      
      <div className="d-flex justify-content-between my-5">
        <h1>Apply Online</h1>
        <Breadcrumb className="fst-italic">
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/contact">Apply</Breadcrumb.Item>
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

Apply.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}
