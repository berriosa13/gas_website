import styles from "../styles/comp_styles/Footer.module.css";
import Image from 'next/image';
import Link from "next/link";
import Script from "next/script";
import { FaFacebookSquare, FaTwitterSquare, FaLinkedin, FaMapMarkerAlt, FaStop, FaPhoneAlt  } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { ImLink } from "react-icons/im";
import { Container, Row, Col } from "react-bootstrap";
import GradBar from "./GradBar";
import SubFooter from "./SubFooter"

const Footer = () => {
  const current = new Date();
  const date = `${current.getFullYear()}`;
    return (
      <>
        <footer className={styles.footer}>
          <GradBar/>
          <div className="my-5">
          </div>
          <Container>
            <Row>
              <Col md={4}>
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
                  <div className="d-flex align-items-center justify-content-start facebook-icon">
                    <a href="https://www.facebook.com" target="blank" noreferrer>
                     <FaFacebookSquare className="fs-5 ms-2"/> 
                    </a>
                  
                  </div>
                  
                </div>
              </Col>
              <Col md={4}>
                <div className={styles.useful_links}>
                  <div className={styles.footer_heading}>
                    <h4>Useful Links</h4>
                  </div>
                  <Row className="d-flex justify-content-center">
                    <ul className="">
                      <li className="text-center">
                        <Link href="/">
                          <a>
                            <ImLink/> Home
                          </a>
                        </Link>
                      </li>
                      <li className="text-center">
                        <Link href="/about">
                          <a>
                          <ImLink/> About
                          </a>
                        </Link>
                      </li>
                      <li className="text-center">
                        <Link href="/cars">
                          <a>
                          <ImLink/> Inventory
                          </a>
                        </Link>
                      </li>
                      <li className="text-center">
                        <Link href="/contact">
                          <a>
                          <ImLink/> Contact
                          </a>
                        </Link>
                      </li>
                      <li className="text-center">
                        <Link href="/apply">
                          <a>
                          <ImLink/> Apply Online
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
                        <FaMapMarkerAlt /> 1033 Reeves St, Dunmore Pa, 18512
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
        <SubFooter/>
      </>
    );
  }
  
  export default Footer;