import React, { useState } from "react";
import { Container, Navbar, Row, Col, Image, Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/router";
import CarListingCrud from "../components/backend/CarListingCrud";
import CarsList from "../components/backend/CarList";
import ImageModal from "../components/backend/ImageModal";
import DescriptionModal from "../components/backend/DescriptionModal";
import { NextSeo } from "next-seo";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function CarDashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [carId, setCarId] = useState("");
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [descriptionModalOpen, setDescriptionModalOpen] = useState(false);
  const [carIdForImages, setCarIdForImages] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const MySwal = withReactContent(Swal);

  const getCarIdHandler = (id) => {
    console.log("The carId of document to be edited: ", id);
    setCarId(id);
  };

  const getImageIdHandler = (id) => {
    console.log("The imageId of document to be edited: ", id);
    setImageId(id);
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
  };

  const getIndividualCarDataHandler = (carData) => {
    console.log("carData for image modal is :", carData);
    setCarIdForImages(carData);
  };

  const getIdForDeletionHandler = (id) => {
    console.log("Id for deletion is :", id);
    setDeleteId(id);
  };

  const handleLogout = () => {
    MySwal.fire({
      title: 'Are you sure you want to logout?',
      text: "Logging out will bring you back to the login page.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!'
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        router.push("/login");
        MySwal.fire({
          title: 'Logging out...',
          text: "Redirecting to login page.",
          icon: 'success',
          timer: 2000
        })
      }
    })

  };

  return (
    <>
      <NextSeo
        title="Guardian Automobile Sales | Admin Dashboard"
        description="Create, Edit, and Delete car listings"
        canonical="https://www.gasautomobilesales.com/"
        openGraph={{
          url: "https://www.gasautomobilesales.com/",
          title: "Guardian Automobile Sales | Admin Dashboard",
          description: "Create, Edit, and Delete car listing",
          images: [
            {
              url: "/imgs/GAS-Logo-text.png",
              width: 800,
              height: 600,
              alt: "Og GAS Text Logo",
              type: "image/png",
            },
          ],
          site_name: "gasautomobilesales",
        }}
      />
      <Navbar expand="md" bg="dark" variant="dark" className="header">
      <Container className="d-flex justify-content-between align-items-center">
        <Button onClick={handleLogout} size="lg">
          Logout
        </Button>
        <Navbar.Brand href="/carDashboard">
          <Image
            className="mr-3"
            src="/imgs/GAS-Logo.png"
            alt="Gas-Logo"
            width={421}
            height={93}
          />
        </Navbar.Brand>
        <div></div> {/* Empty div to fill the space */}
      </Container>
    </Navbar>

      {imageModalOpen && (
        <ImageModal
          setOpenImageModal={setImageModalOpen}
          setIdForImages={setCarIdForImages}
          carData={carIdForImages}
        />
      )}

      {descriptionModalOpen && (
        <DescriptionModal
          setOpenDescriptionModal={setDescriptionModalOpen}
          setCarData={carIdForImages}
        />
      )}

      <Container className="w-80">
        <Row className="justify-content-center mx-3">
          <CarListingCrud carId={carId} setCarId={setCarId} deleteId={deleteId} setDeleteId={setDeleteId} />
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
  );
}

export default CarDashboard;
