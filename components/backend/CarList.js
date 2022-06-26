import React, { useEffect, useState } from "react";
import { Table, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import Image from 'next/image';
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { FaRegImages } from "react-icons/fa";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsArrowRightShort } from "react-icons/bs";


import {
  collection,
  onSnapshot,
} from "firebase/firestore";

import { db } from "../../firebaseConfig";

const CarsList = ({
  getCarId,
  getIsModalOpen,
  getIndividualCarData,
  getIsDeleteModalOpen,
  getIdForDeletion,
}) => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    // Realtime listening of db changes. Updates table as change are made
    const carUnsub = onSnapshot(
      collection(db, "Cars"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        setCars(list);
      },
      (error) => {
        console.log("Error getting snapshot data for Car collection ", error);
      }
    );

    return () => {
      carUnsub();
    };
  }, []);
  console.log("Cars: ", cars);

  // create new instance with createdAt field modified for viewing
  const newCars = cars.map((car) => ({
    id: car.id,
    createdAt: new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(car.createdAt),
    make: car.make,
    mileage: car.mileage,
    model: car.model,
    price: car.price,
    vin: car.vin,
    year: car.year,
    drivetrain: car.drivetrain,
    engine: car.engine,
    doors: car.doors,
    exteriorColor: car.exteriorColor,
    interiorColor: car.interiorColor,
    transmission: car.transmission,
    thumbnailImage: car.thumbnailImage,
    description: car.description,
  }));

  return (
    <>
      <>
        <ToastContainer draggable={false} transition={Zoom} autoClose={3000} />
      </>
     

        <Table variant="dark" responsive="lg" bordered hover size="sm" className="text-center">
          <thead>
            <tr>
              <th>#</th>
              <th>Make/Model</th>
              <th>Mileage</th>
              <th>Price</th>
              <th>Vin</th>
              <th>Year</th>
              <th>Misc</th>
              <th>Color</th>
              <th>Date Added</th>
              <th>Description</th>
              <th>Thumbnail</th>
              <th>View/Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {newCars.map((doc, index) => {
              return (
                <tr key={doc.id} className="text-center">
                  <td>{index + 1}</td>
                  <td>
                    <div className="d-flex justify-content-center align-items-center">
                      {doc.make} {doc.model}
                    </div>
                  </td>
                  <td className="">{doc.mileage}</td>
                  <td>${doc.price}</td>
                  <td>#{doc.vin}</td>
                  <td>{doc.year}</td>
                  <td>
                    Drivetrain <BsArrowRightShort/> {doc.drivetrain} <br />
                    Transmission <BsArrowRightShort/> {doc.transmission} <br />
                    Engine <BsArrowRightShort/> {doc.engine} <br />
                    Doors <BsArrowRightShort/> {doc.doors}
                  </td>
                  <td>
                    Interior <BsArrowRightShort/> {doc.interiorColor} <br /> Exterior <BsArrowRightShort/> {doc.exteriorColor}
                  </td>
                  <td>{doc.createdAt}</td>
                  <td>{doc.description}</td>
                  <td>
                    {doc.thumbnailImage != null ? (
                      <Image
                        src={doc.thumbnailImage}
                        className="mb-3"
                        width="100"
                        height="100"
                        alt="thumbnailImage"
                      />
                    ) : (
                      <p>Thumbnail not set</p>
                    )}
                  </td>
                  <td>
                  {['Display'].map((placement) => (
                      <OverlayTrigger
                        key={placement}
                        placement='top'
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
                        getIsModalOpen(true);
                        getIndividualCarData(doc);
                      }}
                    >
                      <FaRegImages />
                    </Button>
                      </OverlayTrigger>
                  ))}

                  {['Edit'].map((placement) => (
                      <OverlayTrigger
                        key={placement}
                        placement='top'
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

                  {['Delete'].map((placement) => (
                      <OverlayTrigger
                        key={placement}
                        placement='top'
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
      
    </>
  );
};

export default CarsList;
