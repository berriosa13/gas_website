import React, { useState, useEffect } from "react";
import { Form, InputGroup, Button, Row, Col } from "react-bootstrap";
import Select from "react-select";
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
  const [interiorColor, setInteriorColor] = useState("");
  const [exteriorColor, setExteriorColor] = useState("");
  const [year, setYear] = useState("");
  const [images, setImages] = useState("");
  const [imageUrl, setImageUrls] = useState("");
  const imageInputRef = React.useRef();
  const [imageForeignId, setImageForeignId] = useState("");
  const [imageStorageName, setImageStorageName] = useState([]);
  const storage = getStorage();

  const styles = {
    select: {
      width: "100%",
      maxWidth: 400,
    },
  };

  const carMakeOptions = SelectOptionsService.getCarMakeOptions();
  const carYearOptions = SelectOptionsService.getCarYearOptions();
  const carDrivetrainOptions = SelectOptionsService.getCarDrivetrainOptions();
  const carTransmissionOptions = SelectOptionsService.getCarTransmissionOptions();
  const carEngineOptions = SelectOptionsService.getCarEngineOptions();
  const carDoorOptions = SelectOptionsService.getCarDoorOptions();
  const carColorsOptions = SelectOptionsService.getCarColorOptions();

  const handleSubmit = async (e) => {
    e.preventDefault();
    imageInputRef.current.value = "";

    if (
      make === "" ||
      model === "" ||
      mileage === "" ||
      price === "" ||
      vin === "" ||
      year === ""
    ) {
      toast.error("All field must be filled out!");
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
    setImages("");
    setImageUrls("");
    setImages("");
  };

  const sendImageDocToCollection = async (carDocId, newImage) => {
    console.log("carDocId for update: ", carDocId);
    await Promise.all(
      imageUrl.map(async (urls) => {
        console.log("sending images to collection for new image: ", newImage);
        newImage.imageUrl = urls;
        newImage.imageStorageName = imageStorageName.pop();
        const imageDocRef = await ImageDataService.addImages(newImage);
        await ImageDataService.updateImageForeignId(carDocId, imageDocRef);
      })
    );
  };

  const handleImageFileChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      console.log("new image to be added: ", newImage);
      setImages((prevState) => [...prevState, newImage]);
    }
  };

  useEffect(() => {
    const handleUpload = () => {
      images.map((image) => {
        const name =  v4() + "_" + image.name;
        // const name = new Date().getTime() + image.name;
        const storageRef = ref(storage, `images/${name}`);
        setImageStorageName((prevState) => [...prevState, name]);
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
            toast("Image uploadTask error", error, {
              className: "error-toast",
              draggable: true,
              position: toast.POSITION.TOP_CENTER,
            });
          },
          () => {
            // Get urls and set them after each successful upload
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setImageUrls((prevState) => [...prevState, downloadURL]);
              console.log("current imageUrl(s): ", imageUrl);
              toast.info("Upload Finished for " + name +"");
            });
          }
        );
      });
      console.log("image file(s): ", images);
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
            <Col>
              <Form.Group className="mb-3" controlId="formCarMake">
                <InputGroup className="flex-nowrap">
                  <InputGroup.Text id="formCarMake">
                    <span role="img" aria-label="car emoji">
                      🚗
                    </span>
                    Make
                  </InputGroup.Text>
                  <Select
                    className="w-100"
                    value={{ value: make, label: make }}
                    options={carMakeOptions}
                    onChange={(e) => {
                      setMake(e.value);
                    }}
                  ></Select>
                </InputGroup>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="fromCarModel">
                <InputGroup>
                  <InputGroup.Text id="fromCarModel">
                    <span role="img" aria-label="car emoji">
                      🚗
                    </span>
                    Model
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Ex. Pontiac, Traverse..."
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formCarMileage">
                <InputGroup>
                  <InputGroup.Text id="formCarMileage">
                    <span role="img" aria-label="car emoji">
                      🚗
                    </span>
                    Mileage
                  </InputGroup.Text>
                  <Form.Control
                    type="number"
                    placeholder="Car Mileage"
                    value={mileage}
                    onChange={(e) => setMileage(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formCarPrice">
                <InputGroup>
                  <InputGroup.Text id="formCarPrice">
                    <span role="img" aria-label="car emoji">
                      🚗
                    </span>
                    Price
                  </InputGroup.Text>
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
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formCarVin">
                <InputGroup>
                  <InputGroup.Text id="formCarVin">
                    <span role="img" aria-label="car emoji">
                      🚗
                    </span>
                    Vin#
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Vehicles unique ID"
                    value={vin}
                    onChange={(e) => setVin(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group className="mb-3" controlId="formCarYear">
                <InputGroup className="flex-nowrap">
                  <InputGroup.Text id="formCarYear">
                    <span role="img" aria-label="car emoji">
                      🚗
                    </span>
                    Year
                  </InputGroup.Text>
                  <Select
                    className="w-100"
                    value={{ value: year, label: year }}
                    options={carYearOptions}
                    onChange={(e) => {
                      setYear(e.value);
                    }}
                  ></Select>
                </InputGroup>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formCarDrivetrain">
                <InputGroup className="flex-nowrap">
                  <InputGroup.Text id="formCarDrivetrain">
                    <span role="img" aria-label="car emoji">
                      🚗
                    </span>
                    Drivetrain
                  </InputGroup.Text>
                  <Select
                    className="w-100"
                    value={{ value: drivetrain, label: drivetrain }}
                    options={carDrivetrainOptions}
                    onChange={(e) => {
                      setDrivetrain(e.value);
                    }}
                  ></Select>
                </InputGroup>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formCarTransmission">
                <InputGroup className="flex-nowrap">
                  <InputGroup.Text id="formCarTransmission">
                    <span role="img" aria-label="car emoji">
                      🚗
                    </span>
                    Transmission
                  </InputGroup.Text>
                  <Select
                    className="w-100"
                    value={{ value: transmission, label: transmission }}
                    options={carTransmissionOptions}
                    onChange={(e) => {
                      setTransmission(e.value);
                    }}
                  ></Select>
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formCarEngine">
                <InputGroup className="flex-nowrap">
                  <InputGroup.Text id="formCarEngine">
                    <span role="img" aria-label="car emoji">
                      🚗
                    </span>
                    Engine
                  </InputGroup.Text>
                  <Select
                    className="w-100"
                    value={{ value: engine, label: engine }}
                    options={carEngineOptions}
                    onChange={(e) => {
                      setEngine(e.value);
                    }}
                  ></Select>
                </InputGroup>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formCarDoors">
                <InputGroup className="flex-nowrap">
                  <InputGroup.Text id="formCarDoors">
                    <span role="img" aria-label="car emoji">
                      🚗
                    </span>
                    Doors
                  </InputGroup.Text>
                  <Select
                    className="w-100"
                    value={{ value: doors, label: doors }}
                    options={carDoorOptions}
                    onChange={(e) => {
                      setDoors(e.value);
                    }}
                  ></Select>
                </InputGroup>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formCarInteriorColor">
                <InputGroup className="flex-nowrap"> 
                  <InputGroup.Text id="formCarInteriorColor">
                    <span role="img" aria-label="car emoji">
                      🚗
                    </span>
                    Interior Color
                  </InputGroup.Text>
                  <Select
                    className="w-100"
                    value={{ value: interiorColor, label: interiorColor }}
                    options={carColorsOptions}
                    onChange={(e) => {
                      setInteriorColor(e.value);
                    }}
                  ></Select>
                </InputGroup>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formCarExteriorColor">
                <InputGroup className="flex-nowrap">
                  <InputGroup.Text id="formCarExteriorColor">
                    <span role="img" aria-label="car emoji">
                      🚗
                    </span>
                    Exterior Color
                  </InputGroup.Text>
                  <Select
                    className="w-100"
                    value={{ value: exteriorColor, label: exteriorColor }}
                    options={carColorsOptions}
                    onChange={(e) => {
                      setExteriorColor(e.value);
                    }}
                  ></Select>
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Row className="d-flex justify-content-center">
            <Col md={5}>
              <Form.Group controlId="formFileMultiple" className="mb-3">
                <Form.Label>Upload Image(s)</Form.Label>
                <Form.Control
                  type="file"
                  multiple
                  onChange={handleImageFileChange}
                  ref={imageInputRef}
                />
              </Form.Group>
              <div className="d-grid gap-2">
                <Button variant="primary" type="Submit">
                  Add / Update
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default AddDocument;
