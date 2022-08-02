import React, { useState, useRef } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { FiSend } from "react-icons/fi";
import { HiBadgeCheck } from "react-icons/hi";
import GradBar from "../GradBar";
import SignatureCanvas from "react-signature-canvas";
import PhoneNumberInput from "../PhoneNumberInput";
import SocialSecurityInput from "../SocialSecurityInput";
import NumberFormat from 'react-number-format';
import {
  Table,
  Button,
  Card,
  Modal,
  Row,
  Col,
  Form,
  FloatingLabel,
  Container,
  Tab,
  Tabs,
} from "react-bootstrap";
import { useRouter } from "next/router";

function CreditApplicationForm({ setCar }) {
  const [state, handleSubmit] = useForm("creditApplicationForm");
  const [firstName, setFirstName] = useState("");
  const [socialInput, setSocialInput] = useState("");
  const [trimmedDataUrl, setTrimmedDataUrl] = useState("");
  const applicantSigRef = useRef();
  const coApplicantSigRef = useRef();
  const router = useRouter();

  // state = {trimmedDataURL: null}
  let applicantSigPad = {};
  let coApplicantSigPad = {};

  const clearApplicantSigPad = () => {
    applicantSigPad.clear();
  };
  const clearCoApplicantSigPad = () => {
    coApplicantSigPad.clear();
  };
  const trimApplicantSigPad = () => {
    this.setState({
      trimmedDataURL: this.sigPad.getTrimmedCanvas().toDataURL("image/png"),
    });
  };

  if (state.succeeded) {
    return (
      <>
        <h5 className="text-center mt-3">
          Your credit application has been successfully sent ✅ <br /> We will
          get back to you as soon as possible
        </h5>
      </>
    );
  }

  return (
    <>
      <Container>
        <form className="mx-5" onSubmit={handleSubmit}>
          <Tabs defaultActiveKey="applicant" id=" " className="mb-3">
            <Tab eventKey="applicant" title="Applicant">
              <div className="d-flex justify-content-center my-5">
                <h2 className="">
                  Applicant Information
                  <GradBar />
                </h2>
              </div>
              <Row>
                <div className="d-flex justify-content-start my-3">
                  <h4 className="">
                    Client Information
                    <GradBar />
                  </h4>
                </div>
              </Row>

              <Row>
                <Col lg>
                  <FloatingLabel
                    controlId="firstName"
                    label="First Name"
                    className="mb-3"
                  >
                    <input
                      type="text"
                      className="form-control"
                      name="applicantFirstName"
                      placeholder="First Name"
                      autoFocus
                      required
                    />
                    <ValidationError
                      field="applicantFirstName"
                      prefix="applicantFirstName"
                      errors={state.errors}
                    />
                  </FloatingLabel>
                </Col>
                <Col lg>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Last Name"
                    className="mb-3"
                  >
                    <input
                      type="text"
                      className="form-control"
                      name="applicantLastName"
                      placeholder="Last Name"
                      required
                    />
                    <ValidationError
                      field="applicantLastName"
                      prefix="applicantLastName"
                      errors={state.errors}
                    />
                  </FloatingLabel>
                </Col>
                <Col lg>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="SSN"
                    className="mb-3"
                  >
                    <SocialSecurityInput
                      name={'applicantSocialSecurityNumber'}
                      isRequired={true}
                    />
                    <ValidationError
                      field="applicantSocialSecurityNumber"
                      prefix="applicantSocialSecurityNumber"
                      errors={state.errors}
                    />
                  </FloatingLabel>
                </Col>
              </Row>
              <Row>
                <Col lg>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Birth Date"
                    className="mb-3"
                  >
                    <input
                      type="date"
                      className="form-control"
                      name="applicantBirthDate"
                      placeholder="Birth Date"
                      required
                    />
                    <ValidationError
                      field="applicantBirthDate"
                      prefix="applicantBirthDate"
                      errors={state.errors}
                    />
                  </FloatingLabel>
                </Col>
                <Col lg>
                  <div className="mb-3">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Email"
                      className="mb-3"
                    >
                      <input
                        type="text"
                        className="form-control"
                        name="applicantEmail"
                        placeholder="Email"
                        required
                      />
                      <ValidationError
                        field="applicantEmail"
                        prefix="applicantEmail"
                        errors={state.errors}
                      />
                    </FloatingLabel>
                  </div>
                </Col>
                <Col lg>
                  <div className="mb-3">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Cell Phone"
                      className="mb-3"
                    >
                      <PhoneNumberInput
                        name={'applicantCellphone'}
                        isRequired={true}
                      />
                    </FloatingLabel>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Address"
                    className="mb-3"
                  >
                    <input
                      type="text"
                      className="form-control"
                      name="applicantAddress"
                      placeholder="Address"
                      required
                    />
                    <ValidationError
                      field="applicantAddress"
                      prefix="applicantAddress"
                      errors={state.errors}
                    />
                  </FloatingLabel>
                </Col>
                <Col lg>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Driver's License"
                    className="mb-3"
                  >
                    <input
                      type="text"
                      className="form-control"
                      name="applicantDriversLicense"
                      placeholder="Driver's License"
                    />
                    <ValidationError
                      field="applicantDriversLicense"
                      prefix="applicantDriversLicense"
                      errors={state.errors}
                    />
                  </FloatingLabel>
                </Col>
                <Col lg>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Driver's License State"
                    className="mb-3"
                  >
                    <input
                      type="text"
                      className="form-control"
                      name="applicantDriversLicenseState"
                      placeholder="applicantDriversLicenseState"
                    />
                    <ValidationError
                      field="applicantDriversLicenseState"
                      prefix="applicantDriversLicenseState"
                      errors={state.errors}
                    />
                  </FloatingLabel>
                </Col>
              </Row>
              <Row>
                <Col lg>
                  <div className="mb-3">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="City/Town"
                      className="mb-3"
                    >
                      <input
                        type="text"
                        className="form-control"
                        name="applicantCityOrTown"
                        placeholder="City/Town"
                        required
                      />
                      <ValidationError
                        field="applicantCityOrTown"
                        prefix="applicantCityOrTown"
                        errors={state.errors}
                      />
                    </FloatingLabel>
                  </div>
                </Col>
                <Col lg>
                  <div className="mb-3">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="State"
                      className="mb-3"
                    >
                      <input
                        type="text"
                        className="form-control"
                        name="applicantState"
                        placeholder="state"
                        required
                      />
                      <ValidationError
                        field="applicantState"
                        prefix="applicantState"
                        errors={state.errors}
                      />
                    </FloatingLabel>
                  </div>
                </Col>
                <Col>
                  <div className="mb-3">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Zip Code"
                      className="mb-3"
                    >
                      <input
                        type="number"
                        className="form-control"
                        name="applicantZipCode"
                        placeholder="Zip Code"
                        pattern="[0-9]{5}"
                        required
                      />
                      <ValidationError
                        field="applicantZipCode"
                        prefix="applicantZipCode"
                        errors={state.errors}
                      />
                    </FloatingLabel>
                  </div>
                </Col>
              </Row>
              <Row>
                <div className="d-flex justify-content-start my-3">
                  <h4 className="">
                    Housing Information
                    <GradBar />
                  </h4>
                </div>
                <Col lg>
                  <div className="mb-3">
                    <FloatingLabel
                      controlId="floatingSelect"
                      label="Housing Type"
                    >
                      <select
                        className="form-control"
                        name="applicantHousingType"
                        aria-label="Housing Type"
                      >
                        <option>Select...</option>
                        <option value="Rent">Rent</option>
                        <option value="Own">Own</option>
                        <option value="Other">Other</option>
                      </select>
                      <ValidationError
                        field="applicantHousingType"
                        prefix="applicantHousingType"
                        errors={state.errors}
                      />
                    </FloatingLabel>
                  </div>
                </Col>
                <Col lg>
                  <div className="mb-3">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Rent/Mortage (Per-Month)"
                      className="mb-3"
                    >
                      <NumberFormat
                        className="form-control"
                        name="applicantRentAmount"
                        placeholder="Rent/Mortage"
                        thousandSeparator={true}
                        prefix={"$"}
                      />
                      <ValidationError
                        field="applicantRentOrMortageAmount"
                        prefix="applicantRentOrMortageAmount"
                        errors={state.errors}
                      />
                    </FloatingLabel>
                  </div>
                </Col>
                <Col lg>
                  <div className="mb-3">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Years At Current Address"
                      className="mb-3"
                    >
                      <input
                        type="number"
                        className="form-control"
                        name="applicantYearsAtCurrentAddress"
                        placeholder="Years At Current Address"
                        required
                      />
                      <ValidationError
                        field="applicantYearsAtCurrentAddress"
                        prefix="applicantYearsAtCurrentAddress"
                        errors={state.errors}
                      />
                    </FloatingLabel>
                  </div>
                </Col>
                <Col>
                  <div className="mb-3">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Months At Current Address"
                      className="mb-3"
                    >
                      <input
                        type="number"
                        className="form-control"
                        name="applicantMonthsAtCurrentAddress"
                        placeholder="Months At Current Address"
                        required
                      />
                      <ValidationError
                        field="applicantMonthsAtCurrentAddress"
                        prefix="applicantMonthsAtCurrentAddress"
                        errors={state.errors}
                      />
                    </FloatingLabel>
                  </div>
                </Col>
              </Row>
              <Row>
                <div className="d-flex justify-content-start my-3">
                  <h4 className="">
                    Employment Information
                    <GradBar />
                  </h4>
                </div>
                <Col>
                  <div className="mb-3">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Name of Employer"
                      className="mb-3"
                    >
                      <input
                        type="text"
                        className="form-control"
                        name="applicantNameOfEmployer"
                        placeholder="Name of Employer"
                        required
                      />
                      <ValidationError
                        field="applicantNameOfEmployer"
                        prefix="applicantNameOfEmployer"
                        errors={state.errors}
                      />
                    </FloatingLabel>
                  </div>
                </Col>
                <Col lg>
                  <div className="mb-3">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Title/Position"
                      className="mb-3"
                    >
                      <input
                        type="text"
                        className="form-control"
                        name="applicantOccupation"
                        placeholder="Title/Position"
                        required
                      />
                      <ValidationError
                        field="applicantOccupation"
                        prefix="applicantOccupation"
                        errors={state.errors}
                      />
                    </FloatingLabel>
                  </div>
                </Col>
                <Col lg>
                  <div className="mb-3">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Work Phone"
                      className="mb-3"
                    >
                      <PhoneNumberInput
                        name={'applicantWorkphone'}
                        isRequired={false}
                      />
                      <ValidationError
                        field="applicantWorkphone"
                        prefix="applicantWorkphone"
                        errors={state.errors}
                      />
                    </FloatingLabel>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg>
                  <div className="mb-3">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Gross Monthly Income"
                      className="mb-3"
                    >
                      <NumberFormat
                        className="form-control"
                        name="applicantGrossMonthlyIncome"
                        placeholder="Gross Monthly Income"
                        thousandSeparator={true}
                        prefix={"$"}
                      />
                      <ValidationError
                        field="applicantGrossMonthlyIncome"
                        prefix="applicantGrossMonthlyIncome"
                        errors={state.errors}
                      />
                    </FloatingLabel>
                  </div>
                </Col>
                <Col lg>
                  <div className="mb-3">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Employment Length, Years:"
                      className="mb-3"
                    >
                      <input
                        type="number"
                        className="form-control"
                        name="applicantEmploymentLengthInYears"
                        placeholder="Employment Length, Years:"
                        required
                      />
                      <ValidationError
                        field="applicantEmploymentLengthInYears"
                        prefix="applicantEmploymentLengthInYears"
                        errors={state.errors}
                      />
                    </FloatingLabel>
                  </div>
                </Col>
                <Col lg>
                  <div className="mb-3">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Employment Length, Months:"
                      className="mb-3"
                    >
                      <input
                        type="number"
                        className="form-control"
                        name="applicantEmploymentLengthInMonths"
                        placeholder="Employment Length, Months:"
                        required
                      />
                      <ValidationError
                        field="applicantEmploymentLengthInMonths"
                        prefix="applicantEmploymentLengthInMonths"
                        errors={state.errors}
                      />
                    </FloatingLabel>
                  </div>
                </Col>
              </Row>
            </Tab>
            <Tab eventKey="co-applicant" title="Co-Applicant">
              <div className="d-flex justify-content-center my-5">
                <h2>
                  Co-Applicant Information
                  <GradBar />
                </h2>
              </div>
              <Row>
                <div className="d-flex justify-content-start my-3">
                  <h4 className="">
                    Client Information
                    <GradBar />
                  </h4>
                </div>
              </Row>
              <Row>
                <Col lg>
                  <FloatingLabel
                    controlId="firstName"
                    label="First Name"
                    className="mb-3"
                  >
                    <input
                      type="text"
                      className="form-control"
                      name="coApplicantFirstName"
                      placeholder="First Name"
                      autoFocus
                    />
                    <ValidationError
                      field="coApplicantFirstName"
                      prefix="coApplicantFirstName"
                      errors={state.errors}
                    />
                  </FloatingLabel>
                </Col>
                <Col lg>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Last Name"
                    className="mb-3"
                  >
                    <input
                      type="text"
                      className="form-control"
                      name="coApplicantLastName"
                      placeholder="Last Name"
                    />
                    <ValidationError
                      field="coApplicantLastName"
                      prefix="coApplicantLastName"
                      errors={state.errors}
                    />
                  </FloatingLabel>
                </Col>
                <Col lg>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="SSN"
                    className="mb-3"
                  >
                    <SocialSecurityInput
                      name={'coApplicantSocialSecurityNumber'}
                      isRequired={false}
                    />
                    <ValidationError
                      field="coApplicantSocialSecurityNumber"
                      prefix="coApplicantSocialSecurityNumber"
                      errors={state.errors}
                    />
                  </FloatingLabel>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Birth Date"
                    className="mb-3"
                  >
                    <input
                      type="date"
                      className="form-control"
                      name="coApplicantBirthDate"
                      placeholder="Birth Date"
                    />
                    <ValidationError
                      field="coApplicantBirthDate"
                      prefix="coApplicantBirthDate"
                      errors={state.errors}
                    />
                  </FloatingLabel>
                </Col>
                <Col lg>
                  <div className="mb-3">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Email"
                      className="mb-3"
                    >
                      <input
                        type="text"
                        className="form-control"
                        name="coApplicantEmail"
                        placeholder="Email"
                      />
                      <ValidationError
                        field="coApplicantEmail"
                        prefix="coApplicantEmail"
                        errors={state.errors}
                      />
                    </FloatingLabel>
                  </div>
                </Col>
                <Col lg>
                  <div className="mb-3">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Cell Phone"
                      className="mb-3"
                    >
                      <PhoneNumberInput
                        name={'coApplicantCellphone'}
                        isRequired={false}
                      />
                    </FloatingLabel>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Address"
                    className="mb-3"
                  >
                    <input
                      type="text"
                      className="form-control"
                      name="coApplicantAddress"
                      placeholder="Address"
                    />
                    <ValidationError
                      field="coApplicantAddress"
                      prefix="coApplicantAddress"
                      errors={state.errors}
                    />
                  </FloatingLabel>
                </Col>
                <Col lg>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Driver's License"
                    className="mb-3"
                  >
                    <input
                      type="text"
                      className="form-control"
                      name="coApplicantDriverseLicense"
                      placeholder="Driver's License"
                    />
                    <ValidationError
                      field="coApplicantDriverseLicense"
                      prefix="coApplicantDriverseLicense"
                      errors={state.errors}
                    />
                  </FloatingLabel>
                </Col>
                <Col lg>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Driver's License State"
                    className="mb-3"
                  >
                    <input
                      type="text"
                      className="form-control"
                      name="coApplicantDriversLicenseState"
                      placeholder="Driver's License State"
                    />
                    <ValidationError
                      field="coApplicantDriversLicenseState"
                      prefix="coApplicantDriversLicenseState"
                      errors={state.errors}
                    />
                  </FloatingLabel>
                </Col>
              </Row>
              <Row>
                <Col lg>
                  <div className="mb-3">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="City/Town"
                      className="mb-3"
                    >
                      <input
                        type="text"
                        className="form-control"
                        name="coApplicantCityOrTown"
                        placeholder="City/Town"
                      />
                      <ValidationError
                        field="coApplicantCityOrTown"
                        prefix="coApplicantCityOrTown"
                        errors={state.errors}
                      />
                    </FloatingLabel>
                  </div>
                </Col>
                <Col lg>
                  <div className="mb-3">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="State"
                      className="mb-3"
                    >
                      <input
                        type="text"
                        className="form-control"
                        name="coApplicantState"
                        placeholder="state"
                      />
                      <ValidationError
                        field="coApplicantState"
                        prefix="coApplicantState"
                        errors={state.errors}
                      />
                    </FloatingLabel>
                  </div>
                </Col>
                <Col>
                  <div className="mb-3">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Zip Code"
                      className="mb-3"
                    >
                      <input
                        type="number"
                        className="form-control"
                        name="coApplicantZipCode"
                        placeholder="Zip Code"
                        pattern="[0-9]{5}"
                      />
                      <ValidationError
                        field="coApplicantZipCode"
                        prefix="coApplicantZipCode"
                        errors={state.errors}
                      />
                    </FloatingLabel>
                  </div>
                </Col>
              </Row>
              <Row>
                <div className="d-flex justify-content-start my-3">
                  <h4 className="">
                    Housing Information
                    <GradBar />
                  </h4>
                </div>
                <Col>
                  <div className="mb-3">
                    <FloatingLabel
                      controlId="floatingSelect"
                      label="Housing Type"
                    >
                      <select
                        className="form-control"
                        name="coApplicantHousingType"
                        aria-label="Housing Type"
                      >
                        <option>Select...</option>
                        <option value="Rent">Rent</option>
                        <option value="Own">Own</option>
                        <option value="Other">Other</option>
                      </select>
                      <ValidationError
                        field="coApplicantHousingType"
                        prefix="coApplicantHousingType"
                        errors={state.errors}
                      />
                    </FloatingLabel>
                  </div>
                </Col>
                <Col lg>
                  <div className="mb-3">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Rent/Mortage (Per-Month)"
                      className="mb-3"
                    >
                      <NumberFormat
                        name="coApplicantRentOrMortageAmount"
                        className="form-control"
                        placeholder="Rent/Mortage"
                        thousandSeparator={true}
                        prefix={"$"}
                      />
                      <ValidationError
                        field="coApplicantRentOrMortageAmount"
                        prefix="coApplicantRentOrMortageAmount"
                        errors={state.errors}
                      />
                    </FloatingLabel>
                  </div>
                </Col>
                <Col lg>
                  <div className="mb-3">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Years At Current Address"
                      className="mb-3"
                    >
                      <input
                        type="number"
                        className="form-control"
                        name="applicantYearsAtCurrentAddress"
                        placeholder="Years At Current Address"
                      />
                      <ValidationError
                        field="applicantYearsAtCurrentAddress"
                        prefix="applicantYearsAtCurrentAddress"
                        errors={state.errors}
                      />
                    </FloatingLabel>
                  </div>
                </Col>
                <Col lg>
                  <div className="mb-3">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Months At Current Address"
                      className="mb-3"
                    >
                      <input
                        type="number"
                        className="form-control"
                        name="coApplicantMonthsAtCurrentAddress"
                        placeholder="Months At Current Address"
                      />
                      <ValidationError
                        field="coApplicantMonthsAtCurrentAddress"
                        prefix="coApplicantMonthsAtCurrentAddress"
                        errors={state.errors}
                      />
                    </FloatingLabel>
                  </div>
                </Col>
              </Row>
              <Row>
                <div className="d-flex justify-content-start my-3">
                  <h4 className="">
                    Employment Information
                    <GradBar />
                  </h4>
                </div>
                <Col lg>
                  <div className="mb-3">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Name of Employer"
                      className="mb-3"
                    >
                      <input
                        type="text"
                        className="form-control"
                        name="coApplicantNameOfEmployer"
                        placeholder="Name of Employer"
                      />
                      <ValidationError
                        field="coApplicantNameOfEmployer"
                        prefix="coApplicantNameOfEmployer"
                        errors={state.errors}
                      />
                    </FloatingLabel>
                  </div>
                </Col>
                <Col lg>
                  <div className="mb-3">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Title/Position"
                      className="mb-3"
                    >
                      <input
                        type="text"
                        className="form-control"
                        name="coApplicantOccupation"
                        placeholder="Title/Position"
                      />
                      <ValidationError
                        field="coApplicantOccupation"
                        prefix="coApplicantOccupation"
                        errors={state.errors}
                      />
                    </FloatingLabel>
                  </div>
                </Col>
                <Col lg>
                  <div className="mb-3">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Work Phone"
                      className="mb-3"
                    >
                      <PhoneNumberInput
                        name={'coApplicantWorkphone'}
                        isRequired={false}
                      />
                      <ValidationError
                        field="coApplicantWorkphone"
                        prefix="coApplicantWorkphone"
                        errors={state.errors}
                      />
                    </FloatingLabel>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg>
                  <div className="mb-3">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Gross Monthly Income"
                      className="mb-3"
                    >
                      <NumberFormat
                        name="coApplicantGrossMonthlyIncome"
                        className="form-control"
                        placeholder="Gross Monthly Income"
                        thousandSeparator={true}
                        prefix={"$"}
                      />
                      <ValidationError
                        field="coApplicantGrossMonthlyIncome"
                        prefix="coApplicantGrossMonthlyIncome"
                        errors={state.errors}
                      />
                    </FloatingLabel>
                  </div>
                </Col>
                <Col lg>
                  <div className="mb-3">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Employment Length, Years:"
                      className="mb-3"
                    >
                      <input
                        type="number"
                        className="form-control"
                        name="coApplicantEmploymentLengthInYears"
                        placeholder="Employment Length, Years:"
                      />
                      <ValidationError
                        field="coApplicantEmploymentLengthInYears"
                        prefix="coApplicantEmploymentLengthInYears"
                        errors={state.errors}
                      />
                    </FloatingLabel>
                  </div>
                </Col>
                <Col lg>
                  <div className="mb-3">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Employment Length, Months:"
                      className="mb-3"
                    >
                      <input
                        type="number"
                        className="form-control"
                        name="coApplicantEmploymentLengthInMonths"
                        placeholder="Employment Length, Months:"
                      />
                      <ValidationError
                        field="coApplicantEmploymentLengthInMonths"
                        prefix="coApplicantEmploymentLengthInMonths"
                        errors={state.errors}
                      />
                    </FloatingLabel>
                  </div>
                </Col>
              </Row>
            </Tab>
          </Tabs>
          <Row className="m-3">
            <Col>
              <p className="">
                By Signing Above, You Authorize{" "}
                <em>Guardian Automobile Sales </em>
                To Make A Credit Inquiry For The Purpose of Obtaining Auto
                Financing. You agree that if an account is created for you, all
                of the following also apply: [a] we may monitor and record
                telephone calls regarding your account to assure that quality of
                our service or for other reason; [b] you expressly consent to us
                using prerecorded/articial voice messages, text messages and/or
                automatic dialing equipment while servicing or collecting your
                account, as the law allows; [c] you agree that we may take these
                actions using the telephone number(s) and/or email addresses(s)
                that you provide us in the credit application, you provide us in
                the future, or we get from another source, even if the number is
                for a mobile or cellular telephone and/or our using the number
                results in charges to you.
              </p>
            </Col>
          </Row>
          <Row className="text-center m-3">
            <Col>
              <input
                type="checkbox"
                id="terms"
                name="termsAgreement"
                value="I accept the terms above"
                required
              />
              <label for="terms">I accept the terms above.</label>
              <br />
            </Col>
            <Col>
              <Button
                type="submit"
                disabled={state.submitting}
                variant="primary"
              >
                Send <FiSend />
              </Button>
            </Col>
          </Row>
        </form>
      </Container>
      <style jsx global>{`
        .form-control:focus {
          // color: var(--secondary-color);
          background-color: #fff;
          border-color: var(--main-color);
          outline: 0;
          box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 25%);
        }
        .sigCanvasProps {
          width: 100%;
          height: 100%;
          margin: 0 auto;
        }
        .sigPad {
          width: 100%;
          height: 75%;
        }
        .nav-tabs .nav-link:hover,
        .nav-tabs .nav-link:focus {
          color: var(--main-color);
        }
        .nav-link {
          color: var(--rich-black);
        }
        .nav-tabs .nav-link.active,
        .nav-tabs .nav-item.show .nav-link {
          color: var(--rich-black);
        }
        #terms {
          margin-right: 10px !important;
        }
      `}</style>
    </>
  );
}
export default CreditApplicationForm;
