
import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Container, Row, Col, Button, Form, InputGroup, Breadcrumb } from "react-bootstrap";
import styles from "../styles/page_styles/Cars.module.css";
import GradBar from "../components/GradBar";
import spinner from "../public/spinner.gif";
import { GoDashboard } from "react-icons/go";
import { GiCube, GiCog } from "react-icons/gI";
import { db } from "../firebaseConfig";
import { collection, getDocs, query, orderBy, startAfter, limit  } from "firebase/firestore";

export default function Cars() {

  const [listOfCars, setListOfCars] = useState([]);
  const [lastCarDoc, setLastCarDoc] = useState([]);
  const [carId, setCarId] = useState("");
  const [loading, setLoading] = useState(true);
  const carCollectionRef = collection(db, "Cars");

  useEffect(() => {
    const cars = [];
    const getFirstBatch = async () => {
      const firstQuery = query(
        carCollectionRef,
        orderBy("createdAt"),
        limit(6)
      );
      const querySnapshot = await getDocs(firstQuery);
      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      setLastCarDoc(lastVisible);

      querySnapshot.forEach(
        (doc) => {
          cars.push({
            ...doc.data(),
            id: doc.id,
            createdAt: doc.data().createdAt.toDate().getTime(),
          });
        },
        (error) => {
          console.log(
            "Error getting snapshot data for Car collection: ",
            error
          );
        }
      );
      setLoading(false);
      setListOfCars(cars);
      console.log("Last visible: ", lastVisible);
      console.log("cars: ", listOfCars);
    };
    getFirstBatch();
  }, []);
  
    // Check to see if cars data is still loading
    // if (loading) {
    //   return <Image src={spinner} width={300} height={200}/>;
    // }

  async function loadMoreCars() {
    const newCars = []; 
    const carCollectionRef = collection(db, "Cars");

    if(lastCarDoc == null || lastCarDoc.length == 0 || lastCarDoc == undefined) {
      const loadBtn = document.getElementById('loadBtn');
      loadBtn.style.display = 'none';
      return;
    }

    const q = query(carCollectionRef, 
      orderBy('createdAt'), 
      startAfter(lastCarDoc), 
      limit(6)
      );
      const querySnapshot = await getDocs(q);
      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      setLastCarDoc(lastVisible);
      
      if(querySnapshot.empty) {
        return;
    }
    querySnapshot.forEach(
      (doc) => {
        console.log("adding newCar doc: ", doc.data());
        newCars.push({ ...doc.data(), id: doc.id, createdAt: doc.data().createdAt.toDate().getTime()});
      },
      (error) => {
        console.log("Error getting snapshot data for Car collection: ", error);
      }
    );
    setListOfCars((prevState) => [...prevState, ...newCars]);
  }

  console.log("current cars: ",listOfCars);

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
          {listOfCars.map((car) => {
            return (
              <Col key={car.id} md={4} sm={6} xs={12}>
                <div className={styles.featured_item}>
                  <div className={styles.thumb}>
                    <div className={styles.thumb_img}>
                      {car.thumbnailImage != null ? (
                        <Image
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
                        <GiCube /> 1800 cc
                      </strong>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <strong>
                        <GiCog /> Manual
                      </strong>
                    </div>
                  </div>
                  <div className={styles.down_content}>
                    <h4>
                      {car.make} {car.model}
                    </h4>

                    <br />

                    <p>190 hp / ⛽ / {car.year} / Used vehicle</p>

                    <p>
                      <span>
                        {/* <del>
                          <sup>$</sup>11999.00{" "}
                        </del>{" "} */}
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
