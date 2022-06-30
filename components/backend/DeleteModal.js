import React from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageDataService from "../../services/images.services";
import CarDataService from "../../services/cars.services";
import { FiTrash2 } from "react-icons/fi"; 
import Image from 'next/image';
import GradBar from "../GradBar"

    const DeleteModal = ({ setOpenDeleteModal, getDeleteId }) => {

      const deleteHandler = async (id) => { 
        console.log("id passed into deleteHandler: ", id);
        let isSuccessful = true;
        // First delete image files from storage
        try {
          await ImageDataService.deleteImageStorageById(id);
          toast.success("Images successfully removed from storage");
        } catch(e) {
           toast.error("Error attempting to remove images from storage", e);
           isSuccessful = false; 
        }
        // Second, delete imageDoc(s) from collection that contain carDocId
        try {
          await ImageDataService.deleteImageDocs(id);
          toast.success("imageDoc(s) successfully removed from collection");
        } catch(e) {
          toast.error("Error attempting to remove imageDoc from collection", e);
          isSuccessful = false;
        }
        // Finally, delete carDoc from collection
        try {
          await CarDataService.deleteCar(id);  
          toast.success("carDoc successfully removed from collection");
        } catch(e) {
          toast.error("Error attempting to remove carDoc from collection", e);
          isSuccessful = false;
        }
        if(isSuccessful) {
          toast.success("Successfully deleted listing");
        }
      };
      
      return (
        <Modal
          centered
          scrollable
          size="lg"
          show={setOpenDeleteModal}
          onHide={() => {
            setOpenDeleteModal(false);
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
              {" "}
              Delete Listing Confirmation <FiTrash2 />
            </Modal.Title>
          </Modal.Header>
            <GradBar/>
          <Modal.Body>
            <div className="d-flex justify-content-center align-items-center flex-column">
              <h1>Are you sure?</h1>
              <p> All data will be permenantly deleted for this listing...</p>
              <div className="d-flex justify-content-center align-items-center">
                <Button
                  variant="outline-primary"
                  className="m-3"
                  size="lg"
                  onClick={(e) => setOpenDeleteModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="outline-primary"
                  className="m-3"
                  size="lg"
                  onClick={() => {
                    setOpenDeleteModal(false);
                    deleteHandler(getDeleteId);
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          </Modal.Body>
          <GradBar/>
          <Modal.Footer className="d-flex justify-content-center">
            <Image
              className=""
              src="/imgs/GAS-Text-Only-2-Color.png"
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
export default DeleteModal;