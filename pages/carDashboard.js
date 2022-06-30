import React, { useState } from "react";
import { Container, Navbar, Row, Col, Image, Button } from "react-bootstrap";
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';
import AddDocument from "../components/backend/AddDocument";
import CarsList from "../components/backend/CarList";
import ImageModal from "../components/backend/ImageModal";
import DeleteModal from "../components/backend/DeleteModal";
import DescriptionModal from "../components/backend/DescriptionModal";

function CarDashboard() {

    const { user, logout } = useAuth();
    const router = useRouter();
    const [carId, setCarId] = useState("");
    const [imageModalOpen, setImageModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [descriptionModalOpen, setDescriptionModalOpen] = useState(false);
    const [carIdForImages, setCarIdForImages] = useState("");
    const [deleteId, setDeleteId] = useState("");
    
    const getCarIdHandler = (id) => {
    console.log("The carId of document to be edited: ", id);
    setCarId(id);
  };

  const getImageIdHandler = (id) => {
    console.log("The imageId of document to be edited: ", id);
    // setImageId(id);
  };

  const getImageModalOpenHandler = (isImageModalOpen) => {
    console.log("Image Modal is set to :", isImageModalOpen);
    setImageModalOpen(isImageModalOpen);
  };

  const getDeleteModalOpenHandler = (isDeleteModalOpen) => {
    console.log("Delete Modal is set to :", isDeleteModalOpen);
    setDeleteModalOpen(isDeleteModalOpen);
  };

  const getDescriptionModalOpenHandler = (IsDescriptionModalOpen) => {
    console.log("Description Modal is set to :", IsDescriptionModalOpen);
    setDescriptionModalOpen(IsDescriptionModalOpen);
  }

  const getIndividualCarDataHandler = (carData) => {
    console.log("carData for image modal is :", carData);
    setCarIdForImages(carData);
  };

  const getIdForDeletionHandler = (id) => {
    console.log("Id for deletion is :", id);
    setDeleteId(id);
  }

  return (
    <>
        <Navbar expand="md" bg="dark" variant="dark" className="header d-flex justify-content-center">
            <Navbar.Brand href="/carDashboard">
              <Image
                className="mr-3"
                src="/imgs/GAS-Full-Logo-2-Color.png"
                alt="Gas-Logo" 
                width={421} 
                height={93}
              />
            </Navbar.Brand>
            <Button onClick={() => {
                logout()
                router.push('/login')
              }}
              size="lg"
              >
            Logout
          </Button>
        </Navbar>
    

        {imageModalOpen && <ImageModal setOpenImageModal={setImageModalOpen} setIdForImages={setCarIdForImages} carData={carIdForImages}/>}
        {deleteModalOpen && <DeleteModal setOpenDeleteModal={setDeleteModalOpen} getDeleteId={deleteId} />}
        {descriptionModalOpen && <DescriptionModal setOpenDescriptionModal={setDescriptionModalOpen} setCarData={carIdForImages} />}{deleteModalOpen && <DeleteModal setOpenDeleteModal={setDeleteModalOpen} getDeleteId={deleteId} />}


        <Container className="w-80">
          <Row className="justify-content-center mx-3">
              <AddDocument carId={carId} setCarId={setCarId}/>
          </Row>
        </Container>
        <Container fluid>
          <Row className="justify-content-center mx-3">
            <Col>
              <CarsList 
              getCarId={getCarIdHandler} 
              getImageId={getImageIdHandler}
              getIsImageModalOpen={getImageModalOpenHandler}
              getIndividualCarData={getIndividualCarDataHandler}
              getIsDeleteModalOpen={getDeleteModalOpenHandler}
              getIdForDeletion={getIdForDeletionHandler}
              getIsDescriptionModalOpen={getDescriptionModalOpenHandler}
              />
            </Col>
          </Row>
        </Container>

    </>
  )
}

export default CarDashboard; 
