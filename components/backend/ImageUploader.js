import React, { useState, useRef } from "react";
import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Button, Form, Row } from "react-bootstrap";
import GradBar from "../GradBar";
import { FiTrash2 } from "react-icons/fi"; 

const ImageUploader = ({ onImagesSelected, onImagesSubmitted }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const fileInputRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleImageChange = (e) => {
    const files = e.target.files;
    const filesArray = Array.from(files);

    // Create an array of image preview URLs
    const imagePreviews = filesArray.map((file) => URL.createObjectURL(file));

    setSelectedFiles(filesArray);
    setPreviewImages(imagePreviews);

    // Reset file input value to reflect removed files
    fileInputRef.current.value = null;

    onImagesSelected(filesArray);
  };

  const handleImageRemove = (index) => {
    // Remove an image from the selected files and preview list
    const updatedFiles = [...selectedFiles];
    const updatedPreviews = [...previewImages];

    updatedFiles.splice(index, 1);
    updatedPreviews.splice(index, 1);

    setSelectedFiles(updatedFiles);
    onImagesSelected(updatedFiles);
    setPreviewImages(updatedPreviews);

    // Move back to the previous slide in the carousel
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    } else if (currentSlide === 0 && previewImages.length > 0) {
      setCurrentSlide(previewImages.length - 1);
    }
  };

  const handleRemoveAllImages = () => {
    // Clear the selected files and preview list
    setSelectedFiles([]);
    setPreviewImages([]);
    onImagesSelected([]);
    setCurrentSlide(0);
  };
  
  // Check if images were submitted by parent and clear them out if they were
  if (onImagesSubmitted) {
    handleRemoveAllImages();
  }

  return (
    <div>
      {previewImages.length == 0 && (
        <Form.Group controlId="formFileMultiple" className="mb-3">
          <Form.Label>
            <strong>Upload Image(s)</strong>
          </Form.Label>
          <Form.Control
            type="file"
            multiple
            onChange={handleImageChange}
            ref={fileInputRef}
            accept="image/*"
          />
        </Form.Group>
      )}
      {previewImages.length > 0 && (
        <div className="mt-3">
        <div className='d-flex flex-column justify-content-center'>
          <h3 className='text-center mt-3'>
          Image Preview:
            <GradBar/>
          </h3>
          <p className='fst-italic'>NOTE: The images you see below will be the ones uploaded. Images can be removed as needed from the preview screen. </p>
        </div>
          <Carousel
            className="carousel"
            selectedItem={currentSlide} // Set the current slide
            onSelectItem={(index) => setCurrentSlide(index)}
            showArrows={true}
            showThumbs={false}
          >
            {previewImages.map((image, index) => (
              <div key={index}>
                <div className="image-container">
                  <Image
                    className="img"
                    src={image}
                    alt={`Image ${index}`}
                    width={1200} // set the appropriate width
                    height={800} // set the appropriate height
                    layout="responsive"
                    objectFit="cover"
                  />
                  <p className="legend">
                    <Button
                    onClick={() => {
                      handleImageRemove(index);
                    }}
                    >
                      <FiTrash2/>
                    </Button>
                  </p>
                </div>
              </div>
            ))}
          </Carousel>
        <Row className="d-flex justify-content-center">
          <Button className="m-3 w-25" onClick={() => handleRemoveAllImages()}>
            Remove All
          </Button>
        </Row>
        </div>
      )}
      <style jsx global>{`
        .carousel {
          // box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.75);
          // -webkit-box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.75);
          // -moz-box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.75);
          // background-color: gray;
        }
        .legend {
          background: transparent !important;
        }
      `}</style>
    </div>
  );
};

export default ImageUploader;
