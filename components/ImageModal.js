import React, { useEffect, useState } from "react";
import { Table, Button, Card, Modal } from "react-bootstrap";
import Image from "next/image";

const ImageModal = ({ handleClose, show, setImages, setCar }) => {

    return (
      <>
        <Modal scrollable size="lg" className="" show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Used {setCar.year} {setCar.make} {setCar.model} - ${setCar.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Modal.Title>
          </Modal.Header>
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
          <Modal.Footer>
          </Modal.Footer>
        </Modal>
        <style jsx global>{`
            .modal-body span img {
              -webkit-box-shadow: 5px 5px 15px 5px #333 !important; 
              box-shadow: 5px 5px 15px 5px #333 !important; 
            }
            .modal-footer {
              justify-content: center;
            }  
            
        `}</style>
      </>
    );
};

export default ImageModal;

