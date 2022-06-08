import Head from "next/head";
import Link from "next/link";
import styles from "../styles/page_styles/Home.module.css";
import homepageBanner from "../public/imgs/homepage-banner-image-1920x700.jpg";

export default function Home() {
  return (
    <>
      <Head>
        <title>GAS Automobile Sales | Home</title>
        <meta name="keywords" content="cars" />
      </Head>
      <section className="banner" id="top">
        <div className="container">
          <div className="row">
            <div className="col-md-10 col-md-offset-1">
              <div className="banner-caption">
                <div className="line-dec"></div>
                <h2>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </h2>
                <div className="blue-button">
                  <Link href="/contact">
                    <a>Contact Us</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
