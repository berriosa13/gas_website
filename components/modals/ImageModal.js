import React, { useEffect, useState } from "react";
import { Table, Button, Card, Modal } from "react-bootstrap";
import Image from "next/image";
import GradBar from "../GradBar"

const ImageModal = ({ handleClose, show, setImages, setCar }) => {

    return (
      <>
        <Modal scrollable size="lg" className="" show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Used {setCar.year} {setCar.make} {setCar.model} - {setCar.price}</Modal.Title>
          </Modal.Header>
            <GradBar/>
          <Modal.Body>
            {setImages.map((image) => {
              return (
                <Image
                  key={image.id}
                  layout="responsive"
                  src={image.imageUrl}
                  alt="all images"
                  width={300}
                  height={200}
                />
              );
            })}
          </Modal.Body>
          <GradBar/>
          <Modal.Footer className="d-flex justify-content-center"><Image className="" src="/imgs/GAS-Logo-text.png" height={56} width={216} alt="GasLogoTextOnly"/></Modal.Footer>
        </Modal>
        <style jsx global>{`
            .modal-body img {
              box-shadow: 0px 0px 5px 3px rgba(0,0,0,0.75);
              -webkit-box-shadow: 0px 0px 5px 3px rgba(0,0,0,0.75);
              -moz-box-shadow: 0px 0px 5px 3px rgba(0,0,0,0.75); 
            }
            .modal-body {
              
            }
            .modal-title {
              font-weight: bold;
            }
            
        `}</style>
      </>
    );
};

export default ImageModal;

