import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Layout from "../components/Layout";
import styles from "../styles/page_styles/Home.module.css";
import carStyles from "../styles/page_styles/Cars.module.css";
import GradBar from "../components/GradBar";
import { GoDashboard } from "react-icons/go";
import { GiCog } from "react-icons/gi";
import { TbSteeringWheel } from "react-icons/tb";
import { Row, Col, Button } from "react-bootstrap";
import CarDataService from "../services/cars.services";
import { AiOutlineFrown } from "react-icons/ai";
import React from "react";

export async function getStaticProps(context) {
  const featuredListings = await CarDataService.getAllFeaturedListings();
  return {
    props: {
      featuredListings,
    },
  };
}

export default function Home({ featuredListings }) {
  // console.log(featuredListings);
  return (
    <>
      <Head>
        <title>GAS Automobile Sales | Home</title>
        <meta name="keywords" content="cars" />
      </Head>

      <section>
        <Row className="mx-3">
          <Col md={6}>
            <div className="text-center homeWelcome">
              <h2 className="text-left mt-5 mb-3 fw-bold ">
                Find your next used car with
              </h2>
              <Image
                src="/imgs/GAS-Text-Only-2-Color.png"
                alt=""
                width="420"
                height="96"
              />
              <h3 className="text-left mt-3">
                The <strong>#1 place</strong> for used cars in NEPA.
              </h3>
              <Button className="mt-3" href="/cars" variant="primary">
                Find your next vehicle
              </Button>
            </div>
          </Col>
          <Col md={6}>
            <div>
              <Image
                className={styles.animated}
                src="/imgs/car_showroom-PhotoRoom.png"
                alt="car-show-room"
                width="1100"
                height="800"
              />
            </div>
          </Col>
          <style jsx>{`
            .homeWelcome {
              margin-top: 8rem;
            }
          `}</style>
        </Row>
      </section>

      <div className="my-5 pt-5">
        <section className={styles.clients}>
          <h2>Some of the brands we sell ...</h2>
          <div className="row">
            <div className="col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center">
              {/* <Image layout='fixed' className="img-fluid" src="/imgs/carLogos/ford_logo.png" alt="carBrandLogo" width="120" height="60"  /> */}
              <img
                src="/imgs/carLogos/ford_logo.png"
                className="img-fluid"
                alt=""
              />
            </div>

            <div className="col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center">
              <img
                src="/imgs/carLogos/gmc_logo.png"
                className="img-fluid"
                alt=""
              />
            </div>

            <div className="col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center">
              <img
                src="/imgs/carLogos/honda_logo.png"
                className="img-fluid"
                alt=""
              />
            </div>

            <div className="col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center">
              <img
                src="/imgs/carLogos/hyundai_logo.png"
                className="img-fluid"
                alt=""
              />
            </div>

            <div className="col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center">
              <img
                src="/imgs/carLogos/jeep_logo.png"
                className="img-fluid"
                alt=""
              />
            </div>

            <div className="col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center">
              <img
                src="/imgs/carLogos/lexus_logo.png"
                className="img-fluid"
                alt=""
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center">
              <img
                src="/imgs/carLogos/cadillac_logo.png"
                className="img-fluid"
                alt=""
              />
            </div>

            <div className="col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center">
              <img
                src="/imgs/carLogos/toyota_logo.png"
                className="img-fluid"
                alt=""
              />
            </div>

            <div className="col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center">
              <img
                src="/imgs/carLogos/subaru_logo.png"
                className="img-fluid"
                alt=""
              />
            </div>

            <div className="col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center">
              <img
                src="/imgs/carLogos/bmw_logo.png"
                className="img-fluid"
                alt=""
              />
            </div>

            <div className="col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center">
              <img
                src="/imgs/carLogos/mazda_logo.png"
                className="img-fluid"
                alt=""
              />
            </div>

            <div className="col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center">
              <img
                src="/imgs/carLogos/audi_logo.png"
                className="img-fluid"
                alt=""
              />
            </div>
          </div>
          <style jsx>{`
            h2 {
              color: var(--main-color);
              font-weight: 600;
            }
          `}</style>
        </section>
      </div>

      <div className="my-5">
        <section className={carStyles.featured_places}>
          <h1 className="mb-3">
            Featured Listings
            <GradBar />
          </h1>
          <Row>
            {featuredListings.length != 0 ? (
              featuredListings.map((car) => {
                return (
                  <Col className="mb-3" key={car.id} md={4} sm={6} xs={12}>
                    <div className={carStyles.featured_item}>
                      <div className={carStyles.thumb}>
                        <div className={carStyles.thumb_img}>
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
                              <div className={carStyles.overlay_content}>
                                <strong>
                                  <GoDashboard />{" "}
                                  {car.mileage
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
                      <div className={carStyles.down_content}>
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

                        <div className={carStyles.text_button}>
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
              <>
                <div className="d-flex justify-content-center align-items-center flex-column">
                  <strong>
                    <h3 className="m-3">
                      No featured listings at this time <AiOutlineFrown />
                    </h3>
                  </strong>
                  <div className="m-3">
                    <h3 className="">
                      Click below to see our current selection of vehicles
                    </h3>
                  </div>
                  <Link a href="/cars">
                    <Button className="mt-3">View Inventory</Button>
                  </Link>
                </div>
              </>
            )}

            <style jsx>{`
              strong sup {
                color: var(--main-color);
              }
              span strong {
                color: var(--main-color);
              }
            `}</style>
          </Row>
        </section>
      </div>
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
