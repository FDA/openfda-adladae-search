import React from "react"
import type { PageProps } from "gatsby"
import EventSearch from "../../components/EventSearch"
import Layout from "../../components/Layout";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <EventSearch
        searchHeader='VeDDRA Term'
        errorText='At least three characters are required.'
        placeholder='Type in all or part of the VeDDRA term name'
        searchLength={3}
      />
    </Layout>
  )
}

export default IndexPage
