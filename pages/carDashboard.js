import React, { useState } from "react";
import { Container, Navbar, Row, Col, Image, Button } from "react-bootstrap";
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';
import AddDocument from "../components/backend/AddDocument";
import CarsList from "../components/backend/CarList";
import ImageModal from "../components/backend/ImageModal";
import DeleteModal from "../components/backend/DeleteModal";

function CarDashboard() {

    const { user, logout } = useAuth();
    const router = useRouter();
    const [carId, setCarId] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
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

  const getModalOpenHandler = (isModalOpen) => {
    console.log("Modal is set to :", isModalOpen);
    // console.log("carId is set to :", id);
    setModalOpen(isModalOpen);
  };

  const getDeleteModalOpenHandler = (isDeleteModalOpen) => {
    console.log("Delete Modal is set to :", isDeleteModalOpen);
    // console.log("carId is set to :", id);
    setDeleteModalOpen(isDeleteModalOpen);
  };

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
    

        {modalOpen && <ImageModal setOpenModal={setModalOpen} setIdForImages={setCarIdForImages} carData={carIdForImages}/>}

        {deleteModalOpen && <DeleteModal setOpenDeleteModal={setDeleteModalOpen} getDeleteId={deleteId} />}
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
              getIsModalOpen={getModalOpenHandler}
              getIndividualCarData={getIndividualCarDataHandler}
              getIsDeleteModalOpen={getDeleteModalOpenHandler}
              getIdForDeletion={getIdForDeletionHandler}
              />
            </Col>
          </Row>
        </Container>

    </>
  )
}

export default CarDashboard; 
