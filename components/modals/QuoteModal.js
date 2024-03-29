import React from "react";
import { Card, Modal, Row, Col, ListGroup } from "react-bootstrap";
import GradBar from "../GradBar";
import Image from "next/image";
import  QuoteForm  from "../forms/QuoteForm"

const QuoteModal = ({ handleClose, show, setCar }) => {

  return (
    <>
      <Modal
        scrollable
        size="lg"
        backdrop="static"
        className=""
        show={show}
        onHide={handleClose}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Request A Quote</Modal.Title>
        </Modal.Header>
        <GradBar />
        <Modal.Body>
          <Row className="mb-3">
            <Col className="">
              <Card>
                  <Card.Title><h5 className="text-center my-2">Interested Vehicle</h5></Card.Title>
                <Card.Img variant="top" src={setCar.thumbnailImage} />
              </Card>
            </Col>
            <Col>
              <ListGroup variant="flush" className="my-3">
              <ListGroup.Item>
                  Type:{" "}
                  <strong>
                    Pre-Owned Vehicle
                  </strong>
                </ListGroup.Item>
                <ListGroup.Item>
                  Vehicle:{" "}
                  <strong>
                    {setCar.year} {setCar.make} {setCar.model}   {setCar.trim}
                  </strong>
                </ListGroup.Item>
                <ListGroup.Item>
                  Mileage:{" "}
                  <strong>
                    {setCar.mileage}
                  </strong>
                </ListGroup.Item>
                <ListGroup.Item>
                  Price:{" "}
                  <strong>
                    {setCar.price}
                  </strong>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row>
            <h5 className=" my-3">How should we reach you?</h5>
            <QuoteForm setCar={setCar} />
          </Row>
        </Modal.Body>
        <GradBar />
        <Modal.Footer className="d-flex justify-content-center">
          <Image
            className=""
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

export default QuoteModal;


