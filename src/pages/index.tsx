import React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { Link } from "gatsby"
import '@trussworks/react-uswds/lib/uswds.css'
import '@trussworks/react-uswds/lib/index.css'
import '../css/index.scss'
import '../css/components/Layout.scss'
import '../css/pages/HomePage.scss'
import Layout from "../components/Layout";

const IndexPage: React.FC<PageProps> = () => {

  return (
    <Layout>
      <section className='main-content'>
        <div className='flex'>
          <div className='bg-white padding-3'>
            <h2>Animal Drug Labeling and Adverse Events</h2>
            <ul className='link-columns'>
              <li className='margin-bottom-1'><Link to='/adverse_events/'>Adverse Events Search</Link></li>
              <li className='margin-bottom-1'><Link to='/drug_labeling/'>Drug Name Search</Link></li>
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default IndexPage

export const Head: HeadFC = () => {
  return (
    <>
      <title>FDA Online Label Repository</title>
    </>
  )
}
