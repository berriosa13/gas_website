import React, { useEffect, useState } from "react";
import Image from 'next/image';
import {
  Button,
  Card,
  Modal,
  Row,
  Container,
} from "react-bootstrap";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineDelete, AiOutlineStar, AiOutlineFileImage } from "react-icons/ai";

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

const ImageModal = ({ setOpenModal, setIdForImages, carData }) => {
  const [images, setImages] = useState([]);
  const [currentCar, setCurrentCar] = useState([]);
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

  useEffect(() => {
    // Listen for this doc's changes
    console.log("carId being passed into doc listener: ", carId);
    const carDocRef = doc(db, "Cars", carId);
    const list = [];
    const unsubscribe = async () => {
      const carDocSnap = await getDoc(carDocRef);
      list.push({ id: carDocSnap.id, ...carDocSnap.data() });
      setCurrentCar(list);
    };
    return () => {
      unsubscribe();
    };
  }, [carId]);

  const deleteImage = async (imageId, imageStorageName, imageUrl) => {
    const storageRef = ref(storage, `images/${imageStorageName}`);  
    // Check if imageUrl matches thumbnailImage url
      if(currentCar[0].thumbnailImage === imageUrl) {
        // Delete thumbnailImage from carDoc
        try {
          await CarDataService.deleteThumbnailImageField(carData.id);
        } catch(err) {
          console.log("Error removing thumbnailImage from carDoc ", err);
          toast.error("Error removing thumbnailImage from carDoc");
        }
      }
    // Delete the file
    deleteObject(storageRef)
    .then( async () => {
      // Image file successfully deleted from storage, now delete from image collection
      console.log(
        "Image successfully deleted from firebase storage, now deleting from collection"
        );
        await ImageDataService.deleteImage(imageId);
      })
      .catch((error) => {
        console.log("Error deleting image in deleteImage method ", error);
        toast.error("Error deleting image from database");
      });
    toast.success("Image deleted successfully");
  };

  const setThumbnailImage = async (imageUrl, carId) => {
    // close modal
    setOpenModal(false);
    try {
      await CarDataService.setThumbnailImage(carId, imageUrl);
    } catch(err) {
      console.log("Error setting new thumbnailImage ", err);
      toast.error("Error setting new thumbnailImage");
    }
    toast.success("Image is now being used as a thumbnail");
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
          <Modal.Title> <Image src="/imgs/GAS-Icon-Only-2-Color.png" height={93} width={148} alt="GasLogo"/>Images for {carData.make} {carData.model} {carData.year}</Modal.Title>
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
                        className="ms-3"
                        variant="outline-warning"
                        onClick={(e) => {
                          setThumbnailImage(image.imageUrl, carId);
                        }}
                      >
                        Set thumbnail <AiOutlineStar/>
                      </Button>

                      <Button
                        className="ms-3"
                        variant="outline-danger"
                        onClick={(e) =>
                          deleteImage(image.id, image.imageStorageName, image.imageUrl)
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
        <Modal.Footer className="d-flex justify-content-center"><Image className="" src="/imgs/GAS-Text-Only-2-Color.png" height={56} width={216} alt="GasLogoTextOnly"/></Modal.Footer>
      </Modal>
    </>
  );
};

export default ImageModal;
