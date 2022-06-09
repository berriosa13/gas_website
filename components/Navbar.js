import Script from "next/script";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/comp_styles/Navbar.module.css";
import GradBar from "./GradBar";
import { Button } from "react-bootstrap";
import * as ReactBootStrap from "react-bootstrap";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <div className="container fluid"> 
      
        <ReactBootStrap.Navbar
          className="d-flex justify-content-space-between fs-3"
          collapseOnSelect
          expand="lg"
          variant="light"
        >
          <ReactBootStrap.Navbar.Brand>
            <Link href="/">
              <a>
                <Image
                  width={148}
                  height={93}
                  src="/imgs/GAS-Icon-Only-2-Color.png"
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
      </div>


     
      <GradBar/>

      {/* <div className="page-wrapper">
        <div className="nav-wrapper mb-5">
          <nav className={styles.navbar}>
            <div className="logo">
              <Link href="/">
                <a className={styles.navlogo}>
                  <img
                    src="/imgs/GAS-Full-Logo-2-Color.png"
                    alt="site logo"
                    width={421}
                    height={93}
                  />
                </a>
              </Link>
            </div>
            <ul
              className={
                isOpen === false
                  ? styles.navmenu
                  : styles.navmenu + " " + styles.active
              }
            >
              <li className={styles.navitem}>
                <Link href="/">
                  <a
                    className={
                      isOpen === false
                        ? styles.navlink
                        : styles.navlink + " " + styles.active
                    }
                    onClick={openMenu}
                  >
                    Home
                  </a>
                </Link>
              </li>
              <li className={styles.navitem}>
                <Link href="/about">
                  <a
                    className={
                      isOpen === false
                        ? styles.navlink
                        : styles.navlink + " " + styles.active
                    }
                    onClick={openMenu}
                  >
                    About
                  </a>
                </Link>
              </li>
              <li className={styles.navitem}>
                <Link href="/cars">
                  <a
                    className={
                      isOpen === false
                        ? styles.navlink
                        : styles.navlink + " " + styles.active
                    }
                    onClick={openMenu}
                  >
                    Cars
                  </a>
                </Link>
              </li>
              <li className={styles.navitem}>
                <Link href="/contact">
                  <a
                    className={
                      isOpen === false
                        ? styles.navlink
                        : styles.navlink + " " + styles.active
                    }
                    onClick={openMenu}
                  >
                    Contact
                  </a>
                </Link>
              </li>
              <li className={styles.navitem}>
                <Link href="/apply">
                  <Button onClick={openMenu} size="lg" variant="primary">
                    Apply Online
                  </Button>
                </Link>
              </li>
            </ul>
            <button
              className={
                isOpen === false
                  ? styles.hamburger
                  : styles.hamburger + " " + styles.active
              }
              onClick={openMenu}
            >
              <span className={styles.bar}></span>
              <span className={styles.bar}></span>
              <span className={styles.bar}></span>
            </button>
          </nav>
          <GradBar />
        </div>
      </div> */}
    </>
  );
};
export default NavBar;
