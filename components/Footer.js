import styles from "../styles/comp_styles/Footer.module.css";
import Image from 'next/image';
import Link from "next/link";
import { FaFacebookSquare, FaTwitterSquare, FaLinkedin, FaMapMarkerAlt, FaStop, FaPhoneAlt  } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Container, Row, Col } from "react-bootstrap";
import GradBar from "./GradBar";

const Footer = () => {
    return (
      <>
        <footer className={styles.footer}>
          <div className="my-5">
          <GradBar/>
          </div>
          <Container>
            <Row>
              <Col md={5}>
                <div className={styles.about_veno}>
                  <div className={styles.logo}>
                    <Image
                      src="/imgs/GAS-Full-Logo-2-Color.png"
                      alt="full logo"
                      width={421}
                      height={93}
                    />
                  </div>
                  <p>
                    Mauris sit amet quam congue, pulvinar urna et, congue diam.
                    Suspendisse eu lorem massa. Integer sit amet posuere
                    tellustea dictumst.
                  </p>
                  <ul className="social-icons">
                    <li>
                      <Link href="/">
                        <a>
                          <FaFacebookSquare />
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/">
                        <a>
                          <FaTwitterSquare />
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/">
                        <a>
                          <FaLinkedin />
                        </a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </Col>
              <Col md="auto" className="mx-3">
                <div className={styles.useful_links}>
                  <div className={styles.footer_heading}>
                    <h4>Useful Links</h4>
                  </div>
                  <Row className="d-flex justify-content-center">
                    <ul>
                      <li>
                        <Link href="/">
                          <a>
                            <FaStop />
                            Home
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/about">
                          <a>
                            <FaStop />
                            About
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/cars">
                          <a>
                            <FaStop />
                            Cars
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/contact">
                          <a>
                            <FaStop />
                            Contact
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/apply">
                          <a>
                            <FaStop />
                            Apply Online
                          </a>
                        </Link>
                      </li>
                    </ul>
                  </Row>
                </div>
              </Col>
              <Col md={4}>
                <div className={styles.contact_info}>
                  <div className="footer-heading">
                    <h4>Contact Information</h4>
                  </div>
                  <ul>
                    <li>
                      <p>
                        <FaMapMarkerAlt /> 212 Barrington Court New York, ABC
                      </p>
                    </li>
                    <li>
                      <FaPhoneAlt />
                      <Link href="/">
                        <a>+1 333 4040 5566</a>
                      </Link>
                    </li>
                    <li>
                      <MdEmail />
                      <Link href="/">
                        <a>info@gasautomobilesales.com</a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
          </Container>
        </footer>
        <GradBar/>
        <div className={styles.sub_footer}>
          <p>Copyright © 2022 Guardian Automobile Sales</p>
        </div>
      </>
    );
  }
  
  export default Footer;

  {/* <footer classNameName={styles.footer}>
    Copyright 2021 Anthony Berrios
  </footer> */}