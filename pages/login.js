import { useRouter } from "next/router";
import Link from "next/link";
import React, { useState } from "react";
import {
  Button,
  Form,
  FloatingLabel,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import GradBar from "../components/GradBar";
import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SubFooter from "../components/SubFooter";

export default function Login() {
  const router = useRouter();
  const { user, login } = useAuth();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log(user);
    try {
      await login(data.email, data.password);
      toast.success("Login successful, loading dashboard");
      setTimeout(() => {
        router.push("/carDashboard");
      }, 3000);
    } catch (err) {
      const errorMessage = err.message;
      const errorCode = err.code;
      console.log("Error during login: ", errorMessage, errorCode);
      toast.error("Login Error -> " + errorCode);
    }
  };

  return (
    <>
      <>
        <ToastContainer draggable={false} transition={Zoom} autoClose={3000} />
      </>

      <Container className="mt-5 p-5">
        <Row>
          <Col>
            <h1 className="text-center my-3 ">
              Admin Login
              <div className="mt-3">
                <GradBar />
              </div>
            </h1>
            <div className="text-center mb-3">
              <Link href="/">
                <a>Back to Home</a>
              </Link>
            </div>
            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Email address"
                  className="mb-3"
                >
                  <Form.Control
                    onChange={(e) => {
                      setData({
                        ...data,
                        email: e.target.value,
                      });
                    }}
                    value={data.email}
                    required
                    type="email"
                    placeholder="Enter email"
                  />
                </FloatingLabel>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Password"
                  className="mb-3"
                >
                  <Form.Control
                    onChange={(e) => {
                      setData({
                        ...data,
                        password: e.target.value,
                      });
                    }}
                    value={data.password}
                    required
                    type="password"
                    placeholder="Password"
                  />
                </FloatingLabel>
              </Form.Group>
              <div className="d-flex justify-content-center">
                <Button className="mt-3" variant="primary" type="submit">
                  Login
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
      <SubFooter />
    </>
  );
}

