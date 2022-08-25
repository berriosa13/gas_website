import Head from "next/head";
import Layout from '../components/Layout'
import CreditApplicationForm from '../components/forms/CreditApplicationForm';
import GradBar from '../components/GradBar'
import { NextSeo } from "next-seo";

export default function Apply() {
  return (
    <>
     <NextSeo
        title="Guardian Automobile Sales | Apply Online"
        description="Apply Online for a creit check to streamline your car buying experience when you visit us."
        canonical="https://www.gasautomobilesales.com/"
        openGraph={{
          url: "https://www.gasautomobilesales.com/",
          title: "Guardian Automobile Sales | Apply Online",
          description: "Apply Online for a creit check to streamline your car buying experience when you visit us.",
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
      <Head>
        <title>Guardian Automobile Sales | Apply Online</title>
        <meta name="description" content="Apply Online for a credit check" />
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      </Head>
      
      <div className="d-flex justify-content-between my-5">
        <div>
          <h1>
            Apply Online
            <GradBar/>
          </h1>
        </div>
      </div>
      <CreditApplicationForm/>
    </>
  );
}

Apply.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}
