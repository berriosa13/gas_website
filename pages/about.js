import Head from "next/head";
import Image from "next/image";
import Layout from "../components/Layout";
import { Breadcrumb, Row, Col, Button, Figure } from "react-bootstrap";
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
          <GradBar />
        </h1>
        <Breadcrumb className="fst-italic">
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/about">About</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <Row>
        <Col md={6}>
        <Figure>
          <Figure.Image
            width={800}
            height={60}
            alt="GAS Building Image"
            src="/imgs/gas_building.jpeg"
          />
          <Figure.Caption>
            Guardian Automobile Sales Dealership
          </Figure.Caption>
        </Figure>
        </Col>
        <Col md={6}>
          <p>
            "Shopping for your next vehicle should not be a hassle. You do not
            need to drive for hours or make deals over the phone to get a good
            deal on a great used vehicle. Located right here in Dunmore PA,
            Guardian Automobile Sales is dedicated to bringing a great selection
            of high-quality, well-maintained, like-new vehicles into our local
            area. We invite you to stop by and look over our inventory of
            vehicles."
          </p>
          <p className="fst-italic"> - Guardian Automobile Sales</p>
        </Col>
        <style jsx global>{`
          .figure-img {
            box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.75);
            -webkit-box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.75);
            -moz-box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.75);
          }
        `}</style>
      </Row>
    </>
  );
}

About.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
