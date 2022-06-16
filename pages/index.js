import Head from "next/head";
import Image from "next/image";
import Layout from "../components/Layout"
import Link from "next/link";
import styles from "../styles/page_styles/Home.module.css";
import { Row, Col, Button } from "react-bootstrap";
import GradBar from "../components/GradBar"

export default function Home() {
  return (
    <>
      <Head>
        <title>GAS Automobile Sales | Home</title>
        <meta name="keywords" content="cars" />
      </Head>

      <section className="mb-3">
        <Row>
          <Col md={6}>
            <div className="text-center homeWelcome">
              <h2 className="text-left mt-5 mb-3 fw-bold ">Find your next used car with</h2>
              <Image src="/imgs/GAS-Text-Only-2-Color.png" alt="" width="420" height="96"/>
              <h3 className="text-left mt-3">
                "The <strong>#1 place</strong> for used cars in NEPA".</h3>
                  <Button className="mt-3" href="/cars" variant="primary" >
                    View Inventory
                  </Button>
            </div>
          </Col>
          <Col md={6}>
            <div> 
              <Image className={styles.animated} src="/imgs/car_showroom-PhotoRoom.png" alt="car-show-room" width="1100" height="800"  />
            </div>
          </Col>
          <style jsx>{`
            .homeWelcome {
              margin-top: 8rem;
            }
           
      `   }</style>
        </Row>
      </section>


      <section className={styles.clients}>
        <h2>Some of the brands we sell ...</h2>
        <div className="row">
          <div className="col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center">
            <img src="/imgs/carLogos/ford_logo.png" className="img-fluid" alt=""/>
          </div>

          <div className="col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center">
            <img src="/imgs/carLogos/gmc_logo.png" className="img-fluid" alt=""/>
          </div>

          <div className="col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center">
            <img src="/imgs/carLogos/honda_logo.png" className="img-fluid" alt=""/>
          </div>

          <div className="col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center">
            <img src="/imgs/carLogos/hyundai_logo.png" className="img-fluid" alt=""/>
          </div>

          <div className="col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center">
            <img src="/imgs/carLogos/jeep_logo.png" className="img-fluid" alt=""/>
          </div>

          <div className="col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center">
            <img src="/imgs/carLogos/lexus_logo.png" className="img-fluid" alt=""/>
          </div>
        </div>
        <div className="row">
        <div className="col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center">
            <img src="/imgs/carLogos/cadillac_logo.png" className="img-fluid" alt=""/>
          </div>

          <div className="col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center">
            <img src="/imgs/carLogos/toyota_logo.png" className="img-fluid" alt=""/>
          </div>

          <div className="col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center">
            <img src="/imgs/carLogos/subaru_logo.png" className="img-fluid" alt=""/>
          </div>

          <div className="col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center">
            <img src="/imgs/carLogos/bmw_logo.png" className="img-fluid" alt=""/>
          </div>

          <div className="col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center">
            <img src="/imgs/carLogos/mazda_logo.png" className="img-fluid" alt=""/>
          </div>

          <div className="col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center">
            <img src="/imgs/carLogos/audi_logo.png" className="img-fluid" alt=""/>
          </div>
        </div>
        <style jsx>{`
            h2 {
              color: var(--main-color);
              font-weight: 600;
            }
           
      `   }</style>
    </section>

      
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
