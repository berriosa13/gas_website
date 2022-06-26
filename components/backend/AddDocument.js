import React, { useState, useEffect, useCallback, useRef } from "react";
import { Form, InputGroup, Button, Row, Col, FloatingLabel } from "react-bootstrap";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import CurrencyInput from "react-currency-input-field";
import CarDataService from "../../services/cars.services";
import ImageDataService from "../../services/images.services";
import SelectOptionsService from "../../services/options.services";
import { v4 } from 'uuid';

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const AddDocument = ({ carId, setCarId }) => {

  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [mileage, setMileage] = useState("");
  const [price, setPrice] = useState("");
  const [vin, setVin] = useState("");
  const [drivetrain, setDrivetrain] = useState("");
  const [transmission, setTransmission] = useState("");
  const [engine, setEngine] = useState("");
  const [doors, setDoors] = useState("");
  const [interiorColor, setInteriorColor] = useState(null);
  const [exteriorColor, setExteriorColor] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState("");
  const [imageUrl, setImageUrls] = useState("");
  const imageInputRef = React.useRef();
  const descriptionInputRef = React.useRef();
  const [imageForeignId, setImageForeignId] = useState("");
  const [imageStorageName, setImageStorageName] = useState([]);
  // const imageStorageName = [];
  const [uploading, setUploading] = useState(false);
  const storage = getStorage();

  const styles = {
    select: {
      width: "100%",
      maxWidth: 400,
    },
  };

  const [carMakeOptions, setCarMakeOptions] = useState(SelectOptionsService.getCarMakeOptions)
  const [carMakeValue, setCarMakeValue] = useState("");
  const carYearOptions = SelectOptionsService.getCarYearOptions();
  const carDrivetrainOptions = SelectOptionsService.getCarDrivetrainOptions();
  const carTransmissionOptions = SelectOptionsService.getCarTransmissionOptions();
  const carEngineOptions = SelectOptionsService.getCarEngineOptions();
  const carDoorOptions = SelectOptionsService.getCarDoorOptions();
  const carColorsOptions = SelectOptionsService.getCarColorOptions();

  // const handleCarMakeChange = useCallback((inputValue) => setCarMakeValue(inputValue), []);

  // const handleCarMakeCreate = useCallback(
  //   (inputValue) => {
  //     const newCarMakeOption = { value: inputValue.toLowerCase(), label: inputValue };
  //     setCarMakeOptions([...carMakeOptions, newCarMakeOption]);
  //     setCarMakeValue(newCarMakeOption);
  //   },
  //   [carMakeOptions]
  // )

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      make === "" ||
      model === "" ||
      mileage === "" ||
      price === "" ||
      vin === "" ||
      year === "" ||
      drivetrain === "" ||
      transmission === "" ||
      engine === "" ||
      doors === "" ||
      interiorColor === "" ||
      exteriorColor === "" ||
      description === ""
    ) {
      toast.error("All fields must be filled out!");
      return;
    }

    const newCar = {
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
      interiorColor,
      exteriorColor,
      description,
    };

    const newImage = { imageForeignId, imageStorageName, imageUrl };

    try {
      if (carId !== undefined && carId !== "") {

        const carDocRef = await CarDataService.updateCar(carId, newCar);

        // if imageUrl is NOT null, user attempted to update listing with more images
        if (imageUrl !== undefined && imageUrl !== "") {
          sendImageDocToCollection(carId, newImage);
        }
        toast.success("Updated successfully!");
        setCarId("");
      } else {
        if(images === "") {
          toast.error("Select an image(s) for this listing");
          return;
        }
        const carDocRef = await CarDataService.addCars(newCar);
        const carId = carDocRef.id;
        // add newImage to Image collection
        sendImageDocToCollection(carId, newImage);
        console.log("Successfully added Car document with ID: ", carDocRef.id);
        toast.success("Created successfully");
      }
    } catch (err) {
      toast.error(err);
      console.log(err);
    }
    setMake("");
    setModel("");
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
    setImages("");
    setImageUrls("");
    setImages("");
    setImageForeignId("");
    setImageStorageName("")
    imageInputRef.current.value = "";
    descriptionInputRef.current.value = "";
  };

  const sendImageDocToCollection = async (carDocId, newImage) => {
    await Promise.all(
      imageUrl.map(async (urls) => {
        newImage.imageUrl = urls;
        newImage.imageStorageName = newImage.imageUrl.replace(
          'https://firebasestorage.googleapis.com/v0/b/gas-auto-sales-dev.appspot.com/o/images%2F', '')
          .split('?')[0];
        const imageDocRef = await ImageDataService.addImages(newImage);
        try {
          await ImageDataService.updateImageForeignId(carDocId, imageDocRef);
        } catch(err) {
          console.log("Error setting imageForeignId ", err);
        }
      })
    );
  };

  const handleImageFileChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      setImages((prevState) => [...prevState, newImage]);
    }
  };



  useEffect(() => {
    const handleUpload = () => {
      images.map((image) => {
        setUploading(true);
        const name = new Date().getTime() + image.name;
        const storageRef = ref(storage, `images/${name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);
        
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              switch (snapshot.state) {
                case "paused":
                  console.log("Upload is paused");
                  toast.info("Image upload paused");
                  break;
                  case "running":
                    console.log("Upload is running");
                    break;
                  }
                },
                (error) => {
                  toast.error("Error uploading image");
                  console.log("Error uploading image ", error);
                },
                () => {
                  // Get urls and set them after each successful upload
                  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageUrls((prevState) => [...prevState, downloadURL]);
                    toast.info("Upload Finished for " + name +"");
            });
          }
        );
      });
      setUploading(false);
    };

    images && handleUpload();
  }, [images]);

  const editHandler = async () => {
    try {
      const carDocSnap = await CarDataService.getCar(carId);
      console.log("the record requested to edit: ", carDocSnap.data());
      setMake(carDocSnap.data().make);
      setModel(carDocSnap.data().model);
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
      descriptionInputRef.current.value = carDocSnap.data().description;
      toast.info(
        "To edit listing, change any of the fields and click 'Add/Update'"
      );
    } catch (err) {
      toast.error("Error attempting to edit document ", err);
    }
  };

  useEffect(() => {
    console.log("The carId here is : ", carId);
    if (carId !== undefined && carId !== "") {
      editHandler();
    }
  }, [carId]);

    console.log(interiorColor)

  return (
    <>
      <div className="p-4 box">
        <>
          <ToastContainer
            draggable={false}
            transition={Zoom}
            autoClose={3000}
          />
        </>
        <h1 className="text-center mt-3">GAS Admin Dashboard</h1>
        <Form onSubmit={handleSubmit} className="mt-5">
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3" controlId="formCarMake">
                <Form.Label><strong>Make:</strong></Form.Label>
                  <Select
                    className="w-100"
                    value={{ value: make, label: make }}
                    options={carMakeOptions}
                    onChange={(e) => {
                      setMake(e.value);
                    }}
                  ></Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3" controlId="fromCarModel">
              <Form.Label><strong>Model:</strong></Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ex. Pontiac, Traverse..."
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                  />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3" controlId="formCarMileage">
                <Form.Label><strong>Mileage:</strong></Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter mileage #"
                    value={mileage}
                    onChange={(e) => setMileage(e.target.value)}
                  />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3" controlId="formCarPrice">
                <Form.Label><strong>Price:</strong></Form.Label>
                  {/* <CurrencyInput
                  className="form-control"
                  placeholder="Please enter a number"
                  defaultValue={price}
                  decimalsLimit={2}
                  prefix="$"
                  onValueChange={(value, name) => setPrice(value)}
                />             */}
                  <Form.Control
                    type="number"
                    placeholder="Enter a dollar amount"
                    prefix="$"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3" controlId="formCarVin">
                <Form.Label><strong>Vin #:</strong></Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Vehicles unique ID"
                    value={vin}
                    onChange={(e) => setVin(e.target.value)}
                  />
                </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-3" controlId="formCarYear">
              <Form.Label><strong>Year:</strong></Form.Label>
                  <Select
                    className="w-100"
                    value={{ value: year, label: year }}
                    options={carYearOptions}
                    onChange={(e) => {
                      setYear(e.value);
                    }}
                    defaultValue='Hi'
                  ></Select>
              </Form.Group>
            </Col>
          </Row>
          <Row className="">
            <Col md={4}>
              <Form.Group className="mb-3" controlId="formCarDrivetrain">
              <Form.Label><strong>Drivetrain:</strong></Form.Label>
                    <Select
                      className="w-100"

                      value={{ value: drivetrain, label: drivetrain }}
                      options={carDrivetrainOptions}
                      onChange={(e) => {
                        setDrivetrain(e.value);
                      }}
                      >
                    </Select>
              </Form.Group>
                
        
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3" controlId="formCarTransmission">
                <Form.Label><strong>Transmission:</strong></Form.Label>
                  <Select
                    className="w-100"
                    value={{ value: transmission, label: transmission }}
                    options={carTransmissionOptions}
                    onChange={(e) => {
                      setTransmission(e.value);
                    }}
                  ></Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3" controlId="formCarEngine">
              <Form.Label><strong>Engine:</strong></Form.Label>
                  <Select
                    className="w-100"
                    value={{ value: engine, label: engine }}
                    options={carEngineOptions}
                    onChange={(e) => {
                      setEngine(e.value);
                    }}
                  ></Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3" controlId="formCarDoors">
                <Form.Label><strong># of Doors:</strong></Form.Label>
                  <Select
                    className="w-100"
                    value={{ value: doors, label: doors }}
                    options={carDoorOptions}
                    onChange={(e) => {
                      setDoors(e.value);
                    }}
                  ></Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3" controlId="formCarInteriorColor">
                <Form.Label><strong>Interior Color:</strong></Form.Label>
                  <Select
                    className="w-100"
                    value={{ value: interiorColor, label: interiorColor }}
                    placeholder="Select Color"
                    // // value={interiorColor.color}
                    // value={{value: interiorColor.color, label: interiorColor.color}}
                    // defaultValue={interiorColor.color}
                    type="text"
                    options={carColorsOptions}
                    onChange={(e) => {
                      setInteriorColor(e.value);
                    }}
                  ></Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3" controlId="formCarExteriorColor">            
                <Form.Label><strong>Exterior Color:</strong></Form.Label>
                  <Select
                    className="w-100"
                    value={{ value: exteriorColor, label: exteriorColor }}
                    options={carColorsOptions}
                    
                    onChange={(e) => {
                      setExteriorColor(e.value);
                    }}
                  ></Select>
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
                  style={{ height: "300px" }}
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
              <Form.Group controlId="formFileMultiple" className="mb-3">
                <Form.Label><strong>Upload Image(s)</strong></Form.Label>
                <Form.Control
                  type="file"
                  multiple
                  onChange={handleImageFileChange}
                  ref={imageInputRef}
                />
              </Form.Group>
              <div className="d-grid gap-2 mt-5">
                <Button variant="primary" type="Submit" disabled={uploading}>
                  Add / Update
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
        <style jsx >{`

                  
      `}</style>
      </div>
    </>
  );
};

export default AddDocument;
