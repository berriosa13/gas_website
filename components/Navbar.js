import Script from "next/script";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/comp_styles/Navbar.module.css";
import GradBar from "./GradBar";
import { Button, Container } from "react-bootstrap";
import * as ReactBootStrap from "react-bootstrap";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openMenu = () => setIsOpen(!isOpen);

  return (
    <>
    <Container>

        <ReactBootStrap.Navbar
          className="d-flex justify-content-center align-items-center fs-3"
          collapseOnSelect
          expand="md"
          variant="light"
        >
          <ReactBootStrap.Navbar.Brand>
            <Link href="/">
              <a>
                <Image
                  width={148}
                  height={93}
                  src="/imgs/GAS-Icon-Only-2-Color.png"
                  alt="GasLogoIcon"
                />
              </a>
            </Link>
          </ReactBootStrap.Navbar.Brand>
          <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
            <ReactBootStrap.Nav navbarScroll className="mr-auto">
              <Link href="/">
                <a>Home</a>
              </Link>
              <Link href="/about">
                <a>About</a>
              </Link>
              <Link href="/cars">
                <a>Inventory</a>
              </Link>
              <Link href="/contact">
                <a>Contact</a>
              </Link>
              
              <Link href="/apply">
                  <a>Apply Now</a>
              </Link>
            </ReactBootStrap.Nav>
          </ReactBootStrap.Navbar.Collapse>
        </ReactBootStrap.Navbar>
    </Container>
        <GradBar/>


     
      
    </>
  );
};
export default NavBar;
