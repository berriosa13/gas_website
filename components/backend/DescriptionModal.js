import React from "react";
import { Modal, Form } from "react-bootstrap";
import GradBar from "../GradBar"
import Image from 'next/image';

    const DescriptionModal = ({ setOpenDescriptionModal, setCarData }) => {

      return (
        <Modal
          centered
          scrollable
          size="lg"
          show={setOpenDescriptionModal}
          onHide={() => {
            setOpenDescriptionModal(false);
          }}
        >
          <Modal.Header className="d-flex justify-content-center" closeButton>
            <Image
              className=""
              src="/imgs/GAS-Icon-Only-2-Color.png"
              width={123}
              height={77}
              alt="GasLogoIcon"
            />
            <Modal.Title className="m-5">
              Description For {setCarData.year} {setCarData.make} {setCarData.model}
            </Modal.Title>
          </Modal.Header>
          <GradBar/>
          <Modal.Body>
            <div className="d-flex justify-content-center align-items-center flex-column">
            <Form.Group className="mb-3" controlId="formCarDescription">
                <Form.Control
                  as="textarea"
                  placeholder="Vehicle Description"
                  value={setCarData.description}
                  disabled
                  style={{ width: "700px", height: '500px' }}
                />
            </Form.Group>
            </div>
          </Modal.Body>
          <GradBar/>
          <Modal.Footer className="d-flex justify-content-center">
            <Image
              className=""
              src="/imgs/GAS-Logo-text.png"
              alt="GasLogoTextOnly"
              width={216}
              height={56}
            />
          </Modal.Footer>
          <style jsx global>{`
            .modal-title {
              font-weight: bold;
            }
            .card {
              border: none;
            }
          `}</style>
        </Modal>
      );
      }
export default DescriptionModal;