import Head from "next/head";
import Image from "next/image";
import Layout from "../components/Layout"
import { Breadcrumb, Row, Col, Button } from "react-bootstrap";
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
         
        </Breadcrumb>
      </div> 

      <Row> 
          <Col md={6}>
            <Image
              priority="true"
              src="/imgs/gas_building.jpeg"
              alt="aboutImage"
              width="800"
              height="600"
            />
          </Col>
          <Col md={6}>
            <p>Shopping for your next vehicle shouldn't be a hassle.
                You don't need to drive for hours or make deals over the phone to get a good deal on a great used vehicle. Located right here in Dunmore PA, Guardian Automobile Sales is dedicated to bringing a great selection of high-quality, well-maintained, like-new vehicles into our local area. We invite you to stop by and look over our inventory of vehicles</p>
          </Col>   
          <style jsx>{`
            img {
            
              -webkit-box-shadow: 5px 5px 15px 5px #333 !important; 
              box-shadow: 5px 5px 15px 5px #333 !important; 
            }
           
      `   }</style>
      </Row>

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
