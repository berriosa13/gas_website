import React from 'react';
import { useForm } from '@formspree/react';
import { FiSend } from "react-icons/fi";
import { HiBadgeCheck } from "react-icons/hi";
import { Button, Col, Row, FloatingLabel } from "react-bootstrap";


function TestDriveForm( { setCar }) {
  const [state, handleSubmit] = useForm("testDriveForm");
  const defaultMessageText = "Hello, I am scheduling a test drive for the " + setCar.year + " " + setCar.make + " " + setCar.model;

  if (state.succeeded) {
      return (
        <>
            <h5 className="text-center mt-3">Your test drive request has been successfully sent <HiBadgeCheck/> <br/> We will get back to you as soon as possible</h5>
        </>
      )
  }
  return (
    <>
      <form onSubmit={handleSubmit} method="POST" role="form">
        <Row>
          <Col md={4}>
            <FloatingLabel
              controlId="firstName"
              label="First Name"
              className="mb-3"
            >
                <input
                type="text"
                className="form-control"
                name="firstName"
                id="firstName"
                autoFocus
                required
              />
            </FloatingLabel>
          </Col>
          <Col md={4}>
            <FloatingLabel
              controlId="floatingInput"
              label="Last Name"
              className="mb-3"
            >
              <input
                type="text"
                className="form-control"
                name="lastName"
                id="lastName"
                required
                />
            </FloatingLabel>
          </Col>
          <Col md={4}>
            <FloatingLabel
              controlId="floatingInput"
              label="Phone"
              className="mb-3"
            >
              <input
                type="number"
                className="form-control"
                name="phone"
                id="phone"
                required
                />
            </FloatingLabel>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FloatingLabel
              controlId="floatingInput"
              label="Email"
              className="mb-3"
            >
              <input
                type="text"
                className="form-control"
                name="email"
                id="email"
                required
                />
            </FloatingLabel>
          </Col>
          <Col md={6}>
            <FloatingLabel
              controlId="floatingSelect"
              label="Contact Preference"
            >
              <select className="form-control" name="contactPreference" aria-label="Contact preference select label">
                <option>Select...</option>
                <option value="email">Email</option>
                <option value="phone">Phone</option>
                <option value="text-message">SMS</option>
              </select>
            </FloatingLabel>
          </Col>
        </Row>
        <Row className="mb-3">
            <Col md={6}>
            <FloatingLabel
              controlId="floatingDate"
              label="Choose a Date"
            >
            <input
                type="date"
                className="form-control"
                name="Scheduled Date"
                required
            />
            </FloatingLabel>
            </Col>
            <Col md={6}>
            <FloatingLabel
              controlId="floatingTime"
              label="Choose a Time"
            >
            <input
                type="time"
                className="form-control"
                name="Scheduled Time"
                required
            />
            </FloatingLabel>
            </Col>
        </Row>
        <Row>
          <Col md={12}>
            <div className="form-group mb-3" controlId="formContactPreference">
              <FloatingLabel controlId="description" label="Comments">
                <input
                type="text"
                as="textarea"
                className="form-control"
                name="comments"
                comments
                defaultValue={defaultMessageText}
                required
                />
              </FloatingLabel>
            </div>
          </Col>
        </Row>
        <Row className="m-3">
          <Col>
            <p className="">By clicking SEND, I consent to be contacted by <em>Guardian Automobile Sales</em> at any phone number or email I provide, including, without limitation, communications sent via text message to my cell phone or communications sent using an autodialer or prerecorded message. This acknowledgment constitutes my written consent to receive such communications. I have read and agree to the Privacy Policy of <em>Guardian Automobile Sales</em>.</p>
          </Col>
        </Row>
        <Row className="text-center m-3">
          <Col>
            <Button type="submit" disabled={state.submitting} variant="primary">
              Send <FiSend />
            </Button>
          </Col>
        </Row>
        <style jsx>{`
          .form-control:focus {
            // color: var(--secondary-color);
            background-color: #fff;
            border-color: var(--main-color);
            outline: 0;
            box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 25%);
          }
          h2 {
            color: var(--main-color);
            font-weight: bold;
          }
        `}</style>
      </form>
    </>
  );
}
export default TestDriveForm;
