
import { NextSeo } from "next-seo";
import Layout from "../components/Layout";
import { Row, Col, Figure } from "react-bootstrap";
import GradBar from "../components/GradBar";
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import withAutoplay from 'react-awesome-slider/dist/autoplay';

export default function About() {
  const AutoplaySlider = withAutoplay(AwesomeSlider);
  return (
    <>
      <NextSeo
        title="Guardian Automobile Sales | About"
        description="Learn more about Guradian Automobile Sales, located in the Scranton/Wilkes-Barre area."
        canonical="https://www.gasautomobilesales.com/"
        openGraph={{
          url: "https://www.gasautomobilesales.com/",
          title: "Guardian Automobile Sales | About",
          description:
            "Learn more about Guradian Automobile Sales, located in the Scranton/Wilkes-Barre area.",
          images: [
            {
              url: "/imgs/GAS-Text-Only-2-Color.png",
              width: 800,
              height: 600,
              alt: "Og GAS Text Logo",
              type: "image/png",
            },
          ],
          site_name: "gasautomobilesales",
        }}
      />
      <div className="d-flex justify-content-between my-5">
        <h1>
          About Us
          <GradBar />
        </h1>
      </div>

      <Row>
        <Col md={6} className="">
          <div className="slider-wrapper">
            <AutoplaySlider
            play={true}
            cancelOnInteraction={false} // should stop playing on user interaction
            interval={3000}
            mobileTouch={true}
            >
              <div data-src="/imgs/gas_building_shrunk.jpeg"/>
              <div data-src="/imgs/gas_lot.jpg"/>
              <div data-src="/imgs/gas_lot_2.jpg"/>
              <div data-src="/imgs/gas_lot_3.jpg"/>
            </AutoplaySlider>
          </div>
        </Col>
        <Col md={6}>
          <h5 className="m-5">
            Shopping for your next vehicle should not be a hassle. You do not
            need to drive for hours or make deals over the phone to get a good
            deal on a great used vehicle. Located right here in Dunmore PA,
            Guardian Automobile Sales is dedicated to bringing a great selection
            of high-quality, well-maintained, like-new vehicles into our local
            area. We invite you to stop by and look over our inventory of
            vehicles.
          </h5>
          <h5 className="fst-italic m-5"> - Guardian Automobile Sales</h5>
        </Col>
        <style jsx global>{`
          .figure-img {
            box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.75);
            -webkit-box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.75);
            -moz-box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.75);
          }
          .slider-wrapper {
            box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.75);
            -webkit-box-shadow: 0px 0px 5px 3px
              rgba(0, 0, 0, 0.75);
            -moz-box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.75);
          }
        `}</style>
      </Row>
    </>
  );
}

About.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
