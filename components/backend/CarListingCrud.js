import React, { useState, useEffect, useCallback } from "react";
import { Form, Button, Row, Col, FloatingLabel } from "react-bootstrap";
import Select from "react-select";
import NumberFormat from "react-number-format";
import CarDataService from "../../services/cars.services";
import ImageDataService from "../../services/images.services";
import SelectOptionsService from "../../services/options.services";
import GradBar from "../GradBar";
import ImageUploader from "./ImageUploader";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const CarListingCrud = ({ carId, setCarId, deleteId, setDeleteId }) => {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [mileage, setMileage] = useState("");
  const [price, setPrice] = useState("");
  const [vin, setVin] = useState("");
  const [drivetrain, setDrivetrain] = useState("");
  const [transmission, setTransmission] = useState("");
  const [engine, setEngine] = useState("");
  const [doors, setDoors] = useState("");
  const [trim, setTrim] = useState("");
  const [interiorColor, setInteriorColor] = useState("");
  const [exteriorColor, setExteriorColor] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [sold, setSold] = useState("");
  const uploadedUrls = [];
  const imageInputRef = React.useRef();
  const descriptionInputRef = React.useRef();
  const [imageForeignId, setImageForeignId] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageStorageName, setImageStorageName] = useState([]);
  const [featuredListing, setFeaturedListing] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagesSubmittedForUpload, setImagesSubmittedForUpload] =
    useState(false);
  const [showImageUploader, setShowImageUploader] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [carMakeOptions, setCarMakeOptions] = useState(
    SelectOptionsService.getCarMakeOptions
  );
  const carYearOptions = SelectOptionsService.getCarYearOptions();
  const carDrivetrainOptions = SelectOptionsService.getCarDrivetrainOptions();
  const carTransmissionOptions =
    SelectOptionsService.getCarTransmissionOptions();
  const carEngineOptions = SelectOptionsService.getCarEngineOptions();
  const carDoorOptions = SelectOptionsService.getCarDoorOptions();
  const carColorsOptions = SelectOptionsService.getCarColorOptions();
  const featuredListingOptions =
    SelectOptionsService.getFeaturedListingOptions();
  const soldListingOptions = SelectOptionsService.getSoldListingOptions();

  const MySwal = withReactContent(Swal);

  const handleSubmit = async (e) => {
    // Stop form from automatically submitting
    e.preventDefault();
    // Make user confirm submission prior to any further processing
    const result = await MySwal.fire({
      title: "Are you sure you want to submit this listing?",
      text: "Please review and confirm the details of your car listing before submission.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, submit",
    });

    if (result.isConfirmed) {
      const swalLoading = MySwal.fire({
        title: "Submitting Listing...",
        icon: "info",
        allowOutsideClick: false,
        showCancelButton: false,
        showConfirmButton: false,
        didOpen: async () => {
          MySwal.showLoading();
          await processSubmit();
          swalLoading.close();
        },
      });
    }
  };

  const hasAllFieldsBeenFilled = () => {
    const variablesToCheck = [
      make,
      model,
      mileage,
      price,
      vin,
      year,
      drivetrain,
      transmission,
      engine,
      doors,
      trim,
      interiorColor,
      exteriorColor,
      description,
      featuredListing,
      sold,
    ];

    console.log('fields to check prior to submission: \n'+
      variablesToCheck.map((variable) => `${variable}: ${variable}`)
    );
  
    return variablesToCheck.every((variable) => variable !== "");
  };

  const hasNoFieldsBeenFilled = () => {
    const variablesToCheck = [
      make,
      model,
      mileage,
      price,
      vin,
      year,
      drivetrain,
      transmission,
      engine,
      doors,
      trim,
      interiorColor,
      exteriorColor,
      description,
      featuredListing,
      sold,
    ];
  
    console.log(
      'Fields to check prior to submission: \n' +
      variablesToCheck.map((variable) => `${variable}: ${variable}`)
    );
  
    return variablesToCheck.every((variable) => variable === "");
  };
  
  const processSubmit = async () => {
    if (!hasAllFieldsBeenFilled()) {
      MySwal.fire({
        title: "All fields must be filled out!",
        position: "top-end",
        showConfirmButton: false,
        icon: "error",
        timer: 3000,
      });
      return;
    }
    setFormSubmitted(true);
    try {
      console.log("selectedImages: " + selectedImages);
      if (selectedImages != null && selectedImages.length > 0) {
        setImagesSubmittedForUpload(true);
        uploadedUrls = await handleUpload(selectedImages);
        console.log("uploadedUrls: " + uploadedUrls);
      }
    } catch (error) {
      console.log("Error while attempting to upload images");
      toast.error("Error while attempting to upload images");
    }

    const newCar = {
      make,
      model,
      trim,
      mileage,
      price,
      vin,
      year,
      drivetrain,
      transmission,
      engine,
      doors,
      sold,
      interiorColor,
      exteriorColor,
      description,
      featuredListing,
    };

    const newImage = { imageForeignId, imageStorageName, imageUrl };
    console.log("isUpdatingExistingListing: " + isUpdatingExistingListing);
    const isUpdatingExistingListing = carId != undefined && carId != "";
    // const isUpdatingExistingListing = carId != undefined || carId != "";
    const hasUploadedUrls = uploadedUrls !== null && uploadedUrls.length > 0;

    try {
      if (isUpdatingExistingListing) {
        await CarDataService.updateCar(carId, newCar);
        console.log("update car logic: uploadedUrls: " + uploadedUrls);
        if (hasUploadedUrls) {
          // User has images selected & uploaded, create doc's for them in database.
          sendImageDocToCollection(carId, newImage, uploadedUrls);
          console.log(
            "sendImageDocToCollection for carId: {}, image: {}",
            carId,
            newImage
          );
        }
      } else {
        const newCarDocRef = await CarDataService.addCars(newCar);
        console.log("newCarDocRef: " + newCarDocRef);
        // Check if images were uploaded
        console.log("add car logic: uploadedUrls: " + uploadedUrls);
        if (hasUploadedUrls) {
          // User has images selected & uploaded, create doc's for them in database.
          sendImageDocToCollection(newCarDocRef.id, newImage, uploadedUrls);
          console.log(
            "sendImageDocToCollection for newCarDocRef.id: {}, image: {}",
            newCarDocRef.id,
            newImage
          );
        }
      }
      MySwal.fire({
        title: "Listing has been updated.",
        position: "top-end",
        showConfirmButton: false,
        icon: "success",
        timer: 3000,
      });
    } catch (err) {
      console.log(
        "Experienced an error while submitting listing. Error: " + err
      );
      MySwal.fire({
        title: "Experienced an error while submitting listing.",
        position: "top-end",
        showConfirmButton: false,
        icon: "error",
        timer: 3000,
      });
    }
    clearAllFields(false);
  };

  const clearAllBtnValidation = () => {
    // Validate that user wants to delete all fields
    Swal.fire({
      title: "Are you sure you want to clear all fields?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, clear them!",
    }).then((result) => {
      if (result.isConfirmed) {
        clearAllFields(true);
      }
    });
  };

  const clearAllFields = (showAlert) => {
    // Inform user that no fields are filled in to clear
    if(hasNoFieldsBeenFilled()) {
      Swal.fire({
        title: "No fields to clear!",
        text: "All fields are already cleared.",
        icon: "info",
        timer: 3000,
      });
    } else {
      // Clear all fields
      setCarId("");
      setMake("");
      setModel("");
      setTrim("");
      setMileage("");
      setPrice("");
      setVin("");
      setYear("");
      setDrivetrain("");
      setTransmission("");
      setEngine("");
      setDoors("");
      setInteriorColor("");
      setExteriorColor("");
      setDescription("");
      setSold("");
      setSelectedImages("");
      uploadedUrls = [];
      setImageForeignId("");
      setImageStorageName("");
      setImageUrl("");
      setFeaturedListing("");
      setShowImageUploader(false);
      setFormSubmitted(false);
      setImagesSubmittedForUpload(false);
      descriptionInputRef.current.value = "";
      if(showAlert) {
        Swal.fire({
          title: "Cleared!",
          text: "All fields have been cleared.",
          icon: "success",
          timer: 2000,
        });
      }
    }
  };

  const sendImageDocToCollection = async (carDocId, newImage, uploadedUrls) => {
    await Promise.all(
      uploadedUrls.map(async (url) => {
        newImage.imageUrl = url;
        console.log("newImage.imageUrl: " + newImage.imageUrl);
        console.log(
          "preReplaceAndSplit imageStorageName: " + newImage.imageStorageName
        );
        newImage.imageStorageName = newImage.imageUrl
          .replace(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_URL_NAME, "")
          .split("?")[0];
        console.log(
          "afterReplaceAndSplit imageStorageName: " + newImage.imageStorageName
        );
        const imageDocRef = await ImageDataService.addImages(newImage);
        console.log("imageDocRef: " + imageDocRef);
        try {
          await ImageDataService.updateImageForeignId(carDocId, imageDocRef);
        } catch (err) {
          console.log("Error setting imageForeignId ", err);
        }
      })
    );
  };

  const handleUpload = async (selectedImages) => {
    console.log("handleUpload selectedImages: " + selectedImages);
    try {
      const uploadPromises = selectedImages.map((image) => {
        return new Promise((resolve, reject) => {
          const storage = getStorage();
          console.log("storage: " + storage);
          const name = new Date().getTime() + image.name;
          console.log("image name: " + name);
          const storageRef = ref(storage, `images/${name}`);
          console.log("storageRef: " + storageRef);
          const uploadTask = uploadBytesResumable(storageRef, image);

          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              switch (snapshot.state) {
                case "paused":
                  console.log("Upload is paused");
                  break;
                case "running":
                  console.log("Upload is running");
                  break;
              }
            },
            (error) => {
              Swal.fire({
                title: "Error!",
                text: "Error uploading image.",
                icon: "error",
                timer: 2000,
              });
              console.log("Error uploading image ", error);
              reject(error);
            },
            () => {
              // Get the download URL and resolve the promise
              getDownloadURL(uploadTask.snapshot.ref)
                .then((downloadURL) => {
                  resolve(downloadURL);
                })
                .catch((error) => {
                  console.log("Error getting download URL ", error);
                  reject(error);
                });
            }
          );
        });
      });

      // Wait for all the upload promises to resolve
      const imageUrls = await Promise.all(uploadPromises);
      console.log("All images uploaded successfully");
      console.log("Here are all the images: " + imageUrls);
      return imageUrls;
    } catch (error) {
      console.log("Exception caught during image upload ", error);
      throw error;
    }
  };

  const editHandler = useCallback(async () => {
    try {
      const carDocSnap = await CarDataService.getCar(carId);
      MySwal.fire({
        title: "To edit listing, change any of the fields and click 'Submit.'",
        position: "top-end",
        showConfirmButton: false,
        icon: "info",
        timer: 4000,
        timerProgressBar: true,
      });
      console.log("the record requested to edit: ", carDocSnap.data());

      setMake(carDocSnap.data().make);
      setModel(carDocSnap.data().model);
      setTrim(carDocSnap.data().trim);
      setMileage(carDocSnap.data().mileage);
      setPrice(carDocSnap.data().price);
      setVin(carDocSnap.data().vin);
      setYear(carDocSnap.data().year);
      setDrivetrain(carDocSnap.data().drivetrain);
      setTransmission(carDocSnap.data().transmission);
      setEngine(carDocSnap.data().engine);
      setDoors(carDocSnap.data().doors);
      setInteriorColor(carDocSnap.data().interiorColor);
      setExteriorColor(carDocSnap.data().exteriorColor);
      setDescription(carDocSnap.data().description);
      setFeaturedListing(carDocSnap.data().featuredListing);
      setSold(carDocSnap.data().sold);
      descriptionInputRef.current.value = carDocSnap.data().description;
    } catch (err) {
      console.log("Error attempting to load listing from database: " + err);
    }
  }, [carId]);

  useEffect(() => {
    if (carId !== undefined && carId !== "") {
      editHandler();
    }
  }, [carId, editHandler]);

  const deleteHandler = useCallback(async () => {
    console.log("id passed into deleteHandler: ", deleteId);

    const result = await MySwal.fire({
      title: "Are you sure you want to delete this listing?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete listing.",
    });

    if (result.isConfirmed) {
      const swalLoading = MySwal.fire({
        title: "Deleting Listing...",
        icon: "info",
        allowOutsideClick: false,
        showCancelButton: false,
        showConfirmButton: false,
        didOpen: async () => {
          MySwal.showLoading();
          await processDelete();
          swalLoading.close();
        },
      });
    }

    const processDelete = async () => {
      try {
        // First delete image files from storage
        await ImageDataService.deleteImageStorageById(deleteId);
        console.log(
          "Image successfully removed from storage with deleteId: " + deleteId
        );
        // Second, delete imageDoc(s) from collection that contain carDocId
        await ImageDataService.deleteImageDocs(deleteId);
        console.log(
          "ImageDoc successfully removed from collection with deleteId: " +
            deleteId
        );
        // Finally, delete carDoc from collection
        await CarDataService.deleteCar(deleteId);
        console.log(
          "carDoc successfully removed from collection with deleteId: " +
            deleteId
        );
        MySwal.fire({
          title: "Listing has been Deleted.",
          position: "top-end",
          showConfirmButton: false,
          icon: "success",
          timer: 3000,
        });
      } catch (e) {
        console.log("Error attempting to delete listing: " + e);
        MySwal.fire({
          title: "Error attempting to delete listing.",
          position: "top-end",
          showConfirmButton: false,
          icon: "error",
          timer: 3000,
        });
      }
    };
  }, [deleteId]);

  useEffect(() => {
    if (deleteId !== undefined && deleteId !== "") {
      deleteHandler();
      setDeleteId("");
    }
  }, [deleteId, setDeleteId, deleteHandler]);

  return (
    <>
      <div className="p-4 box">
        <div className="d-flex flex-column justify-content-center">
          <h1 className="text-center mt-3">
            Admin Dashboard
            <GradBar />
          </h1>
          <h5 className="text-center lh-3">
            Seamlessly manage vehicle listings, effortlessly create, edit, and
            delete listings that directly reflect on your frontend website. With
            this intuitive CRM portal, you have full control over your
            inventory, ensuring your listings are showcased exactly how you want
            them to appear on your website. Take charge of your dealership and
            streamline your online presence with our user-friendly admin
            dashboard.
          </h5>
        </div>
        <Button
          type="Submit"
          onClick={() => {
            clearAllBtnValidation();
          }}
        >
          Clear All
        </Button>
        <Form className="mt-5">
          <Row>
            <Col md={3}>
              <Form.Group className="mb-3" controlId="formCarMake">
                <Form.Label>
                  <strong>Make:</strong>
                </Form.Label>
                <Select
                  key={make}
                  className="w-100"
                  options={carMakeOptions}
                  value={carMakeOptions.find((option) => option.value === make)}
                  getOptionLabel={(option) => option.label}
                  getOptionValue={(option) => option.value}
                  placeholder="Select make..."
                  onChange={(selectedOption) => {
                    setMake(selectedOption.value);
                  }}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3" controlId="formCarModel">
                <Form.Label>
                  <strong>Model:</strong>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter model..."
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3" controlId="formCarTrim">
                <Form.Label>
                  <strong>Trim:</strong>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter trim..."
                  value={trim}
                  onChange={(e) => setTrim(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3" controlId="formCarMileage">
                <Form.Label>
                  <strong>Mileage:</strong>
                </Form.Label>
                <NumberFormat
                  className="form-control"
                  placeholder="Enter mileage..."
                  value={mileage}
                  onChange={(e) => setMileage(e.target.value)}
                  thousandSeparator={true}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3" controlId="formCarPrice">
                <Form.Label>
                  <strong>Price:</strong>
                </Form.Label>
                <NumberFormat
                  className="form-control"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  prefix="$"
                  thousandSeparator={true}
                  placeholder="$"
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3" controlId="formCarVin">
                <Form.Label>
                  <strong>Vin:</strong>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="#"
                  value={vin}
                  onChange={(e) => setVin(e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-3" controlId="formCarYear">
                <Form.Label>
                  <strong>Year:</strong>
                </Form.Label>
                <Select
                  key={year}
                  className="w-100"
                  options={carYearOptions}
                  value={carYearOptions.find((option) => option.value === year)}
                  getOptionLabel={(option) => option.label}
                  getOptionValue={(option) => option.value}
                  placeholder="Select year..."
                  onChange={(selectedOption) => {
                    setYear(selectedOption.value);
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="">
            <Col md={3}>
              <Form.Group className="mb-3" controlId="formCarDrivetrain">
                <Form.Label>
                  <strong>Drivetrain:</strong>
                </Form.Label>
                <Select
                  key={drivetrain}
                  className="w-100"
                  options={carDrivetrainOptions}
                  value={carDrivetrainOptions.find((option) => option.value === drivetrain)}
                  getOptionLabel={(option) => option.label}
                  getOptionValue={(option) => option.value}
                  placeholder="Select drivetrain..."
                  onChange={(selectedOption) => {
                    setDrivetrain(selectedOption.value);
                  }}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3" controlId="formCarTransmission">
                <Form.Label>
                  <strong>Transmission:</strong>
                </Form.Label>
                <Select
                  key={transmission}
                  className="w-100"
                  options={carTransmissionOptions}
                  value={carTransmissionOptions.find((option) => option.value === transmission)}
                  getOptionLabel={(option) => option.label}
                  getOptionValue={(option) => option.value}
                  placeholder="Select transmission..."
                  onChange={(selectedOption) => {
                    setTransmission(selectedOption.value);
                  }}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3" controlId="formCarEngine">
                <Form.Label>
                  <strong>Engine:</strong>
                </Form.Label>
                <Select
                  key={engine}
                  className="w-100"
                  options={carEngineOptions}
                  value={carEngineOptions.find((option) => option.value === engine)}
                  getOptionLabel={(option) => option.label}
                  getOptionValue={(option) => option.value}
                  placeholder="Select engine..."
                  onChange={(selectedOption) => {
                    setEngine(selectedOption.value);
                  }}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3" controlId="formCarDoors">
                <Form.Label>
                  <strong>Doors:</strong>
                </Form.Label>
                <Select
                  key={doors}
                  className="w-100"
                  options={carDoorOptions}
                  value={carDoorOptions.find((option) => option.value === doors)}
                  getOptionLabel={(option) => option.label}
                  getOptionValue={(option) => option.value}
                  placeholder="Select doors..."
                  onChange={(carDoorOptions) => {
                    setDoors(carDoorOptions.value);
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <Form.Group className="mb-3" controlId="formCarInteriorColor">
                <Form.Label>
                  <strong>Interior Color:</strong>
                </Form.Label>
                <Select
                  key={interiorColor}
                  className="w-100"
                  options={carColorsOptions}
                  value={carColorsOptions.find((option) => option.value === interiorColor)}
                  getOptionLabel={(option) => option.label}
                  getOptionValue={(option) => option.value}
                  placeholder="Select interior color..."
                  onChange={(carColorsOptions) => {
                    setInteriorColor(carColorsOptions.value);
                  }}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3" controlId="formCarExteriorColor">
                <Form.Label>
                  <strong>Exterior Color:</strong>
                </Form.Label>
                 <Select
                  key={exteriorColor}
                  className="w-100"
                  options={carColorsOptions}
                  value={carColorsOptions.find((option) => option.value === exteriorColor)}
                  getOptionLabel={(option) => option.label}
                  getOptionValue={(option) => option.value}
                  placeholder="Select exterior color..."
                  onChange={(carColorsOptions) => {
                    setExteriorColor(carColorsOptions.value);
                  }}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>
                  <strong>Featured Listing?</strong>
                </Form.Label>
                 <Select
                  key={featuredListing}
                  className="w-100"
                  options={featuredListingOptions}
                  value={featuredListingOptions.find((option) => option.value === featuredListing)}
                  getOptionLabel={(option) => option.label}
                  getOptionValue={(option) => option.value}
                  placeholder="Select an option..."
                  onChange={(featuredListingOptions) => {
                    setFeaturedListing(featuredListingOptions.value);
                  }}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>
                  <strong>Sold?</strong>
                </Form.Label>
                 <Select
                  key={sold}
                  className="w-100"
                  options={soldListingOptions}
                  value={soldListingOptions.find((option) => option.value === sold)}
                  getOptionLabel={(option) => option.label}
                  getOptionValue={(option) => option.value}
                  placeholder="Select an option..."
                  onChange={(soldListingOptions) => {
                    setSold(soldListingOptions.value);
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Form.Group className="mb-3" controlId="formCarDescription">
              <FloatingLabel
                controlId="description"
                label="Vehicle Description"
              >
                <Form.Control
                  as="textarea"
                  placeholder="Vehicle Description"
                  style={{ height: "150px" }}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  ref={descriptionInputRef}
                />
              </FloatingLabel>
            </Form.Group>
          </Row>
          <Row className="d-flex justify-content-center">
            <Col md={5}>
              {!formSubmitted && (
                <ImageUploader
                  onImagesSelected={setSelectedImages}
                  onImageUpload={imagesSubmittedForUpload}
                />
              )}
              <div className="d-grid gap-2 mt-5">
                <Button
                  variant="primary"
                  type="Submit"
                  onClick={(e) => {
                    handleSubmit(e);
                  }}
                >
                  Submit
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
        <style jsx>{``}</style>
      </div>
    </>
  );
};

export default CarListingCrud;
