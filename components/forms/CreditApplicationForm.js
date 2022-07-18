import React, { useState, useRef } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { FiSend } from "react-icons/fi";
import { HiBadgeCheck } from "react-icons/hi";
import GradBar from "../GradBar";
import SignatureCanvas from 'react-signature-canvas'
import PhoneNumberInput from "../PhoneNumberInput";
import {
  Table,
  Button,
  Card,
  Modal,
  Row,
  Col,
  Form,
  FloatingLabel,
  Container
} from "react-bootstrap";
import { useRouter } from "next/router";

function CreditApplicationForm({ setCar }) {
  const [state, handleSubmit] = useForm("creditApplicationForm");
  const [firstName, setFirstName] = useState("");
  const [socialInput, setSocialInput] = useState("");
  const [trimmedDataUrl, setTrimmedDataUrl] = useState("");
  const applicantSigRef = React.useRef();
  const coApplicantSigRef = React.useRef();
  const router = useRouter();
  
  // state = {trimmedDataURL: null}
  let applicantSigPad = {}
  let coApplicantSigPad = {}

  const clearApplicantSigPad = () => {
    applicantSigPad.clear()
  }
  const clearCoApplicantSigPad = () => {
    coApplicantSigPad.clear()
  }
  const trimApplicantSigPad = () => {
    this.setState({trimmedDataURL: this.sigPad.getTrimmedCanvas()
      .toDataURL('image/png')})
  }

  if (state.succeeded) {
    return (
      <>
        <h5 className="text-center mt-3">
          Your credit application has been successfully sent ✅{" "}
          <br /> We will get back to you as soon as possible
        </h5>
      </>
    );
  }

  return (
    <>
      <div className="d-flex justify-content-center my-5">
        <h2 className="">
          Applicant Information
          <GradBar />
        </h2>
      </div>
      <Container>

        <form className="mx-5" onSubmit={handleSubmit} method="post">
          <Row>
            <Col lg={3}>
              <FloatingLabel
                controlId="floatingInput"
                label="First Name"
                className="mb-3"
              >
                <input
                  type="text"
                  className="form-control"
                  name="First Name"
                  id="firstName"
                  placeholder="First Name"
                  autoFocus
                  required
                />
              </FloatingLabel>
            </Col>
            <Col lg={3}>
              <FloatingLabel
                controlId="floatingInput"
                label="Last Name"
                className="mb-3"
              >
                <input
                  type="text"
                  className="form-control"
                  name="Last Name"
                  id="lastName"
                  placeholder="Last Name"
                  required
                />
              </FloatingLabel>
            </Col>
            <Col lg={3}>
              <FloatingLabel
                controlId="floatingInput"
                label="Middle Name"
                className="mb-3"
              >
                <input
                  type="text"
                  className="form-control"
                  name="Middle Name"
                  placeholder="Middle Name"
                  id="middleName"
                />
              </FloatingLabel>
            </Col>
            <Col lg={3}>
              <FloatingLabel
                controlId="floatingInput"
                label="Social Security Number"
                className="mb-3"
              >
                <input
                  type="number"
                  className="form-control"
                  name="Social Security Number"
                  id="socialSecurityNumber"
                  placeholder="Social Security Number"
                  required
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Row>
            <Col lg={3}>
              <FloatingLabel
                controlId="floatingInput"
                label="Birth Date"
                className="mb-3"
              >
                <input
                  type="date"
                  className="form-control"
                  name="Birth Date"
                  placeholder="Birth Date"
                  id="birthDate"
                  required
                />
              </FloatingLabel>
            </Col>
            <Col lg={3}>
              <FloatingLabel
                controlId="floatingInput"
                label="Address"
                className="mb-3"
              >
                <input
                  type="text"
                  className="form-control"
                  name="Address"
                  placeholder="Address"
                  id="address"
                  required
                />
              </FloatingLabel>
            </Col>
            <Col lg={2}>
              <div className="mb-3">
                <FloatingLabel controlId="floatingSelect" label="Rent?">
                  <select
                    className="form-control"
                    name="Does Rent?"
                    aria-label="Rent label"
                  >
                    <option>Select...</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </FloatingLabel>
              </div>
            </Col>
            <Col lg={2}>
              <div className="mb-3">
                <FloatingLabel controlId="floatingSelect" label="Home Owner?">
                  <select
                    className="form-control"
                    name="Is a Homeowner?"
                    aria-label="Homeowner label"
                  >
                    <option>Select...</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </FloatingLabel>
              </div>
            </Col>
            <Col lg={2}>
              <div className="mb-3">
                <FloatingLabel controlId="floatingSelect" label="Family?">
                  <select
                    className="form-control"
                    name="Family?"
                    aria-label="Family label"
                  >
                    <option>Select...</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </FloatingLabel>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={2}>
              <div className="mb-3">
                <FloatingLabel
                  controlId="floatingInput"
                  label="City/Town"
                  className="mb-3"
                >
                  <input
                    type="text"
                    className="form-control"
                    name="City/Town"
                    placeholder="City/Town"
                    id="cityOrTown"
                    required
                  />
                </FloatingLabel>
              </div>
            </Col>
            <Col lg={3}>
              <div className="mb-3">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Years At Current Address"
                  className="mb-3"
                >
                  <input
                    type="number"
                    className="form-control"
                    name="Years At Current Address"
                    id="yearsAtCurrentAddress"
                    placeholder="Years"
                    required
                  />
                </FloatingLabel>
              </div>
            </Col>
            <Col lg={3}>
              <div className="mb-3">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Months At Current Address"
                  className="mb-3"
                >
                  <input
                    type="number"
                    className="form-control"
                    name="Months At Current Address"
                    id="monthsAtCurrentAddress"
                    placeholder="Months"
                    required
                  />
                </FloatingLabel>
              </div>
            </Col>
            <Col lg={2}>
              <div className="mb-3">
                <FloatingLabel
                  controlId="floatingInput"
                  label="State"
                  className="mb-3"
                >
                  <input
                    type="text"
                    className="form-control"
                    name="State"
                    placeholder="State"
                    id="state"
                    required
                  />
                </FloatingLabel>
              </div>
            </Col>
            <Col lg={2}>
              <div className="mb-3">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Zip Code"
                  className="mb-3"
                >
                  <input
                    type="number"
                    className="form-control"
                    name="Zip Code"
                    placeholder="Zip Code"
                    pattern="[0-9]{5}"
                    id="zipCode"
                    required
                  />
                </FloatingLabel>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={3}>
              <div className="mb-3">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Cell Phone"
                  className="mb-3"
                >
                  <PhoneNumberInput />
                </FloatingLabel>
              </div>
            </Col>
            <Col lg={3}>
              <div className="mb-3">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Rent/Mortage"
                  className="mb-3"
                >
                  <input
                    type="number"
                    className="form-control"
                    name="Rent/Mortage Amout"
                    placeholder="Rent/Mortage"
                    id="rentOrMortage"
                    required
                  />
                </FloatingLabel>
              </div>
            </Col>
            <Col lg={3}>
              <div className="mb-3">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Employer"
                  className="mb-3"
                >
                  <input
                    type="text"
                    className="form-control"
                    name="Name of Employer"
                    placeholder="Employer"
                    id="employer"
                    required
                  />
                </FloatingLabel>
              </div>
            </Col>
            <Col lg={3}>
              <div className="mb-3">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Occupation"
                  className="mb-3"
                >
                  <input
                    type="text"
                    className="form-control"
                    name="Occupation"
                    placeholder="Occupation"
                    id="occupation"
                    required
                  />
                </FloatingLabel>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={4}>
              <div className="mb-3">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Employment Length, Years:"
                  className="mb-3"
                >
                  <input
                    type="text"
                    className="form-control"
                    name="Employment Length In Years:"
                    placeholder="Employment Length, Years:"
                    id="employmentLengthYears"
                    required
                  />
                </FloatingLabel>
              </div>
            </Col>
            <Col lg={4}>
              <div className="mb-3">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Employment Length, Months:"
                  className="mb-3"
                >
                  <input
                    type="text"
                    className="form-control"
                    name="Employment Length In Months:"
                    placeholder="Employment Length, Months:"
                    id="employmentLengthMonths"
                    required
                  />
                </FloatingLabel>
              </div>
            </Col>
            <Col lg={4}>
              <div className="mb-3">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Previous Employer/Occupation"
                  className="mb-3"
                >
                  <input
                    type="text"
                    className="form-control"
                    name="Previous Employer/Occupation"
                    placeholder="Previous Employer/Occupation"
                    id="previousEmployer"
                    required
                  />
                </FloatingLabel>
              </div>
            </Col>
          </Row>
          <Row className="d-flex justify-content-center">
            <Col lg={3}>
              <div className="mb-3">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Gross Income $"
                  className="mb-3"
                >
                  <input
                    type="text"
                    className="form-control"
                    name="Gross Income $"
                    placeholder="Gross Income $"
                    id="grossIncome"
                    required
                  />
                </FloatingLabel>
              </div>
            </Col>
            <Col lg={3}>
              <div className="mb-3">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Work Phone"
                  className="mb-3"
                >
                  <PhoneNumberInput />
                </FloatingLabel>
              </div>
            </Col>
            <Col lg={3}>
              <div className="mb-3">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Email"
                  className="mb-3"
                >
                  <input
                    type="email"
                    className="form-control"
                    name="Email"
                    placeholder="Email"
                    id="email"
                    required
                  />
                </FloatingLabel>
              </div>
            </Col>
          </Row>
          <div className="d-flex justify-content-center my-5">
            <h2>
              CoApplicant Information
              <GradBar />
            </h2>
          </div>
          <Row>
            <Col lg={3}>
              <FloatingLabel
                controlId="firstName"
                label="First Name"
                className="mb-3"
              >
                <input
                  type="text"
                  className="form-control"
                  name="First Name"
                  id="firstName"
                  placeholder="First Name"
                  required
                />
              </FloatingLabel>
            </Col>
            <Col lg={3}>
              <FloatingLabel
                controlId="floatingInput"
                label="Last Name"
                className="mb-3"
              >
                <input
                  type="text"
                  className="form-control"
                  name="Last Name"
                  id="lastName"
                  placeholder="Last Name"
                  required
                />
              </FloatingLabel>
            </Col>
            <Col lg={3}>
              <FloatingLabel
                controlId="floatingInput"
                label="Middle Name"
                className="mb-3"
              >
                <input
                  type="text"
                  className="form-control"
                  name="Middle Name"
                  placeholder="Middle Name"
                  id="middleName"
                />
              </FloatingLabel>
            </Col>
            <Col lg={3}>
              <FloatingLabel
                controlId="floatingInput"
                label="Social Security Number"
                className="mb-3"
              >
                <input
                  type="number"
                  className="form-control"
                  name="Social Security Number"
                  id="socialSecurityNumber"
                  placeholder="Social Security Number"
                  required
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Row>
            <Col lg={3}>
              <FloatingLabel
                controlId="floatingInput"
                label="Birth Date"
                className="mb-3"
              >
                <input
                  type="date"
                  className="form-control"
                  name="Birth Date"
                  placeholder="Birth Date"
                  id="birthDate"
                  required
                />
              </FloatingLabel>
            </Col>
            <Col lg={3}>
              <FloatingLabel
                controlId="floatingInput"
                label="Address"
                className="mb-3"
              >
                <input
                  type="text"
                  className="form-control"
                  name="Address"
                  placeholder="Address"
                  id="address"
                  required
                />
              </FloatingLabel>
            </Col>
            <Col lg={2}>
              <div className="mb-3">
                <FloatingLabel controlId="floatingSelect" label="Rent?">
                  <select
                    className="form-control"
                    name="Does Rent?"
                    aria-label="Rent label"
                  >
                    <option>Select...</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </FloatingLabel>
              </div>
            </Col>
            <Col lg={2}>
              <div className="mb-3">
                <FloatingLabel controlId="floatingSelect" label="Home Owner?">
                  <select
                    className="form-control"
                    name="Is a Homeowner?"
                    aria-label="Homeowner label"
                  >
                    <option>Select...</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </FloatingLabel>
              </div>
            </Col>
            <Col lg={2}>
              <div className="mb-3">
                <FloatingLabel controlId="floatingSelect" label="Family?">
                  <select
                    className="form-control"
                    name="Family?"
                    aria-label="Family label"
                  >
                    <option>Select...</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </FloatingLabel>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={2}>
              <div className="mb-3">
                <FloatingLabel
                  controlId="floatingInput"
                  label="City/Town"
                  className="mb-3"
                >
                  <input
                    type="text"
                    className="form-control"
                    name="City/Town"
                    placeholder="City/Town"
                    id="cityOrTown"
                    required
                  />
                </FloatingLabel>
              </div>
            </Col>
            <Col lg={3}>
              <div className="mb-3">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Years At Current Address"
                  className="mb-3"
                >
                  <input
                    type="number"
                    className="form-control"
                    name="Years At Current Address"
                    id="yearsAtCurrentAddress"
                    placeholder="Years"
                    required
                  />
                </FloatingLabel>
              </div>
            </Col>
            <Col lg={3}>
              <div className="mb-3">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Months At Current Address"
                  className="mb-3"
                >
                  <input
                    type="number"
                    className="form-control"
                    name="Months At Current Address"
                    id="monthsAtCurrentAddress"
                    placeholder="Months"
                    required
                  />
                </FloatingLabel>
              </div>
            </Col>
            <Col lg={2}>
              <div className="mb-3">
                <FloatingLabel
                  controlId="floatingInput"
                  label="State"
                  className="mb-3"
                >
                  <input
                    type="text"
                    className="form-control"
                    name="State"
                    placeholder="State"
                    id="state"
                    required
                  />
                </FloatingLabel>
              </div>
            </Col>
            <Col lg={2}>
              <div className="mb-3">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Zip Code"
                  className="mb-3"
                >
                  <input
                    type="number"
                    className="form-control"
                    name="Zip Code"
                    placeholder="Zip Code"
                    pattern="[0-9]{5}"
                    id="zipCode"
                    required
                  />
                </FloatingLabel>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={3}>
              <div className="mb-3">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Cell Phone"
                  className="mb-3"
                >
                  <PhoneNumberInput />
                </FloatingLabel>
              </div>
            </Col>
            <Col lg={3}>
              <div className="mb-3">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Rent/Mortage"
                  className="mb-3"
                >
                  <input
                    type="number"
                    className="form-control"
                    name="Rent/Mortage Amout"
                    placeholder="Rent/Mortage"
                    id="rentOrMortage"
                    required
                  />
                </FloatingLabel>
              </div>
            </Col>
            <Col lg={3}>
              <div className="mb-3">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Employer"
                  className="mb-3"
                >
                  <input
                    type="text"
                    className="form-control"
                    name="Name of Employer"
                    placeholder="Employer"
                    id="employer"
                    required
                  />
                </FloatingLabel>
              </div>
            </Col>
            <Col lg={3}>
              <div className="mb-3">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Occupation"
                  className="mb-3"
                >
                  <input
                    type="text"
                    className="form-control"
                    name="Occupation"
                    placeholder="Occupation"
                    id="occupation"
                    required
                  />
                </FloatingLabel>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={4}>
              <div className="mb-3">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Employment Length, Years:"
                  className="mb-3"
                >
                  <input
                    type="text"
                    className="form-control"
                    name="Employment Length In Years:"
                    placeholder="Employment Length, Years:"
                    id="employmentLengthYears"
                    required
                  />
                </FloatingLabel>
              </div>
            </Col>
            <Col lg={4}>
              <div className="mb-3">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Employment Length, Months:"
                  className="mb-3"
                >
                  <input
                    type="text"
                    className="form-control"
                    name="Employment Length In Months:"
                    placeholder="Employment Length, Months:"
                    id="employmentLengthMonths"
                    required
                  />
                </FloatingLabel>
              </div>
            </Col>
            <Col lg={4}>
              <div className="mb-3">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Previous Employer/Occupation"
                  className="mb-3"
                >
                  <input
                    type="text"
                    className="form-control"
                    name="Previous Employer/Occupation"
                    placeholder="Previous Employer/Occupation"
                    id="previousEmployer"
                    required
                  />
                </FloatingLabel>
              </div>
            </Col>
          </Row>
          <Row className="d-flex justify-content-center">
            <Col lg={3}>
              <div className="mb-3">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Gross Income $"
                  className="mb-3"
                >
                  <input
                    type="text"
                    className="form-control"
                    name="Gross Income $"
                    placeholder="Gross Income $"
                    id="grossIncome"
                    required
                  />
                </FloatingLabel>
              </div>
            </Col>
            <Col lg={3}>
              <div className="mb-3">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Work Phone"
                  className="mb-3"
                >
                  <PhoneNumberInput />
                </FloatingLabel>
              </div>
            </Col>
            <Col lg={3}>
              <div className="mb-3">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Email"
                  className="mb-3"
                >
                  <input
                    type="email"
                    className="form-control"
                    name="Email"
                    placeholder="Email"
                    id="email"
                    required
                  />
                </FloatingLabel>
              </div>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col lg={6} className="mb-5">
                <h3>
                  Applicant Signature
                  <GradBar/>
                </h3>
              <div className="sigPad bg-white">
                <SignatureCanvas name="applicantSig" penColor='black' canvasProps={{className: 'sigCanvasProps'}} ref={(ref) => { applicantSigPad = ref }} />  
                <Button onClick={clearApplicantSigPad} >Clear</Button>
              </div>
            </Col>
            <Col lg={6} className="mb-5">
              <h3>
                  CoApplicant Signature
                  <GradBar/>
              </h3>
              <div className="sigPad bg-white">
                <SignatureCanvas name-="CoApplicantSig" penColor='black' canvasProps={{className: 'sigCanvasProps'}} ref={(ref) => { coApplicantSigPad = ref }} />  
                <Button onClick={clearCoApplicantSigPad}>Clear</Button>
              </div>
            </Col>
          </Row>
          <Row className="m-3">
            <Col>
              <p className="">
                By Signing Above, You Authorize <em>Guardian Automobile Sales</em>{" "}
                To Make A Credit Inquiry For The Purpose of Obtaining Auto
                Financing. You agree that if an account is created for you, all of
                the following also apply: [a] we may monitor and record telephone
                calls regarding your account to assure that quality of our service
                or for other reason; [b] you expressly consent to us using
                prerecorded/articial voice messages, text messages and/or
                automatic dialing equipment while servicing or collecting your
                account, as the law allows; [c] you agree that we may take these
                actions using the telephone number(s) that you provide us in the
                credit application, you provide us in the future, or we get from
                another source, even if the number is for a mobile or cellular
                telephone and/or our using the number results in charges to you.
              </p>
            </Col>
          </Row>
          <Row className="text-center m-3">
            <Col>
              <Button type="submit" disabled={state.submitting} variant="primary">
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
        `}</style>
    </>
  );
}
export default CreditApplicationForm;
