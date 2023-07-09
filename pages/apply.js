import Head from "next/head";
import Layout from "../components/Layout";
import CreditApplicationForm from "../components/forms/CreditApplicationForm";
import GradBar from "../components/GradBar";
import { NextSeo } from "next-seo";
import config from "../config"

export default function Apply() {
  return (
    <>
      <NextSeo
        title={`${config.dealership.name} | Apply Online`}
        description={`Apply Online for a credit check to streamline your car buying experience when you visit ${config.dealership.name}.`}
        canonical={`https://www.${config.dealership.domain}.com/`}
        openGraph={{
          url: `https://www.${config.dealership.domain}.com/`,
          title: `${config.dealership.name} | Apply Online`,
          description: `Apply Online for a credit check to streamline your car buying experience when you visit ${config.dealership.name}.`,
          images: [
            {
              url: "/imgs/GAS-Logo-text.png",
              width: 800,
              height: 600,
              alt: "Og GAS Text Logo",
              type: "image/png",
            },
          ],
          site_name: config.dealership.domain,
        }}
      />

      <Head>
        <title>{config.dealership.name} | Apply Online</title>
        <meta name="description" content="Apply Online for a credit check" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
      </Head>

      <div className="d-flex justify-content-between my-5">
        <div>
          <h1>
            Apply Online
            <GradBar />
          </h1>
        </div>
      </div>
      <CreditApplicationForm />
    </>
  );
}

Apply.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
