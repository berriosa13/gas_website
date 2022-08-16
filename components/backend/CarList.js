import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  OverlayTrigger,
  Tooltip,
  Tab,
  Tabs,
} from "react-bootstrap";
import Image from "next/image";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { FaRegImages } from "react-icons/fa";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsArrowRightShort } from "react-icons/bs";
import { TbFileDescription } from "react-icons/tb";
import CarDataService from "../../services/cars.services";
import { collection, onSnapshot, where, orderBy, query } from "firebase/firestore";

import { db } from "../../firebaseConfig";

const CarsList = ({
  getCarId,
  getIsImageModalOpen,
  getIndividualCarData,
  getIsDeleteModalOpen,
  getIdForDeletion,
  getIsDescriptionModalOpen,
}) => {
  const [activeListings, setActiveListings] = useState([]);
  const [inactiveListings, setInactiveListings] = useState([]);
  

  // useEffect(() => {
  //   // Realtime listening of db changes. Updates table as change are made
  //   const carUnsub = onSnapshot(
  //     collection(db, "Cars"),
  //     where('sold', '==', 'No'),
  //     orderBy("createdAt"),
  //     (snapShot) => {
  //       let list = [];
  //       snapShot.docs.forEach((doc) => {
  //         list.push({
  //           ...doc.data(),
  //           id: doc.id,
  //         });
  //       });
  //       setCars(list);
  //     },
  //     (error) => {
  //       console.log("Error getting snapshot data for Car collection ", error);
  //     }
  //   );

  //   return () => {
  //     carUnsub();
  //   };
  // }, []);

  useEffect(() => {
    // Realtime listening of all active listings. Returns list of all listings that have not been sold yet.
    const activeListingsQuery = query(collection(db, "Cars"), where("sold", "==", "No"));
    const unsubscribe = onSnapshot(activeListingsQuery, (querySnapshot) => {
      const listings = [];
      querySnapshot.forEach((doc) => {
        listings.push({...doc.data(), id: doc.id,});
      });
     console.log("activeListings:",listings);
     setActiveListings(listings);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    // Realtime listening of all inactive listings. Returns list of all listings that HAVE sold.
    const inactiveListingsQuery = query(collection(db, "Cars"), where("sold", "==", "Yes"));
    const unsubscribe = onSnapshot(inactiveListingsQuery, (querySnapshot) => {
      const listings = [];
      querySnapshot.forEach((doc) => {
        listings.push({
          ...doc.data(),
           id: doc.id,
          });
      });
     console.log("inactiveListings:",listings);
     setInactiveListings(listings);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // create new instance for active listing with createdAt field modified for viewing
  const allActiveListings = activeListings.map((activeListing) => ({
    id: activeListing?.id,
    createdAt: activeListing?.createdAt?.toDate(),
    make: activeListing?.make,
    trim: activeListing?.trim,
    mileage: activeListing?.mileage,
    model: activeListing?.model,
    price: activeListing?.price,
    vin: activeListing?.vin,
    year: activeListing?.year,
    drivetrain: activeListing?.drivetrain,
    engine: activeListing?.engine,
    doors: activeListing?.doors,
    exteriorColor: activeListing?.exteriorColor,
    interiorColor: activeListing?.interiorColor,
    transmission: activeListing?.transmission,
    thumbnailImage: activeListing?.thumbnailImage,
    description: activeListing?.description,
    featuredListing: activeListing?.featuredListing,
    sold: activeListing?.sold,
  }));
  console.log("allActiveListings: ", allActiveListings);

  const allInactiveListings = inactiveListings.map((inactiveListing) => ({
    id: inactiveListing?.id,
    createdAt: inactiveListing?.createdAt?.toDate(),
    make: inactiveListing?.make,
    trim: inactiveListing?.trim,
    mileage: inactiveListing?.mileage,
    model: inactiveListing?.model,
    price: inactiveListing?.price,
    vin: inactiveListing?.vin,
    year: inactiveListing?.year,
    drivetrain: inactiveListing?.drivetrain,
    engine: inactiveListing?.engine,
    doors: inactiveListing?.doors,
    exteriorColor: inactiveListing?.exteriorColor,
    interiorColor: inactiveListing?.interiorColor,
    transmission: inactiveListing?.transmission,
    thumbnailImage: inactiveListing?.thumbnailImage,
    description: inactiveListing?.description,
    featuredListing: inactiveListing?.featuredListing,
    sold: inactiveListing?.sold,
    dateSold: inactiveListing?.dateSold?.toDate()
  }));
  console.log("allInactiveListings: ", allInactiveListings);

  return (
    <>
      <>
        <ToastContainer draggable={false} transition={Zoom} autoClose={3000} />
      </>
      <Tabs defaultActiveKey="active" className="mb-3">
        <Tab eventKey="active" title="Active Listings">
          <Table
            variant="dark"
            responsive="lg"
            bordered
            hover
            size="sm"
            className="text-center"
          >
            <thead>
              <tr>
                <th>#</th>
                <th>Make/Model</th>
                <th>Trim</th>
                <th>Mileage</th>
                <th>Price</th>
                <th>Vin</th>
                <th>Year</th>
                <th>Misc</th>
                <th>Color</th>
                <th>Date Added</th>
                <th>Featured Listing?</th>
                <th>Description</th>
                <th>Thumbnail</th>
                <th>Sold?</th>
                <th>View/Edit/Delete</th>
              </tr>
            </thead>
            <tbody>
              {allActiveListings.map((doc, index) => {
                return (
                  <tr key={doc.id} className="text-center">
                    <td>{index + 1}</td>
                    <td>
                      <div className="d-flex justify-content-center align-items-center">
                        {doc.make} {doc.model}
                      </div>
                    </td>
                    <td>{doc.trim}</td>
                    <td className="">{doc.mileage}</td>
                    <td>{doc.price}</td>
                    <td>#{doc.vin}</td>
                    <td>{doc.year}</td>
                    <td>
                      Drivetrain <BsArrowRightShort /> {doc.drivetrain} <br />
                      Transmission <BsArrowRightShort /> {doc.transmission}{" "}
                      <br />
                      Engine <BsArrowRightShort /> {doc.engine} <br />
                      Doors <BsArrowRightShort /> {doc.doors}
                    </td>
                    <td>
                      Interior <BsArrowRightShort /> {doc.interiorColor} <br />{" "}
                      Exterior <BsArrowRightShort /> {doc.exteriorColor}
                    </td>
                    <td>
                      {doc.createdAt &&
                        doc.createdAt.toLocaleDateString() +
                          " " +
                          doc.createdAt.toLocaleTimeString()}
                    </td>

                    <td>{doc.featuredListing}</td>
                    <td>
                      {["View"].map((placement) => (
                        <OverlayTrigger
                          key={placement}
                          placement="top"
                          overlay={
                            <Tooltip id={`tooltip-${placement}`}>
                              <strong>{placement}</strong> description.
                            </Tooltip>
                          }
                        >
                          <Button
                            variant="primary"
                            className="m-1"
                            size="lg"
                            onClick={() => {
                              getIsDescriptionModalOpen(true);
                              getIndividualCarData(doc);
                            }}
                          >
                            <TbFileDescription />
                          </Button>
                        </OverlayTrigger>
                      ))}
                    </td>
                    {doc.thumbnailImage != null ? (
                      <td>
                        <Image
                          src={doc.thumbnailImage}
                          className="mb-3"
                          width="100"
                          height="100"
                          alt="thumbnailImage"
                        />
                      </td>
                    ) : (
                      <td>Thumbnail not set 😔</td>
                    )}
                    <td>{doc?.sold}</td>
              
                    <td>
                      {["Display"].map((placement) => (
                        <OverlayTrigger
                          key={placement}
                          placement="top"
                          overlay={
                            <Tooltip id={`tooltip-${placement}`}>
                              <strong>{placement}</strong> all images.
                            </Tooltip>
                          }
                        >
                          <Button
                            variant="primary"
                            className="m-1"
                            size="lg"
                            onClick={() => {
                              getIsImageModalOpen(true);
                              getIndividualCarData(doc);
                            }}
                          >
                            <FaRegImages />
                          </Button>
                        </OverlayTrigger>
                      ))}

                      {["Edit"].map((placement) => (
                        <OverlayTrigger
                          key={placement}
                          placement="top"
                          overlay={
                            <Tooltip id={`tooltip-${placement}`}>
                              <strong>{placement}</strong> this listing.
                            </Tooltip>
                          }
                        >
                          <Button
                            size="lg"
                            className="m-1"
                            variant="primary"
                            onClick={(e) => getCarId(doc.id)}
                          >
                            <AiOutlineEdit />
                          </Button>
                        </OverlayTrigger>
                      ))}

                      {["Delete"].map((placement) => (
                        <OverlayTrigger
                          key={placement}
                          placement="top"
                          overlay={
                            <Tooltip id={`tooltip-${placement}`}>
                              <strong>{placement}</strong> this listing.
                            </Tooltip>
                          }
                        >
                          <Button
                            variant="primary"
                            size="lg"
                            className="m-1"
                            onClick={() => {
                              getIsDeleteModalOpen(true);
                              getIdForDeletion(doc.id);
                            }}
                          >
                            <AiOutlineDelete />
                          </Button>
                        </OverlayTrigger>
                      ))}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey="sold" title="Sold Listings">
        <Table
            variant="dark"
            responsive="lg"
            bordered
            hover
            size="sm"
            className="text-center"
          >
            <thead>
              <tr>
                <th>#</th>
                <th>Make/Model</th>
                <th>Trim</th>
                <th>Mileage</th>
                <th>Price</th>
                <th>Vin</th>
                <th>Year</th>
                <th>Misc</th>
                <th>Color</th>
                <th>Date Added</th>
                <th>Featured Listing?</th>
                <th>Description</th>
                <th>Thumbnail</th>
                <th>Sold?</th>
                <th>Date Sold</th>
                <th>View/Edit/Delete</th>
              </tr>
            </thead>
            <tbody>
              {allInactiveListings.map((doc, index) => {
                return (
                  <tr key={doc.id} className="text-center">
                    <td>{index + 1}</td>
                    <td>
                      <div className="d-flex justify-content-center align-items-center">
                        {doc.make} {doc.model}
                      </div>
                    </td>
                    <td>{doc.trim}</td>
                    <td className="">{doc.mileage}</td>
                    <td>{doc.price}</td>
                    <td>#{doc.vin}</td>
                    <td>{doc.year}</td>
                    <td>
                      Drivetrain <BsArrowRightShort /> {doc.drivetrain} <br />
                      Transmission <BsArrowRightShort /> {doc.transmission}{" "}
                      <br />
                      Engine <BsArrowRightShort /> {doc.engine} <br />
                      Doors <BsArrowRightShort /> {doc.doors}
                    </td>
                    <td>
                      Interior <BsArrowRightShort /> {doc.interiorColor} <br />{" "}
                      Exterior <BsArrowRightShort /> {doc.exteriorColor}
                    </td>
                    <td>
                      {doc.createdAt &&
                        doc.createdAt.toLocaleDateString() +
                          " " +
                          doc.createdAt.toLocaleTimeString()}
                    </td>

                    <td>{doc.featuredListing}</td>
                    <td>
                      {["View"].map((placement) => (
                        <OverlayTrigger
                          key={placement}
                          placement="top"
                          overlay={
                            <Tooltip id={`tooltip-${placement}`}>
                              <strong>{placement}</strong> description.
                            </Tooltip>
                          }
                        >
                          <Button
                            variant="primary"
                            className="m-1"
                            size="lg"
                            onClick={() => {
                              getIsDescriptionModalOpen(true);
                              getIndividualCarData(doc);
                            }}
                          >
                            <TbFileDescription />
                          </Button>
                        </OverlayTrigger>
                      ))}
                    </td>
                    {doc.thumbnailImage != null ? (
                      <td>
                        <Image
                          src={doc.thumbnailImage}
                          className="mb-3"
                          width="100"
                          height="100"
                          alt="thumbnailImage"
                        />
                      </td>
                    ) : (
                      <td>Thumbnail not set 😔</td>
                    )}
                    <td>{doc?.sold}</td>
                    <td>
                      {doc.dateSold &&
                        doc.dateSold.toLocaleDateString() +
                          " " +
                          doc.dateSold.toLocaleTimeString()}
                    </td>

                    <td>
                      {["Display"].map((placement) => (
                        <OverlayTrigger
                          key={placement}
                          placement="top"
                          overlay={
                            <Tooltip id={`tooltip-${placement}`}>
                              <strong>{placement}</strong> all images.
                            </Tooltip>
                          }
                        >
                          <Button
                            variant="primary"
                            className="m-1"
                            size="lg"
                            onClick={() => {
                              getIsImageModalOpen(true);
                              getIndividualCarData(doc);
                            }}
                          >
                            <FaRegImages />
                          </Button>
                        </OverlayTrigger>
                      ))}

                      {["Edit"].map((placement) => (
                        <OverlayTrigger
                          key={placement}
                          placement="top"
                          overlay={
                            <Tooltip id={`tooltip-${placement}`}>
                              <strong>{placement}</strong> this listing.
                            </Tooltip>
                          }
                        >
                          <Button
                            size="lg"
                            className="m-1"
                            variant="primary"
                            onClick={(e) => getCarId(doc.id)}
                          >
                            <AiOutlineEdit />
                          </Button>
                        </OverlayTrigger>
                      ))}

                      {["Delete"].map((placement) => (
                        <OverlayTrigger
                          key={placement}
                          placement="top"
                          overlay={
                            <Tooltip id={`tooltip-${placement}`}>
                              <strong>{placement}</strong> this listing.
                            </Tooltip>
                          }
                        >
                          <Button
                            variant="primary"
                            size="lg"
                            className="m-1"
                            onClick={() => {
                              getIsDeleteModalOpen(true);
                              getIdForDeletion(doc.id);
                            }}
                          >
                            <AiOutlineDelete />
                          </Button>
                        </OverlayTrigger>
                      ))}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        <style jsx global>{`
          .nav-tabs .nav-link:hover,
          .nav-tabs .nav-link:focus {
            color: var(--main-color);
          }
          .nav-link {
            color: var(--rich-black);
          }
          .nav-tabs .nav-link.active,
          .nav-tabs .nav-item.show .nav-link {
            color: var(--rich-black);
          }
        `}</style>
        </Tab>
      </Tabs>
    </>
  );
};

export default CarsList;
