import React from "react"
import type { PageProps } from "gatsby"
import EventSearch from "../../components/EventSearch"

const IndexPage: React.FC<PageProps> = () => {
  return (
      <EventSearch
        searchHeader='VeDDRA Term'
        errorText='Enter at least three characters and select a VeDDRA term from the dropdown list.'
        placeholder='Type in the VeDDRA term name'
        searchLength={3}
      />
  )
}

export default IndexPage