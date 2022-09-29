import { useEffect, useState } from "react";
import { NextSeo  } from "next-seo"; 
import Image from "next/image";
import Layout from '../components/Layout'
import { useRouter } from "next/router";
import styles from "../styles/page_styles/Cars.module.css";
import ImageDataService from "../services/images.services";
import ImageModal from "../components/modals/ImageModal";
import QuoteModal from "../components/modals/QuoteModal";
import AvailabilityModal from "../components/modals/AvailabilityModal";
import TestDriveModal from "../components/modals/TestDriveModal";
import { BsDashLg } from "react-icons/bs";
import GradBar from '../components/GradBar'

import {
  Row,
  Col,
  Accordion,
  ListGroup,
  Button,
} from "react-bootstrap";

export async function getStaticProps(context) {
  return {
    props: {},
  };
}

export default function CarDetails() {
  const [images, setImages] = useState([]);
  const [displayImages, setDisplayImages] = useState([]);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [availabilityModalOpen, setAvailabilityModalOpen] = useState(false);
  const [testDriveModalOpen, setTestDriveModalOpen] = useState(false);
  const DISPLAY_IMAGES_TOTAL = 4; 
  const router = useRouter();
  const car = router.query;
  const thumbnailImage = car.thumbnailImage; 
  // console.log("thumbnailImage: ", thumbnailImage);
  // console.log("displayImages: ", displayImages);

  // console.log("Car passed in from useRouter: ", car);

  useEffect(() => {
    const retrieveImages = async () => {
      const listingImages = await ImageDataService.getAllListingImages(car.id);
      // console.log("result from ImageDataService.getAllListingImages(): ", listingImages);
      setImages(listingImages);
      filterDisplayImages(listingImages);
    };
    retrieveImages();
  }, [car.id]);

  const filterDisplayImages = (listingImages) => {
    let filteredDisplayImages = null;
    // console.log("listingImages in filterDisplayImages(): ",listingImages);
    listingImages.forEach((image) => {
      if(thumbnailImage === image.imageUrl) {
        filteredDisplayImages = listingImages.filter(x => x !== image);
        // console.log("newly filtered images: ", filteredDisplayImages);
      }
    })
    setDisplayImages(filteredDisplayImages.slice(0, DISPLAY_IMAGES_TOTAL));
  }

  const showImageModal = () => {
    setImageModalOpen(true);
  };

  const hideImageModal = () => {
    setImageModalOpen(false);
  };

  const showQuoteModal = () => {
    setQuoteModalOpen(true);
  };

  const hideQuoteModal = () => {
    setQuoteModalOpen(false);
  };

  const showAvailabilityModal = () => {
    setAvailabilityModalOpen(true);
  };

  const hideAvailabilityModal = () => {
    setAvailabilityModalOpen(false);
  };

  const showTestDriveModal = () => {
    setTestDriveModalOpen(true);
  };

  const hideTestDriveModal = () => {
    setTestDriveModalOpen(false);
  };

  return (
    <>
      <ImageModal
        show={imageModalOpen}
        handleClose={hideImageModal}
        setImages={images}
        setCar={car}
      />
      <QuoteModal
        show={quoteModalOpen}
        handleClose={hideQuoteModal}
        setCar={car}
      />
      <AvailabilityModal
        show={availabilityModalOpen}
        handleClose={hideAvailabilityModal}
        setCar={car}
      />
      <TestDriveModal
        show={testDriveModalOpen}
        handleClose={hideTestDriveModal}
        setCar={car}
      />

      <NextSeo
        title="Guardian Automobile Sales | Car Details"
        description="Details for the vehicle"
        canonical="https://www.gasautomobilesales.com/"
        openGraph={{
          url: "https://www.gasautomobilesales.com/",
          title: "Guardian Automobile Sales | Car Details",
          description: "Details for the vehicle",
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

      <div className="d-flex mx-4 mt-5 justify-content-start">
        <h1>
          {car.year} {car.make} {car.model} 
          <GradBar/>
        </h1>
      </div>
      <main>
        <section className={styles.featured_places}>
          <div className="container mt-5">
            <div className="row">
              <section id="photoArray">
                {thumbnailImage != null && displayImages != null ? (
                  <>
                    <div>
                      <Image
                        layout="responsive"
                        width={600}
                        height={500}
                        alt="thumbnailImage"
                        src={thumbnailImage}
                      />
                    </div>
                    {displayImages.map((displayImage) => {
                      return (
                        <div
                          key={displayImage.id}
                          style={{
                            position: "relative",
                            width: "auto",
                            height: "auto",
                          }}
                        >
                          <Image
                            priority="true"
                            src={displayImage.imageUrl}
                            layout="fill"
                            objectFit="unset"
                            alt="displayImages"
                          />
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <>
                    <div>
                      <Image
                        priority="true"
                        src="https://via.placeholder.com/600x500.png?text=Image+Coming+Soon..."
                        layout="responsive"
                        alt="thumbnail image"
                        width={600}
                        height={500}
                      />
                    </div>
                    <div
                      style={{
                        position: "relative",
                        width: "auto",
                        height: "auto",
                      }}
                    >
                      <Image
                        priority="true"
                        src="https://via.placeholder.com/600x500.png?text=Image+Coming+Soon..."
                        layout="fill"
                        objectFit="unset"
                        alt="thumbnail image"
                      />
                    </div>
                    <div
                      style={{
                        position: "relative",
                        width: "auto",
                        height: "auto",
                      }}
                    >
                      <Image
                        priority="true"
                        src="https://via.placeholder.com/600x500.png?text=Image+Coming+Soon..."
                        layout="fill"
                        objectFit="unset"
                        alt="thumbnail image"
                      />
                    </div>
                    <div
                      style={{
                        position: "relative",
                        width: "auto",
                        height: "auto",
                      }}
                    >
                      <Image
                        priority="true"
                        src="https://via.placeholder.com/600x500.png?text=Image+Coming+Soon..."
                        layout="fill"
                        objectFit="unset"
                        alt="thumbnail image"
                      />
                    </div>
                    <div
                      style={{
                        position: "relative",
                        width: "auto",
                        height: "auto",
                      }}
                    >
                      <Image
                        priority="true"
                        src="https://via.placeholder.com/600x500.png?text=Image+Coming+Soon..."
                        layout="fill"
                        objectFit="unset"
                        alt="thumbnail image"
                      />
                    </div>
                  </>
                )}

                <style jsx>{`
                  #photoArray {
                    display: grid;
                    grid-gap: .5em;
                    grid-template-areas: 
                      "photoOne photoTwo photoThree"  
                      "photoOne photoFour photoFive";
                    grid-template-columns: 1fr .5fr .5fr;
                  }
                  #photoArray > div {
                    box-shadow: 0px 0px 5px 3px rgba(0,0,0,0.75);
                    -webkit-box-shadow: 0px 0px 5px 3px rgba(0,0,0,0.75);
                    -moz-box-shadow: 0px 0px 5px 3px rgba(0,0,0,0.75); 
                  }
                  #photoArray > div:first-child {
                    grid-area: photoOne;
                    height: auto;
                  }
                  #photoArray > img {
                    object-fit: contain;
                    width: 100% !important;
                    height:unset !important;
                    position: relative !important; 
                  }
                  #photoArray > img:last-child {
                    background-color: #333;
                    opacity: .7;
                  }

                  }

                  `}</style>
              </section>
              <div className="row my-3 d-flex justify-content-center text-center">
                <div className="col-md-6 mt-3">
                  <Button
                    onClick={showImageModal}
                    variant="primary"
                  >
                    View All Images
                  </Button>
                </div>
              </div>

              <div className="col">
                <h2>
                  {car.price ? (
                    <strong className="text-primary">{car.price}</strong>
                  ) : (
                    <strong className="text-primary">Unavailable</strong>
                  )}
                </h2>

                <br />

                <ListGroup horizontal>
                  <ListGroup.Item className="w-50 d-flex justify-content-start">
                    Type
                  </ListGroup.Item>
                  <ListGroup.Item className="font-weight-bold w-50 d-flex justify-content-end">
                    Pre-Owned Vehicle
                  </ListGroup.Item>
                </ListGroup>
                <ListGroup horizontal>
                  <ListGroup.Item className="w-50 d-flex justify-content-start">
                    Make
                  </ListGroup.Item>
                  <ListGroup.Item className="w-50 d-flex justify-content-end">
                    {car.make}
                  </ListGroup.Item>
                </ListGroup>
                <ListGroup horizontal>
                  <ListGroup.Item className="w-50 d-flex justify-content-start">
                    Trim
                  </ListGroup.Item>
                  <ListGroup.Item className="w-50 d-flex justify-content-end">
                    {car.trim ? <>{car.trim}</> : <>Unavailable</>}
                  </ListGroup.Item>
                </ListGroup>
                <ListGroup horizontal>
                  <ListGroup.Item className="w-50 d-flex justify-content-start">
                    Model
                  </ListGroup.Item>
                  <ListGroup.Item className="w-50 d-flex justify-content-end">
                    {car.model}
                  </ListGroup.Item>
                </ListGroup>
                <ListGroup horizontal>
                  <ListGroup.Item className="w-50 d-flex justify-content-start">
                    Year
                  </ListGroup.Item>
                  <ListGroup.Item className="w-50 d-flex justify-content-end">
                    {car.year}
                  </ListGroup.Item>
                </ListGroup>
                <ListGroup horizontal>
                  <ListGroup.Item className="w-50 d-flex justify-content-start">
                    Mileage
                  </ListGroup.Item>

                  <ListGroup.Item className="w-50 d-flex justify-content-end">
                    {car.mileage ? (
                      <strong>{car.mileage}</strong>
                    ) : (
                      <strong>Unavailable</strong>
                    )}
                  </ListGroup.Item>
                </ListGroup>
                <ListGroup horizontal>
                  <ListGroup.Item className="w-50 d-flex justify-content-start">
                    Vin #
                  </ListGroup.Item>
                  <ListGroup.Item className="w-50 d-flex justify-content-end">
                    {car.vin}
                  </ListGroup.Item>
                </ListGroup>
                <ListGroup horizontal>
                  <ListGroup.Item className="w-50 d-flex justify-content-start">
                    Interior Color
                  </ListGroup.Item>
                  <ListGroup.Item className="w-50 d-flex justify-content-end">
                    {car.interiorColor}
                  </ListGroup.Item>
                </ListGroup>
                <ListGroup horizontal>
                  <ListGroup.Item className="w-50 d-flex justify-content-start">
                    Exterior Color
                  </ListGroup.Item>
                  <ListGroup.Item className="w-50 d-flex justify-content-end">
                    {car.exteriorColor}
                  </ListGroup.Item>
                </ListGroup>
                <style jsx global>{`
                  .list-group-horizontal > .list-group-item + .list-group-item {
                    border-top-width: 1px;
                    font-weight: bold !important;
                  }
                  .list-group-horizontal > .list-group-item:last-child {
                    border-top-right-radius: 0.25rem;
                    border-bottom-left-radius: 0;
                    font-weight: bold !important;
                  }
                  .text-primary {
                    color: var(--main-color) !important;
                  }
                  .text-primary:hover {
                    color: var(--secondary-color) !important;
                  }
                  @media only screen and (max-width: 768px) {
                    .list-group-horizontal {
                      font-size: x-small !important;
                    }
                    .accordion-body {
                      font-size: x-small !important;
                    }
                    .accordion-button {
                      font-size: x-small !important;
                    }
                  }
                `}</style>

                <div>
                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Vehicle Description</Accordion.Header>
                      <Accordion.Body>
                        <p>
                          <BsDashLg /> {car.description}
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="1">
                      <Accordion.Header> Contact Information</Accordion.Header>
                      <Accordion.Body>
                        <p>
                          <span>Phone</span>

                          <br />

                          <strong>
                            <a href="tel:570-800-1208">(570)-800-1208</a>
                          </strong>
                        </p>

                        <p>
                          <span>Email</span>

                          <br />

                          <strong>
                            <a href="mailto:info@gasautomobilesales.com">
                              info@gasautomobilesales.com
                            </a>
                          </strong>
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>

          <Row className="m-5">
            <Col className="d-flex justify-content-between flex-wrap">
              <Button className="mb-3" onClick={showQuoteModal}>
                Request A Quote
              </Button>

              <Button className="mb-3" onClick={showAvailabilityModal}>
                Confirm Availability
              </Button>

              <Button className="mb-3" onClick={showTestDriveModal}>
                Schedule Test Drive
              </Button>

              <Button className="mb-3" href="/apply">
                Apply Online
              </Button>
            </Col>
          </Row>
        </section>
      </main>
    </>
  );
}

CarDetails.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
