import Head from "next/head";
import Layout from '../components/Layout'
import Link from 'next/link';
import { Container, Row, Col, Button, Form, InputGroup, Breadcrumb } from "react-bootstrap";
import CreditApplicationForm from '../components/forms/CreditApplicationForm';
import GradBar from '../components/GradBar'

export default function Apply() {
  return (
    <>
      <Head>
        <title>GAS Automobile Sales | Apply</title>
        <meta name="keywords" content="cars" />
      </Head>
      
      <div className="d-flex justify-content-between my-5">
        <div>
          <h1>
            Apply Online
            <GradBar/>
          </h1>
        </div>
        <Breadcrumb className="fst-italic">
          <Link href="/" passhref>
            <Breadcrumb.Item as="a" href="/">Home</Breadcrumb.Item>
          </Link>
          <Link href="/apply" passhref>
            <Breadcrumb.Item as="a" href="/apply">Apply Online</Breadcrumb.Item>
          </Link>

          {/* <style jsx global>{`
            a {
              color: var(--main-color) !important;
            } 
            a:hover {
              color: var(--secondary-color) !important;
            }
          `}</style> */}
        </Breadcrumb>
      </div>
      <CreditApplicationForm/>
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
