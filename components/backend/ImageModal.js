import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button, Card, Modal, Row, Container } from "react-bootstrap";
import {
  AiOutlineDelete,
  AiOutlineStar,
  AiOutlineFileImage,
} from "react-icons/ai";
import GradBar from "../GradBar";

import {
  collection,
  onSnapshot,
  where,
  query,
  getDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";

import { getStorage, ref, deleteObject } from "firebase/storage";
import ImageDataService from "../../services/images.services";
import CarDataService from "../../services/cars.services";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const ImageModal = ({ setOpenImageModal, setIdForImages, carData }) => {
  const [images, setImages] = useState([]);
  const [currentCar, setCurrentCar] = useState([]);
  const storage = getStorage();
  const carId = carData.id;
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    // Realtime listening of db changes. Updates table as change are made
    console.log("carId being passed into query: ", carId);
    const q = query(
      collection(db, "Image"),
      where("imageForeignId", "==", carId)
    );

    const imageUnsubscribe = onSnapshot(q, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      console.log("imageList: ", list);
      setImages(list);
    });

    const carUnsubscribe = async () => {
      const carDocRef = doc(db, "Cars", carId);
      const list = [];
      const carDocSnap = await getDoc(carDocRef);
      list.push({ id: carDocSnap.id, ...carDocSnap.data() });
      console.log("current car listing: ", list);
      setCurrentCar(list);
    };

    return () => {
      imageUnsubscribe();
      carUnsubscribe();
    };
  }, [carId]);

  // Function to delete a single image from firebase storage & database
  const deleteImage = async (imageId, imageStorageName, imageUrl) => {
    try {
      const storageRef = ref(storage, `images/${imageStorageName}`);
      // Check if imageUrl matches thumbnailImage url
      const thumbnailImage = currentCar?.[0]?.thumbnailImage;
      if (thumbnailImage === imageUrl) {
        // Delete thumbnailImage from carDoc
        await CarDataService.deleteThumbnailImageField(carData.id);
      }
      // Delete image from storage
      deleteObject(storageRef).then(async () => {
        // Now delete from image collection
        await ImageDataService.deleteImage(imageId);
      });
      MySwal.fire({
        title: "Image deleted👍",
        icon: "success",
        timer: 3000,
        position: "top-end",
        showConfirmButton: false,
        timerProgressBar: true,
      });
      console.log("Deleted image: " + imageUrl);
    } catch (e) {
      console.log("Error attempting to delete image: " + e);
      MySwal.fire({
        title: "Error attempting to delete image.",
        icon: "error",
        timer: 3000,
      });
    }
  };

  const setThumbnailImage = async (imageUrl, carId) => {
    // close modal
    setOpenImageModal(false);
    try {
      await CarDataService.setThumbnailImage(carId, imageUrl);
      MySwal.fire({
        title: "Thumbnail set👍",
        position: "top-end",
        showConfirmButton: false,
        icon: "success",
        timer: 3000,
        timerProgressBar: true,
      });
    } catch (err) {
      console.log("Error setting new thumbnailImage ", err);
      MySwal.fire({
        title: "Error setting new thumbnail image",
        position: "top-end",
        icon: "error",
        timer: 2000,
      });
    }
  };

  return (
    <>
      <Modal
        centered
        scrollable
        size="lg"
        show={setOpenImageModal}
        onHide={() => {
          setOpenImageModal(false);
          setIdForImages("");
        }}
      >
        <Modal.Header closeButton>
          {" "}
          <Image
            src="/imgs/GAS-Icon-Only-2-Color.png"
            height={93}
            width={148}
            alt="GasLogo"
          />
          <Modal.Title>
            <div className="mx-5">
              Images for {carData.make} {carData.model} {carData.year}
            </div>
          </Modal.Title>
        </Modal.Header>
        <GradBar />
        <Modal.Body className="show-grid">
          <Container>
            <Row>
              {images.map((image) => {
                return (
                  <Card key={image.id}>
                    <Card.Img
                      variant="top"
                      src={image.imageUrl}
                      alt="listing images"
                    />
                    <Card.Body>
                      <Button
                        variant="outline-primary"
                        href={image.imageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View In Browser <AiOutlineFileImage />
                      </Button>

                      <Button
                        className="ms-3"
                        variant="outline-warning"
                        onClick={(e) => {
                          setThumbnailImage(image.imageUrl, carId);
                        }}
                      >
                        Set thumbnail <AiOutlineStar />
                      </Button>

                      <Button
                        className="ms-3"
                        variant="outline-danger"
                        onClick={() =>
                          deleteImage(
                            image.id,
                            image.imageStorageName,
                            image.imageUrl
                          )
                        }
                      >
                        Delete Image <AiOutlineDelete />
                      </Button>

                      <style jsx global>{`
                        .card-body {
                          display: flex;
                          justify-content: space-between;
                          align-items: center;
                        }
                        .card-img-top {
                          box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.75);
                          -webkit-box-shadow: 0px 0px 5px 3px
                            rgba(0, 0, 0, 0.75);
                          -moz-box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.75);
                        }
                        .modal-title {
                          font-weight: bold;
                        }
                        .card {
                          border: none;
                        }
                      `}</style>
                    </Card.Body>
                  </Card>
                );
              })}
            </Row>
          </Container>
        </Modal.Body>
        <GradBar />
        <Modal.Footer className="d-flex flex-column justify-content-center">
          <Image
            className=""
            src="/imgs/GAS-Logo-text.png"
            height={56}
            width={216}
            alt="GasLogoTextOnly"
          />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ImageModal;
