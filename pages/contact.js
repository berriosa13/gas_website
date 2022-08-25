import React, { useState } from "react";
import { NextSeo  } from "next-seo"; 
import Layout from '../components/Layout'
import Link from 'next/link';
import { Breadcrumb, Row, Button, Col } from "react-bootstrap";
import styles from "../styles/page_styles/Contact.module.css";
import GradBar from "../components/GradBar"
import { BsAlarm, BsCalendar2Check, BsCalendarX  } from "react-icons/bs";
import ContactForm from "../components/forms/ContactForm";
import { TailSpin } from  'react-loader-spinner';



export default function Contact() {
  
  const [loading, setLoading] = useState(true);

  const hideSpinner = () => {
    setLoading(false);
  }

  return (
    <>
      <NextSeo
        title="Guardian Automobile Sales | Contact"
        description="Send us a message for any questions or concerns"
        canonical="https://www.gasautomobilesales.com/"
        openGraph={{
          url: "https://www.gasautomobilesales.com/",
          title: "Guardian Automobile Sales | Contact",
          description: "Send us a message for any questions or concerns.",
          images: [
            {
              url: "/imgs/GAS-Text-Only-2-Color.png",
              width: 800,
              height: 600,
              alt: "Og GAS Text Logo",
              type: "image/png",
            },
          ],
          site_name: "gasautomobilesales",
        }}
      />
      <div className="d-flex justify-content-between my-5">
        <h1>
          Contact
          <GradBar />
        </h1>
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
          <h2>Guardian Automobile Sales</h2>
          <p className="text-left">
            1033 Reeves St, Dunmore Pa, 18512
            <br />
            <a href="tel:570-800-1208">(570)-800-1208</a>
            <br />
            <a href="mailto:info@gasautomobilesales.com">
              info@gasautomobilesales.com
            </a>
            <br />
          </p>
          <Row>
            <h2 className="pb-3 text">Hours:</h2>
            <Col className="d-flex flex-column justify-content-start">
              <p>
                <BsCalendar2Check /> Monday
              </p>
              <p>
                <BsCalendar2Check /> Tuesday
              </p>
              <p>
                <BsCalendar2Check /> Wednesday
              </p>
              <p>
                <BsCalendar2Check /> Thursday
              </p>
              <p>
                <BsCalendar2Check /> Friday
              </p>
              <p>
                <BsCalendar2Check /> Saturday
              </p>
              <p>
                <BsCalendarX /> Sunday
              </p>
            </Col>
            <Col className="d-flex flex-column justify-content-start">
              <p>
                <BsAlarm /> 10:00AM - 5:00PM
              </p>
              <p>
                <BsAlarm /> 10:00AM - 5:00PM
              </p>
              <p>
                <BsAlarm /> 10:00AM - 5:00PM
              </p>
              <p>
                <BsAlarm /> 10:00AM - 5:00PM
              </p>
              <p>
                <BsAlarm /> 10:00AM - 5:00PM
              </p>
              <p>
                <BsAlarm /> 10:00AM - 3:00PM
              </p>
              <p>
                <BsCalendarX /> CLOSED
              </p>
            </Col>
          </Row>
        </Col>
        <Col md={8}>
            {loading === true ? (
              <div className="d-flex justify-content-center align-items-center w-100 h-100">
                <TailSpin color="#BEBBBB" width="30%"height="30%" />
              </div>
            ) : null}
            <iframe
              src="https://maps.google.com/maps?q=1033%20reeves%20street%20dunmore&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              frameBorder="0"
              onLoad={hideSpinner}
              allowFullScreen
            ></iframe>
        </Col>
      </Row>
      <Row className="mt-5">
        <h2 className="text-center">Questions?</h2>
      </Row>
      <Row>
        <ContactForm />
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
