import styles from "../styles/comp_styles/Footer.module.css";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaLinkedin,
  FaMapMarkerAlt,
  FaStop,
  FaPhoneAlt,
} from "react-icons/fa";
import { HiLink } from "react-icons/hi";
import { MdEmail } from "react-icons/md";
import { ImLink } from "react-icons/im";
import { Container, Row, Col } from "react-bootstrap";
import GradBar from "./GradBar";
import SubFooter from "./SubFooter";

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
                    Find your next used car at Guardian Automobile Sales, located on Reeves Street in Dunmore.
                  </p>
                  <ul className="social-icons">
                    <li>
                      <Link href="https://www.facebook.com/Guardian-Automobile-Sales-104122725674174/">
                        <a target="_blank" rel="noopener noreferrer">
                          <FaFacebookSquare />
                        </a>
                      </Link>
                    </li>
                    {/* <li>
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
                    </li> */}
                  </ul>
                </div>
              </Col>
              <Col md={4}>
                <div>
                  <div className={styles.footer_heading}>
                    <h4>Useful Links</h4>
                  </div>
                  <div className="d-flex justify-content-center align-items-center">
                    <ul>
                      <li className="mb-2">
                        <Link href="/">
                          <a>
                            <HiLink /> Home
                          </a>
                        </Link>
                      </li>
                      <li className="mb-2">
                        <Link href="/about">
                          <a>
                            <HiLink /> About
                          </a>
                        </Link>
                      </li>
                      <li className="mb-2">
                        <Link href="/cars">
                          <a>
                            <HiLink /> Cars
                          </a>
                        </Link>
                      </li>   
                    </ul>
                    <ul>
                    <li className="mb-2">
                        <Link href="/contact">
                          <a>
                            <HiLink /> Contact
                          </a>
                        </Link>
                      </li>
                      <li className="mb-2">
                        <Link href="/apply">
                          <a>
                            <HiLink /> Apply Online
                          </a>
                        </Link>
                      </li>
                      <li className="mb-2">
                        <Link href="privacy_policy.html">
                          <a target="_blank" noreferrer>
                            <HiLink /> Privacy Policy
                          </a>
                        </Link>
                      </li>
                    </ul>
                    </div>
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
                      <Link href="tel:570-800-1208">
                        <a>(570)-800-1208)</a>
                      </Link>
                    </li>
                    <li>
                      <MdEmail />
                      <Link href="mailto:info@gasautomobilesales.com">
                        <a>info@gasautomobilesales.com</a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
          </Container>
        </footer>
        <div className={styles.sub_footer}>
          <p>&copy; Copyright <strong>Guardian Automobile Sales <span>{date}</span></strong>. All Rights Reserved</p>
        </div>
    </>
  );
};

export default Footer;
