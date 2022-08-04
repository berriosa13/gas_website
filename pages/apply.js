import Head from "next/head";
import Layout from '../components/Layout'
import CreditApplicationForm from '../components/forms/CreditApplicationForm';
import GradBar from '../components/GradBar'

export default function Apply() {
  return (
    <>
      <Head>
        <title>GAS Automobile Sales | Apply</title>
        <meta name="keywords" content="cars" />
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
