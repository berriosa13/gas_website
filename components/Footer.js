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
  FaInstagram,
} from "react-icons/fa";
import { HiLink } from "react-icons/hi";
import { MdEmail } from "react-icons/md";
import { ImLink } from "react-icons/im";
import { Container, Row, Col } from "react-bootstrap";
import GradBar from "./GradBar";
import SubFooter from "./SubFooter";
import config from "../config"

const Footer = () => {
  const current = new Date();
  const date = `${current.getFullYear()}`;
  return (
    <>
      <footer className={styles.footer}>
        <GradBar />
        <div className="my-5"></div>
        <Container>
          <Row>
            <Col className="mx-3">
              <div className="">
                <div className={styles.logo}>
                  <Image
                    src="/imgs/GAS-Logo.png"
                    alt="full logo"
                    width={421}
                    height={93}
                  />
                </div>
                <ul className="d-flex flex-column align-items-start">
                  <li>
                    <p>
                      <FaMapMarkerAlt /> 1033 Reeves St, Dunmore Pa, 18512
                    </p>
                  </li>
                  <li>
                    <p>
                      <FaPhoneAlt />{" "}
                      <Link href="tel:570-800-1208">
                        <a>(570)-800-1208</a>
                      </Link>
                    </p>
                  </li>
                  <li>
                    <p>
                      <MdEmail />{" "}
                      <Link href="mailto:info@gasautomobilesales.com">
                        <a>info@gasautomobilesales.com</a>
                      </Link>
                    </p>
                  </li>
                </ul>

                {/* <ul className="social-icons">
                    <li>
                      <Link href="https://www.facebook.com/Guardian-Automobile-Sales-104122725674174/">
                        <a target="_blank" rel="noopener noreferrer">
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
                  </ul> */}
              </div>
            </Col>
            <Col>
              <div className={styles.links_wrapper}>
                <div className="d-flex justify-content-center align-items-center mt-3">
                  <h4 className="mb-3">
                    Useful Links
                    <GradBar />
                  </h4>
                </div>
                <div className="d-flex justify-content-center align-items-center">
                  <ul className={styles.links_list}>
                    <li className="">
                      <Link href="/">
                        <a>
                          <HiLink /> Home
                        </a>
                      </Link>
                    </li>
                    <li className="">
                      <Link href="/about">
                        <a>
                          <HiLink /> About
                        </a>
                      </Link>
                    </li>
                    <li className="">
                      <Link href="/cars">
                        <a>
                          <HiLink /> Inventory
                        </a>
                      </Link>
                    </li>
                    <li className="">
                      <Link href="/contact">
                        <a>
                          <HiLink /> Contact
                        </a>
                      </Link>
                    </li>
                    <li className="">
                      <Link href="/apply">
                        <a>
                          <HiLink /> Apply Online
                        </a>
                      </Link>
                    </li>
                    <li className="">
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
            <Col className="mt-3">
              <div className={styles.socials}>
                <div className="d-flex justify-content-start flex-column align-items-start mx-5">
                  <h4 className="mb-3">
                    Our Socials
                    <GradBar />
                  </h4>
                  <h5 className="mb-3">
                    Check us out on  {"  "}
                    <Link href="https://www.facebook.com/Guardian-Automobile-Sales-104122725674174/">
                      <a target="_blank" rel="noopener noreferrer">
                        <FaFacebookSquare />
                      </a>
                    </Link>
                  </h5>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
      <div className={styles.sub_footer}>
        <p>
          &copy; Copyright{" "}
          <strong>
            {config.dealership.name} <span>{date}</span>
          </strong>
          . All Rights Reserved
        </p>
      </div>
    </>
  );
};

export default Footer;
