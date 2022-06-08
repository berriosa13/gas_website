import Head from "next/head";
import { Breadcrumb, Row, Button } from "react-bootstrap";
import { FiSend } from "react-icons/fi";
import styles from "../styles/page_styles/Contact.module.css";

export default function Contact() {
  return (
    <>
      <Head>
        <title>GAS Automobile Sales | Contact</title>
        <meta name="keywords" content="cars" />
      </Head>
      <div className="d-flex justify-content-between">
        <h1>Contact</h1>
        <Breadcrumb>
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/contact">Contact</Breadcrumb.Item>
          <style jsx global>{`
            a {
              color: var(--main-color) !important;
            } 
            a:hover {
              color: var(--secondary-color) !important;
            }
          `}</style>
        </Breadcrumb>
      </div> 
        <Row>
          <iframe src="https://maps.google.com/maps?q=1033%20reeves%20street%20dunmore&t=&z=15&ie=UTF8&iwloc=&output=embed" width="100%" height="380" frameborder="0" allowfullscreen></iframe>
        </Row>
        <Row className="mt-5"> 
          <h2 className="text-center">Questions?</h2>
        </Row>
        <Row>
              <div className="form contact-form mt-5">
                <form action="" method="POST" role="form" className="messageForm">
                  <div className="form-group">
                    <input type="text" name="name" className="form-control" id="name" placeholder="Your Name" required/>
                  </div>
                  <div className="form-group mt-3">
                    <input type="email" className="form-control" name="email" id="email" placeholder="Your Email" required/>
                  </div>
                  <div className="form-group mt-3">
                    <input type="text" className="form-control" name="subject" id="subject" placeholder="Subject" required/>
                  </div>
                  <div className="form-group mt-3">
                    <textarea className="form-control" name="message" rows="5" placeholder="Message" required></textarea>
                  </div>
                  <div className="text-center mt-5"><Button size="lg" variant="primary">Send <FiSend/></Button>{' '}</div>
                </form>
                <style jsx>{`
                .form-control:focus {
                  // color: var(--secondary-color);
                  background-color: #fff;
                  border-color: var(--main-color);
                  outline: 0;
                  box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 25%);
                }
              `}</style>
              </div>
        </Row>

    </>
  );
}
