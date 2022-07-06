import Footer from "./Footer";
import Navbar from "./Navbar";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./../styles/page_styles/Home.module.css";

const Layout = ({ children }) => {
  return (
   <>
   <Navbar/>
   <Container>
     <Row className={styles.layout_row}>
       <Col>{children}</Col>
     </Row>
   </Container>
   <Footer/>
   </>
    
  );
};

export default Layout;
