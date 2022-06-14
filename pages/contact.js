import Head from "next/head";
import Layout from '../components/Layout'
import { Breadcrumb, Row, Button, Col } from "react-bootstrap";
import { FiSend } from "react-icons/fi";
import styles from "../styles/page_styles/Contact.module.css";
import GradBar from "../components/GradBar"
import { BsAlarm, BsCalendar2Check, BsCalendarX  } from "react-icons/bs";

export default function Contact() {
  return (
    <>
      <Head>
        <title>GAS Automobile Sales | Contact</title>
        <meta name="keywords" content="cars" />
      </Head>
      <div className="d-flex justify-content-between my-5">
        <h1>
          Contact
        <GradBar/>
        </h1>
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
        <style jsx global>{`
            h2 {
              color: var(--main-color);
              font-weight: bold;
            }
            h2:hover {
              color: var(--secondary-color);
              font-weight: bold;
            }
            p > svg {
              color: var(--main-color);
            }
          `}</style>
          <Col md={4}>
            <h2>
              Guardian Automobile Sales
            </h2>
            <p className="text-left">
              1033 Reeves St, Dunmore Pa, 18512
              <br/>
              (570)123 4567
              <br/>
              info@gasautomobilesales.com
              <br/>
            </p>
            <Row>
              <h2 className="pb-3 text">Hours:</h2>
              <Col className="d-flex flex-column justify-content-start">
                <p><BsCalendar2Check/> Monday</p>
                <p><BsCalendar2Check/> Tuesday</p>
                <p><BsCalendar2Check/> Wednesday</p>
                <p><BsCalendar2Check/> Thursday</p>
                <p><BsCalendar2Check/> Friday</p>
                <p><BsCalendar2Check/> Saturday</p>
                <p><BsCalendarX/> Sunday</p>
              </Col>
              <Col className="d-flex flex-column justify-content-start">
                <p><BsAlarm/> 10:00AM - 5:00PM</p>
                <p><BsAlarm/> 10:00AM - 5:00PM</p>
                <p><BsAlarm/> 10:00AM - 5:00PM</p>
                <p><BsAlarm/> 10:00AM - 5:00PM</p>
                <p><BsAlarm/> 10:00AM - 5:00PM</p>
                <p><BsAlarm/> 10:00AM - 1:00PM</p>
                <p><BsCalendarX/> CLOSED</p>
              </Col>

            </Row>

            
          </Col>
          <Col md={8}>
            <iframe src="https://maps.google.com/maps?q=1033%20reeves%20street%20dunmore&t=&z=15&ie=UTF8&iwloc=&output=embed" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>
          </Col>
        </Row>
        <Row className="mt-5"> 
          <h2 className="text-center">
            Questions?
          </h2>
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
                h2 {
                  color: var(--main-color);
                  font-weight: bold;
                }
              `}</style>
              </div>
        </Row>

    </>
  );
}

Contact.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}
