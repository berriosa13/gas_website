import Footer from "./Footer";
import Navbar from "./Navbar";
import { Container, Row, Col } from "react-bootstrap";

const Layout = ({ children }) => {
  return (
   <>
   <Navbar/>
   <Container>
     <Row>
       <Col>{children}</Col>
     </Row>
   </Container>
   <Footer/>
   </>
    
  );
};

export default Layout;
