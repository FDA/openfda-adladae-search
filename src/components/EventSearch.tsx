import React, { useState, useEffect, useMemo, useCallback } from "react"
import { AgGridReact } from "ag-grid-react";
import { Alert, TextInput } from '@trussworks/react-uswds'
import { Link } from "gatsby";
import CustomLoadingOverlay from "./CustomLoadingOverlay";
import { API_LINK } from "../constants/api";

import '@trussworks/react-uswds/lib/uswds.css'
import '@trussworks/react-uswds/lib/index.css'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import '../css/index.scss'
import '../css/components/Search.scss'

const FDA_LABEL_LINK = "https://www.accessdata.fda.gov/spl/data/" // ex: 210ad5fe-33e4-4606-b5c0-6dae095f9a9d/210ad5fe-33e4-4606-b5c0-6dae095f9a9d.xml

const column_map = [
  {
    field: 'brand_name',
    headerName: 'Brand Name',
    sort: 'asc',
    comparator: (valueA, valueB) => {
      if (valueA.brand_name.toLowerCase() == valueB.brand_name.toLowerCase()) return 0;
      return (valueA.brand_name.toLowerCase() > valueB.brand_name.toLowerCase()) ? 1 : -1;
    },
    cellRenderer:(params) => {
      return <a href={FDA_LABEL_LINK + params.value.spl_id + '/' + params.value.spl_id + '.xml'} target="_blank">{params.value.brand_name}</a>
    }
  },
  {
    field: 'labeler_name',
    headerName: 'Labeler Name'
  },
  {
    field: 'application_number',
    headerName: 'Application Number'
  }
]

export default function EventSearch({searchHeader, errorText, placeholder, searchLength}) {
  const [drugs, setDrugs] = useState<[] | null>(null)
  const [errMsg, setErrMsg] = useState('')
  const [search, setSearch] = useState('')
  const [search_query, setSearchQuery] = useState('')
  const defaultColDef = useMemo(() => ({resizable: true, sortable: true}), []);

  useEffect(() => {
    if (search_query === '') {
      return
    } else {
      fetch(search_query)
        .then(response => {
          if (!response.ok){
            throw new Error(response.status + " Failed Fetch");
          }
          return response.json()
        })
        .then(json => {
          let data = []
          json.results.map(result => {
            data.push({
              'brand_name': {'brand_name': result['brand_name'],'spl_id': result['spl_id']},
              'labeler_name': result.labeler_name,
              'application_number': result.application_number
            })
          })
          setDrugs(data)
          setErrMsg('')
        })
        .catch(error => {
          setDrugs(null)
          setErrMsg('No results found.')
        });
    }
  }, [search_query])

  const searchHandler = (event) => {
    event.preventDefault()
    event.stopPropagation()
    if (search.length < searchLength) {
      setDrugs(null)
      setErrMsg(errorText)
    } else {
      setSearchQuery(`${API_LINK}/animalandveterinary/ndc.json?search=reaction:*${search}*+AND+_exists_:reaction&limit=1000`)
    }
  };

  const resetForm = () => {
    setDrugs(null)
    setSearchQuery('')
    setSearch('')
  };

  const onFirstDataRendered = useCallback((params) => {
    params.api.sizeColumnsToFit();
  }, []);

  const loadingOverlayComponent = useMemo(() => {
    return CustomLoadingOverlay;
  }, []);

  const loadingOverlayComponentParams = useMemo(() => {
    return {
      loadingMessage: 'One moment please...',
    };
  }, []);

  return (
    <div className='bg-white margin-top-3 padding-left-2 padding-right-3 padding-bottom-5'>
      <div className='grid-row flex-column'>
        <div className='grid-col flex-auto padding-1'>
          <i>Veterinary Dictionary for Drug Regulatory Activities (VeDDRA)</i>: A list of standard clinical terms to be used in reporting suspected adverse events in animals or humans after exposure to veterinary medicinal products.
        </div>
      </div>
      <div className='grid-row flex-column'>
        <div className='grid-col flex-auto padding-1'>
        <b>Search By {searchHeader}:</b>
        </div>
        <form className='minw-205 padding-left-1' onSubmit={searchHandler}>
          <div className='grid-row flex-row'>
            <TextInput
              className='input-padding height-4'
              name='reaction'
              type='string'
              value={search}
              onChange={event => setSearch(event.target.value)}
            />
            <span className='padding-top-1 padding-left-1'>({placeholder})</span>
          </div>
          <button className='minw-205 usa-button margin-top-2' type='submit'>
            <span className="usa-search__submit-text">Search</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              className="usa-icon usa-icon--size-3 usa-search__submit-icon" focusable="false" role="img"
              name="Search"
            >
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
          </button>
          <button className='minw-205 usa-button margin-top-2' style={{backgroundColor:"grey"}} type='button' onClick={resetForm}>
            <span className="usa-search__submit-text">Clear</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              className="usa-icon usa-icon--size-3 usa-search__submit-icon" focusable="false" role="img"
              name="Clear"
            >
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
          </button>
        </form>
      </div>
      {
        // Display error message if no results found.
        errMsg.length > 0 && (
          <div className='grid-row padding-1'>
            <div className='grid-col flex-auto'>
              <Alert type={"info"} headingLevel={'h1'}>{errMsg}</Alert>
            </div>
          </div>
        )
      }
      <div className='grid-row flex-column'>
        <div className='grid-col padding-left-1'>
          {drugs && (
            <div className="ag-theme-alpine margin-bottom-3" style={drugs.length <5 ? {height: 250}: {height: 400}}>
              <AgGridReact
                rowData={drugs}
                columnDefs={column_map}
                defaultColDef={defaultColDef}
                onFirstDataRendered={onFirstDataRendered}
                noRowsOverlayComponent={loadingOverlayComponent}
                noRowsOverlayComponentParams={loadingOverlayComponentParams}
                pagination={true}
                paginationPageSizeSelector={[100, 200, 500]}
                domLayout={drugs.length <5 ? 'autoHeight': 'normal'}
              />
            </div>
          )}
        </div>
      </div>
      <div className='margin-left-1'>
        <Link to='/'>Back to the FDA Animal Drug Search Page</Link>
      </div>
    </div>
  )
}
