import React, { useEffect, useState } from "react";
// import GasLogo from '../../public/imgs/GAS-Icon-Only-2-Color.png';
// import GasTextLogo from "../../public/imgs/GAS-Text-Only-2-Color.png";
import Image from 'next/image';
import {
  Button,
  Card,
  Modal,
  Row,
  Container,
} from "react-bootstrap";
// import "./ImageModal.css";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineDelete, AiOutlineStar, AiOutlineFileImage } from "react-icons/ai";

import {
  collection,
  onSnapshot,
  where,
  query,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";

import { getStorage, ref, deleteObject } from "firebase/storage";
import ImageDataService from "../../services/images.services";
import CarDataService from "../../services/cars.services";

const ImageModal = ({ setOpenModal, setIdForImages, carData }) => {
  const [images, setImages] = useState([]);
  const storage = getStorage();
  const carId = carData.id;

  useEffect(() => {
    // Realtime listening of db changes. Updates table as change are made
    console.log("carId being passed into query: ", carId);
    const q = query(
      collection(db, "Image"),
      where("imageForeignId", "==", carId)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setImages(list);
    });

    return () => {
      unsubscribe();
    };
  }, [carId]);

  const deleteImage = (imageId, imageStorageName) => {
    console.log("Deleting imageDoc for ID: ", imageId);
    const storageRef = ref(storage, `images/${imageStorageName}`);
    // Delete the file
    deleteObject(storageRef)
      .then(() => {
        // Image file successfully deleted from storage, now delete from image collection
        console.log(
          "Image successfully deleted from firebase storage, now deleting from collection"
        );
        ImageDataService.deleteImage(imageId);
      })
      .catch((error) => {
        console.log("Error deleting image in deleteImage method ", error);
      });
    toast.success("Image deleted successfully");
  };

  const setFavoriteImage = async (imageUrl, carId) => {
    console.log("Setting new favorite image with a url of: ", imageUrl);
    console.log("Passing in carId: ", carId);
    await CarDataService.setFavoriteImage(carId, imageUrl);
    toast.success("Favorite image set. Image is now being used as a thumbnail");
  };

  return (
    <>
      <ToastContainer draggable={false} transition={Zoom} autoClose={3000} />

      <Modal
        centered
        scrollable
        size="lg"
        show={setOpenModal}
        onHide={() => {
          setOpenModal(false);
          setIdForImages("");
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title> <Image src="/imgs/GAS-Icon-Only-2-Color.png" height={93} width={148}/>Images for {carData.make} {carData.model} {carData.year}</Modal.Title>
        </Modal.Header>
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
                        View In Browser <AiOutlineFileImage/>
                      </Button>

                      <Button
                        variant="outline-warning"
                        onClick={(e) => {
                          setFavoriteImage(image.imageUrl, carId);
                        }}
                      >
                        Set thumbnail <AiOutlineStar/>
                      </Button>

                      <Button
                        variant="outline-danger"
                        className="delete"
                        onClick={(e) =>
                          deleteImage(image.id, image.imageStorageName)
                        }
                      >
                        Delete Image <AiOutlineDelete/>
                      </Button>

                      <style jsx global>{`
                        .card-body {
                          display: flex;
                          justify-content: space-between;
                          align-items: center;
                        }
                        .card-img-top {
                          -webkit-box-shadow: 5px 5px 15px 5px #333 !important; 
                          box-shadow: 5px 5px 15px 5px #333 !important; 
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
        <Modal.Footer className="d-flex justify-content-center"><Image className="" src="/imgs/GAS-Text-Only-2-Color.png" height={56} width={216}/></Modal.Footer>
      </Modal>
    </>
  );
};

export default ImageModal;