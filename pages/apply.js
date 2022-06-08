import Head from "next/head";
import { Container, Row, Col, Button, Form, InputGroup, Breadcrumb } from "react-bootstrap";

export default function Apply() {
  return (
    <>
      <Head>
        <title>GAS Automobile Sales | Apply</title>
        <meta name="keywords" content="cars" />
      </Head>
      
      <div className="d-flex justify-content-between">
        <h1>Apply Online</h1>
        <Breadcrumb>
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
