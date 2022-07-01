import React from "react";
import { Card, Modal, Row, Col, ListGroup, Container } from "react-bootstrap";
import GradBar from "../GradBar";
import Image from "next/image";
import AvailabilityForm from "../forms/AvailabilityForm"

const AvailabilityModal = ({ handleClose, show, setCar }) => {

    return (
      <>
      <Modal
        scrollable
        size="lg"
        backdrop="static"
        show={show}
        onHide={handleClose}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Availibility</Modal.Title>
        </Modal.Header>
        <GradBar />
        <Modal.Body>
          <Row className="m-3">
            <Col>
              <Card>
                  <Card.Title><h5 className="text-center my-2">Interested Vehicle</h5></Card.Title>
                <Card.Img variant="top" src={setCar.thumbnailImage} />
              </Card>
            </Col>
            <Col>
              <ListGroup variant="flush" className="my-3">
                <ListGroup.Item>
                  Vehicle:{" "}
                  <strong>
                    {setCar.year} {setCar.make} {setCar.model}
                  </strong>
                </ListGroup.Item>
                <ListGroup.Item>
                  Vin# <strong>{setCar.vin}</strong>
                </ListGroup.Item>
                <ListGroup.Item>
                  Mileage:{" "}
                  <strong>
                    {setCar.mileage
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </strong>
                </ListGroup.Item>
                <ListGroup.Item>
                  Price:{" "}
                  <strong>
                    $
                    {setCar.price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </strong>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row>
            <h5 className=" my-3">How should we reach you?</h5>
            <AvailabilityForm setCar={setCar}/>
          </Row>
        </Modal.Body>
        <GradBar />
        <Modal.Footer className="d-flex justify-content-center">
          <Image
            priority="true"
            src="/imgs/GAS-Text-Only-2-Color.png"
            height={56}
            width={216}
            alt="GasLogoTextOnly"
          />
        </Modal.Footer>
        <style jsx>{` 

          h5 {
            color: var(--main-color);
            font-weight: 600;
          }
          h5:hover {
            color: var(--secondary-color);
          }
        `}</style>
      </Modal>
    
    </>
    );
};

export default AvailabilityModal;

