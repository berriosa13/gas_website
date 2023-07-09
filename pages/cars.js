import { useState } from "react";
import { NextSeo } from "next-seo";
import Link from "next/link";
import Image from "next/image";
import Layout from "../components/Layout";
import { Row, Col, Button } from "react-bootstrap";
import styles from "../styles/page_styles/Cars.module.css";
import GradBar from "../components/GradBar";
import { GoDashboard } from "react-icons/go";
import { GiCog } from "react-icons/gi";
import { TbSteeringWheel } from "react-icons/tb";
import useActiveListings from "../hooks/useActiveListings";

export default function Cars() {
  const cars = useActiveListings();
  const NUMBER_OF_CARS_ON_PAGE_LOAD = 6;
  const NUMBER_OF_CARS_PER_CLICK = 3;
  const [carIndex, setCarIndex] = useState(NUMBER_OF_CARS_ON_PAGE_LOAD);
  let carsToRender = 0;

  if (cars != undefined && cars.length > 0) {
    carsToRender = cars.slice(0, carIndex);
  }

  async function loadMoreCars() {
    // Hide button if all cars have already been displayed
    if (carsToRender.length === cars.length) {
      const loadBtn = document.getElementById("loadBtn");
      loadBtn.style.display = "none";
      return;
    }
    // Load more cars onto the page
    setCarIndex(carIndex + NUMBER_OF_CARS_PER_CLICK);
  }

  return (
    <>
      <NextSeo
        title="Guardian Automobile Sales | Inventory"
        description="View our vast selection of pre-owned vehicles at affordable prices"
        canonical="https://www.gasautomobilesales.com/"
        openGraph={{
          url: "https://www.gasautomobilesales.com/",
          title: "Guardian Automobile Sales | Inventory",
          description:
            "View our vast selection of pre-owned vehicles at affordable prices",
          images: [
            {
              url: "/imgs/GAS-Logo-text.png",
              width: 800,
              height: 600,
              alt: "Og GAS Text Logo",
              type: "image/png",
            },
          ],
          site_name: "gasautomobilesales",
        }}
      />

      <div className="d-flex justify-content-between my-5">
        <h1>
          Inventory
          <GradBar />
        </h1>
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
          {cars.length != 0 ? (
            carsToRender.map((car) => {
              return (
                <Col className="mb-3" key={car.id} md={4} sm={6} xs={12}>
                  <div className={styles.featured_item}>
                    <div className={styles.thumb}>
                      <div className={styles.thumb_img}>
                        {car.thumbnailImage != null ? (
                          <>
                            <Image
                              priority="true"
                              src={car.thumbnailImage}
                              layout="responsive"
                              alt="thumbnail image"
                              width={450}
                              height={300}
                            />

                            <div className={styles.overlay_content}>
                              <strong>
                                <GoDashboard /> {car.mileage}
                              </strong>
                              &nbsp;&nbsp;&nbsp;&nbsp;
                              <strong>
                                <TbSteeringWheel /> {car.drivetrain}
                              </strong>
                              &nbsp;&nbsp;&nbsp;&nbsp;
                              <strong>
                                <GiCog /> {car.transmission}
                              </strong>
                            </div>
                          </>
                        ) : (
                          <Image
                            priority="true"
                            src="https://via.placeholder.com/450x300.png?text=Image+Coming+Soon..."
                            layout="responsive"
                            alt="thumbnail image"
                            width={450}
                            height={300}
                          />
                        )}
                      </div>
                    </div>
                    <div className={styles.down_content}>
                      <h4>
                        {car.year} {car.make} {car.model} {car.trim}
                      </h4>

                      <br />

                      <p>
                        <span>
                          <strong>{car.price}</strong>
                        </span>
                      </p>

                      <div className={styles.text_button}>
                        <Link
                          href={{
                            pathname: "/carDetails",
                            query: car,
                          }}
                        >
                          <a>View More</a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Col>
              );
            })
          ) : (
            <strong className="text-center">
              <h4>Listings Coming Soon!</h4>
            </strong>
          )}
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
      <style jsx>{`
        strong sup {
          color: var(--main-color);
        }
        span strong {
          color: var(--main-color);
        }
      `}</style>
    </>
  );
}

Cars.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
