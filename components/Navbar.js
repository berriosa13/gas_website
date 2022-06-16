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
              <Link href="/" passhref>
                <ReactBootStrap.Nav.Link as="a" href="/">Home</ReactBootStrap.Nav.Link>
              </Link>
              <Link href="/about" passhref>
                <ReactBootStrap.Nav.Link as="a" href="/about">About</ReactBootStrap.Nav.Link>
              </Link>
              <Link href="/cars" passhref>
                <ReactBootStrap.Nav.Link as="a" href="/cars">Inventory</ReactBootStrap.Nav.Link>
              </Link>
              <Link href="/contact" passhref>
                <ReactBootStrap.Nav.Link as="a" href="/contact">Contact</ReactBootStrap.Nav.Link>
              </Link>
              
              <Link href="/apply" passhref>
                <ReactBootStrap.Nav.Link as="a" href="/apply">Apply Now</ReactBootStrap.Nav.Link>
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
