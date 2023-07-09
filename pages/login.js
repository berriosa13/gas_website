import { useRouter } from "next/router";
import Link from "next/link";
import React, { useState, useRef  } from "react";
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

import SubFooter from "../components/SubFooter";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export default function Login() {
  const emailRef = useRef();
  const pwdRef = useRef();
  const router = useRouter();
  const { user, login, forgotPassword } = useAuth();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [sentForgotPwdEmail, setSentForgotPwdEmail] = useState(false);
  const MySwal = withReactContent(Swal);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(data.email, data.password);
      MySwal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Login successful, loading dashboard',
        showConfirmButton: false,
        timer: 2000
      });
      setTimeout(() => {
        router.push("/carDashboard");
      }, 3000);
    } catch (err) {
      console.log("Error during login: ", err.message, err.code);
      MySwal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Invalid username or password.',
        showConfirmButton: false,
        timer: 2000
      });
    }
  };

  const forgotPasswordHandler = () => {
    const email = emailRef.current.value;
    if (email)
      forgotPassword(email).then(() => {
        emailRef.current.value = "";
        pwdRef.current.value = "";
        setData({
          email: "",
          password: ""
        });
        setSentForgotPwdEmail(true);
      }).catch((err) => {
        console.log("Error during login: ", err.message, err.code);
        setSentForgotPwdEmail(true);
      });
    
  };

  return (
    <>
      <Container className="mt-5 pt-5">
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
                <a className="underline-link">Back to Home</a>
              </Link>
            </div>
            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <FloatingLabel
                  controlId="emailFloatingInput"
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
                    autoComplete="current-email"
                    placeholder="Enter email"
                    ref={emailRef}
                  />
                </FloatingLabel>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <FloatingLabel
                  controlId="passwordFloatingInput"
                  label="Password"
                  className="mb-3"
                >
                  <Form.Control
                    name="password"
                    onChange={(e) => {
                      setData({
                        ...data,
                        password: e.target.value,
                      });
                    }}
                    value={data.password}
                    required
                    type="password"
                    autoComplete="current-password"
                    placeholder="Password"
                    ref={pwdRef}
                    
                  />
                </FloatingLabel>
              </Form.Group>
              <div className="d-flex justify-content-center">
                <Button className="mt-3" variant="primary" type="submit">
                  Login
                </Button>
              </div>
              <div className="d-flex justify-content-center m-5">
              {sentForgotPwdEmail ? (
                <p>If an account exists under the email provided, a password reset email has been sent.</p>
                ) : (
                  <p className="underline-link" onClick={forgotPasswordHandler}>Forgot Password?</p>
              )}
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
      <SubFooter />
    </>
  );
}

