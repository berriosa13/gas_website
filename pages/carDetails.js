import { useEffect, useState, useMemo } from "react";
import Head from "next/head";
import Image from "next/image";
import Layout from '../components/Layout'
import { useRouter } from "next/router";
import styles from "../styles/page_styles/Cars.module.css";
import utilMethods from "../services/utils";
import ImageModal  from "../components/ImageModal";
import {
  Container,
  Row,
  Col,
  Accordion,
  ListGroup,
  Button,
  Breadcrumb,
} from "react-bootstrap";

export async function getServerSideProps(context) {
  return {
    props: {},
  };
}

export default function CarDetails() {
  const [images, setImages] = useState([]);
  // const [displayImages, setDisplayImages] = useState([]);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const router = useRouter();
  const car = router.query;
  const displayImages = images.slice(0, 4);

  console.log("Car passed in from useRouter: ", car);

  useEffect(() => {
    if (car.id == null || car.id == undefined) {
      router.push("/cars");
    }
    const retrieveImages = async () => {
      const result = await utilMethods.getAllImages(car.id);
      console.log("result from utilMethod.getAllImages call: ", result);
      setImages(result);
    };
    retrieveImages();
  }, []);

  console.log("displayImages: ",displayImages);
  
  const showModal = () => {
    setImageModalOpen(true);
  };
  
  const hideModal = () => {
    setImageModalOpen(false);
  };
  
  return (
    <>
      
      <ImageModal show={imageModalOpen} handleClose={hideModal} setImages={images} setCar={car} />
         
      <Head>
        <title>GAS Automobile Sales | Car Details</title>
        <meta name="keywords" content="cars" />
      </Head>

      <div className="d-flex justify-content-between my-5">
        <h1>Used {car.year} {car.make} {car.model} - ${car.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h1>
          <Breadcrumb className="fst-italic">
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/cars">Inventory</Breadcrumb.Item>
          <Breadcrumb.Item href="/cars">Details</Breadcrumb.Item>
          <style jsx global>{`
            a {
              color: var(--main-color) !important;
            } 
            a:hover {
              color: var(--secondary-color) !important;
            }
            h1 {
              font-weight: bold;
            }
          `}</style>
        </Breadcrumb>
      </div> 
            
      <main>
        <section className={styles.featured_places}>

          <div className="container mt-5">
            <div className="row">
              <section id="photoArray">
              <div><Image priority="true" layout="responsive" width="600" height="438" src={car.thumbnailImage}/></div>
                {displayImages.map((displayImage) => {
                  return(
                    <div>
                      <Image
                        src={displayImage.imageUrl}
                        layout="responsive"
                        width="300"
                        height="215"
                      />
                      </div>
                    );
                  })}
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
                    -webkit-box-shadow: 5px 5px 15px 5px #333; 
                    box-shadow: 5px 5px 15px 5px #333; 
                  }
                  #photoArray > div:first-child {
                    grid-area: photoOne;
                    height: 450px;
                  }
                  #photoArray > img {
                    object-fit: cover;
                    width: 100%;
                    max-height: 100%;
                  }
                  #photoArray > img:last-child {
                    background-color: #333;
                    opacity: .7;
                  }
                  
                  `}</style>
                  
              </section>
              <div className="row my-3 d-flex justify-content-center text-center">
                <div className="col-md-6">
                  <Button onClick={showModal} variant="primary">View All Images</Button>
                </div>
              </div>
              
              <div className="col">
                <h2>
                  <strong className="text-primary">
                    $
                    {car.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </strong>
                </h2>

                <br />

                <ListGroup horizontal>
                  <ListGroup.Item className="w-50 d-flex justify-content-start">
                    Type
                  </ListGroup.Item>
                  <ListGroup.Item className="font-weight-bold w-50 d-flex justify-content-end">
                    Used vehicle
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
                    {car.mileage
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </ListGroup.Item>
                </ListGroup>
                <ListGroup horizontal>
                  <ListGroup.Item className="w-50 d-flex justify-content-start">
                    Fuel
                  </ListGroup.Item>
                  <ListGroup.Item className="w-50 d-flex justify-content-end">
                    Diesel
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
                    Black
                  </ListGroup.Item>
                </ListGroup>
                <ListGroup horizontal>
                  <ListGroup.Item className="w-50 d-flex justify-content-start">
                    Exterior Color
                  </ListGroup.Item>
                  <ListGroup.Item className="w-50 d-flex justify-content-end">
                    White
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
                `}</style>

                <div>
                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Vehicle Extras</Accordion.Header>
                      <Accordion.Body>
                        <Row>
                          <Col sm={6} xs={12}>
                            <p>ABS</p>
                          </Col>

                          <Col sm={6} xs={12}>
                            <p>Leather seats</p>
                          </Col>

                          <Col sm={6} xs={12}>
                            <p>Power Assisted Steering</p>
                          </Col>

                          <Col sm={6} xs={12}>
                            <p>Electric heated seats</p>
                          </Col>

                          <Col sm={6} xs={12}>
                            <p>New HU and AU</p>
                          </Col>

                          <Col sm={6} xs={12}>
                            <p>Xenon headlights</p>
                          </Col>
                        </Row>
                      </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="1">
                      <Accordion.Header>Vehicle Description</Accordion.Header>
                      <Accordion.Body>
                        <p>
                          - Color coded bumpers
                          <br />- Tinted glass
                          <br />- Immobiliser
                          <br />- Central locking - remote
                          <br />- Passenger airbag
                          <br />- Electric windows
                          <br />- Rear head rests
                          <br />- Radio
                          <br />- CD player
                          <br />- Ideal first car
                          <br />- Warranty
                          <br />- High level brake light
                          <br />
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat. Duis aute irure dolor in
                          reprehenderit in voluptate velit esse cillum dolore eu
                          fugiat nulla pariatur. Excepteur sint occaecat
                          cupidatat non proident, sunt in culpa qui officia
                          deserunt mollit anim id est laborum.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="2">
                      <Accordion.Header> Contact Information</Accordion.Header>
                      <Accordion.Body>
                        <p>
                          <span>Name</span>

                          <br />

                          <strong>Carmelo Berrios</strong>
                        </p>

                        <p>
                          <span>Phone</span>

                          <br />

                          <strong>
                            <a href="tel:123-456-789">123-456-789</a>
                          </strong>
                        </p>

                        <p>
                          <span>Mobile phone</span>

                          <br />

                          <strong>
                            <a href="tel:456789123">456789123</a>
                          </strong>
                        </p>

                        <p>
                          <span>Email</span>

                          <br />

                          <strong>
                            <a href="mailto:cberrios@gasautomobilesales.com">
                              cberrios@gasautomobilesales.com
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
        </section>
      </main>
    </>
  );
}

CarDetails.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}
