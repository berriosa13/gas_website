
import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Layout from "../components/Layout"
import { Row, Col, Button, Breadcrumb } from "react-bootstrap";
import styles from "../styles/page_styles/Cars.module.css";
import GradBar from "../components/GradBar";
import { GoDashboard } from "react-icons/go";
import { GiCog } from "react-icons/gI";
import { TbSteeringWheel } from "react-icons/tb";
import CarDataService from "../services/cars.services"

export async function getStaticProps(context) {
  
  const cars = await CarDataService.getAllListings();
  
  return {
    props: {
      cars 
    },
  }
}

export default function Cars({ cars }) {
  const initialNumberOfCars = 6; 
  const [carIndex, setCarIndex] = useState(initialNumberOfCars);
  const carsToRender = cars.slice(0, carIndex);


  async function loadMoreCars() {
    if(carsToRender.length === cars.length) {
      // all cars have been rendered out, hide load button
      const loadBtn = document.getElementById('loadBtn');
      loadBtn.style.display = 'none';
      return;
    }
    setCarIndex(carIndex + 3);
  }

  return (
    <>
      <Head>
        <title>GAS Automobile Sales | Cars Inventory</title>
        <meta name="keywords" content="cars" />
      </Head>

      <div className="d-flex justify-content-between my-5">
        <h1>
        Inventory
          <GradBar/>
        </h1>
        
        <Breadcrumb className="fst-italic">
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/cars">Inventory</Breadcrumb.Item>
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
      <div>
        <h1 className="text-center my-5"></h1>
      </div>
      
      {/* <section className={styles.featured_places}>
        <Container fluid className="mt-5">
          <Form>
            <Row className="mb-3">
             <Col lg={3} md={4} sm={4} xs={12}>
              <Form.Group className="mb-3">
                <Form.Label>Year:</Form.Label>
                <Form.Select>
                  <option value="">All</option>
                  <option value="new">New vehicle</option>
                  <option value="used">Used vehicle</option>
                </Form.Select>
              </Form.Group>
              </Col>
              <Col lg={3} md={4} sm={4} xs={12}>
              <Form.Group className="mb-3">
                <Form.Label>Make/Model:</Form.Label>
                <Form.Select>
                  <option value="">All</option>
                  <option value="new">New vehicle</option>
                  <option value="used">Used vehicle</option>
                </Form.Select>
              </Form.Group>
              </Col>
              <Col lg={3} md={4} sm={4} xs={12}>
              <Form.Group className="mb-3">
                <Form.Label>Drivetrain</Form.Label>
                <Form.Select>
                  <option value="">All</option>
                  <option value="new">New vehicle</option>
                  <option value="used">Used vehicle</option>
                </Form.Select>
              </Form.Group>
              </Col>
              <Col lg={3} md={4} sm={4} xs={12}>
              <Form.Group className="mb-3">
                <Form.Label>Transmission</Form.Label>
                <Form.Select>
                  <option value="">All</option>
                  <option value="new">New vehicle</option>
                  <option value="used">Used vehicle</option>
                </Form.Select>
              </Form.Group>
              </Col>
            </Row>
            
            <Row className="mb-3">  
            <Col lg={3} md={4} sm={4} xs={12}>
              <Form.Group className="mb-3">
                <Form.Label>Mileage</Form.Label>
                <Form.Select>
                  <option value="">All</option>
                  <option value="new">New vehicle</option>
                  <option value="used">Used vehicle</option>
                </Form.Select>
              </Form.Group>
              </Col>
              <Col lg={3} md={4} sm={4} xs={12}>
              <Form.Group className="mb-3">
                <Form.Label>Body Type:</Form.Label>
                <Form.Select>
                  <option value="">All</option>
                  <option value="new">New vehicle</option>
                  <option value="used">Used vehicle</option>
                </Form.Select>
              </Form.Group>
              </Col>
              <Col lg={3} md={4} sm={4} xs={12}>
              <Form.Group className="mb-3">
                <Form.Label>Price:</Form.Label>
                <Form.Select>
                  <option value="">All</option>
                  <option value="new">New vehicle</option>
                  <option value="used">Used vehicle</option>
                </Form.Select>
              </Form.Group>
              </Col>
            </Row>

            <Button variant="outline-primary"className="mb-5" size="lg"> 
              Search
            </Button>
          </Form>
        </Container>
      </section> */}

      <section className={styles.featured_places}>
        <Row>
          {carsToRender.map((car) => {
            return (
              <Col className="mb-3" key={car.id} md={4} sm={6} xs={12}>
                <div className={styles.featured_item}>
                  <div className={styles.thumb}>
                    <div className={styles.thumb_img}>
                      {car.thumbnailImage != null ? (
                        <Image
                          priority="true"
                          src={car.thumbnailImage}
                          layout="responsive"
                          alt="thumbnail image"
                          width={450}
                          height={300}
                      />
                      ) : (
                        <h2>Image Coming Soon...</h2>
                      )}
                    </div>
                    <div className={styles.overlay_content}>
                      <strong>
                        <GoDashboard />{" "}
                        {car.mileage
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </strong>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <strong>
                        <TbSteeringWheel/> {car.drivetrain}
                      </strong>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <strong>
                        <GiCog /> {car.transmission}
                      </strong>
                    </div>
                  </div>
                  <div className={styles.down_content}>
                    <h4>
                      Used {car.year} {car.make} {car.model}
                    </h4>

                    <br />

                    <p>
                      <span>
                        <strong>
                          <sup>$</sup>
                          {car.price
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </strong>
                      </span>
                    </p>

                    <div className={styles.text_button}>
                      <Link href= {{
                        pathname: "/carDetails",
                        query: car,
                      }}>
                        <a>View More</a>
                      </Link>
                    </div>
                  </div>
                </div>
              </Col>
            );
          })}
          <style jsx>{`
            strong sup {
              color: var(--main-color);
            }
            span strong {
              color: var(--main-color);
            }
           
      `   }</style>
        </Row>
        <Button
          id="loadBtn"
          size="lg"
          variant="primary"
          className={styles.load_more_btn}
          onClick={loadMoreCars}
        >
          Load More
        </Button>
      </section>
    </>
  );
}

Cars.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}
