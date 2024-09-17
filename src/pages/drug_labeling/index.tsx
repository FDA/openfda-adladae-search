import React from "react"
import type { PageProps } from "gatsby"
import DrugSearch from "../../components/DrugSearch"
import Layout from "../../components/Layout";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <DrugSearch
        searchHeader='Drug Name'
        errorText='At least three characters are required.'
        placeholder='Type in all or part of the drug name'
        searchLength={3}
      />
    </Layout>
  )
}

export default IndexPage