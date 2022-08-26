import React from "react";
import { NextSeo  } from "next-seo"; 
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
// import LogoDataService from "../services/logos.services";
import { AiOutlineFrown } from "react-icons/ai";

export async function getStaticProps(context) {
  const featuredListings = await CarDataService.getAllFeaturedListings();
  // const makeLogoImages = LogoDataService.getAllMakeLogoImages();
  return {
    props: {
      featuredListings,
      // makeLogoImages,
    },
  };
}

export default function Home({ featuredListings }) {
  // console.log("Logo Images: ",makeLogoImages);
  return (
    <>
      {/* <Head>
        <title>Guardian Automobile Sales | Home</title>
        <meta name="description" content="Find the best used cars in Scranton, Wilkes-Barre and Dunmore, PA. We have a large selection of used vehicles at affordable prices." />
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      </Head> */}
      <NextSeo
        title="Guardian Automobile Sales | Home"
        description="Find the best used cars in Scranton, Wilkes-Barre and Dunmore, PA. We have a large selection of used vehicles at affordable prices."
        canonical="https://www.gasautomobilesales.com/"
        openGraph={{
          url: "https://www.gasautomobilesales.com/",
          title: "Guardian Automobile Sales | Home",
          description: "Find the best used cars in Scranton, Wilkes-Barre and Dunmore, PA. We have a large selection of used vehicles at affordable prices.",
          images: [
            {
              url: "/imgs/GAS-Text-Only-2-Color.png",
              width: 800,
              height: 600,
              alt: "Og GAS Text Logo",
              type: "image/png",
            },
          ],
          site_name: "gasautomobilesales",
        }}
      />

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
          <div className="d-flex justify-content-center mb-3 mt-3">
            <h1>
              Some of the brands we sell ...
              <GradBar />
            </h1>
          </div>
          <div className="row">
            <div className="col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center">
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
                      <div className={carStyles.down_content}>
                        <h4>
                          {car.year} {car.make} {car.model} {car.trim}
                        </h4>

                        <br />

                        <p>
                          <span>
                            <strong>{car.price}</strong>
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
