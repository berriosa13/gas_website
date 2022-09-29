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
      <ReactBootStrap.Navbar
        className="d-flex justify-content-center align-items-center fs-4"
        collapseOnSelect
        expand="lg"
        variant="light"
        bg="light"
        fixed="top"
      >
        <Container>
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
            <ReactBootStrap.Nav navbarScroll className="cl-effect-4" id="cl-effect-4">
              <Link href="/" passhref>
                <ReactBootStrap.Nav.Link as="a" href="/">
                  <span data-hover="Home">Home</span>
                </ReactBootStrap.Nav.Link>
              </Link>
              <Link href="/about" passhref>
                <ReactBootStrap.Nav.Link as="a" href="/about">
                  <span data-hover="About">About</span>
                </ReactBootStrap.Nav.Link>
              </Link>
              <Link href="/cars" passhref>
                <ReactBootStrap.Nav.Link as="a" href="/cars">
                  <span data-hover="Inventory">Inventory</span>
                </ReactBootStrap.Nav.Link>
              </Link>
              <Link href="/contact" passhref>
                <ReactBootStrap.Nav.Link as="a" href="/contact">
                  <span data-hover="Contact">Contact</span>
                </ReactBootStrap.Nav.Link>
              </Link>
              <Link href="/apply" passhref>
                <ReactBootStrap.Nav.Link as="a" href="/apply">
                  <span data-hover="Apply Online">Apply Online</span>
                </ReactBootStrap.Nav.Link>
              </Link>
            </ReactBootStrap.Nav>
          </ReactBootStrap.Navbar.Collapse>
        </Container>
        <style jsx global>{`

        @media only screen and (min-width: 990px) {
          /* Effect 4: same word slide in */
          .cl-effect-4 a {
            overflow: hidden;
            padding: 0 4px;
          }
          .cl-effect-4 a span {
            position: relative;
            display: inline-block;
            -webkit-transition: -webkit-transform 0.3s;
            -moz-transition: -moz-transform 0.3s;
            transition: transform 0.3s;
          }
          .cl-effect-4 a span::before {
            position: absolute;
            top: 100%;
            content: attr(data-hover);
            -webkit-transform: translate3d(0, 0, 0);
            -moz-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
          }
          .cl-effect-4 a:hover span, .cl-effect-4 a:focus span {
            -webkit-transform: translateY(-100%);
            -moz-transform: translateY(-100%);
            transform: translateY(-100%);
          }        
        }

        `}</style>
      </ReactBootStrap.Navbar>
    </>
  );
};
export default NavBar;
