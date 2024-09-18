import {useCallback, useEffect, useMemo, useState} from 'react';
import React from 'react';
import { Modal } from 'react-responsive-modal';
import { AgGridReact } from "ag-grid-react";
import 'react-responsive-modal/styles.css';

const column_map = [
  {
    field: 'reaction',
    headerName: 'Adverse Events',
    floatingFilter: true,
    suppressHeaderMenuButton: true,
    filterParams: {
      caseSensitive: false,
      defaultOption: "contains",
      filterOptions: ["contains", "startsWith"],
      maxNumConditions: 1
    }
  }
]

export default function CellModalRenderer(params) {
  const [visible, setVisible] = useState(false);
  const show = () => setVisible(true);
  const hide = () => setVisible(false);
  const defaultColDef = useMemo(() => ({resizable: false, sortable: true, filter: "agTextColumnFilter"}), []);
  const events = params.value
  const [rowData, setRowData] = useState([])

  useEffect(() => {
    let data = []
    events.map( event => {
      data.push({reaction: event})
    })
    setRowData(data)
  }, [events])

  const onFirstDataRendered = useCallback((params) => {
    params.api.sizeColumnsToFit();
  }, []);

  return (
    <div>
      <button onClick={show}>{events[0]}, {events[1]}, ...</button>
      <Modal
        center
        classNames={{modal: "modal"}}
        open={visible}
        onClose={hide}>
        <div className="ag-theme-alpine margin-3 table-modal" style={events.length <5 ? {height: 250}: {height: 400}}>
          <AgGridReact
            rowData={rowData}
            columnDefs={column_map}
            defaultColDef={defaultColDef}
            onFirstDataRendered={onFirstDataRendered}
            pagination={true}
            supressMenuHide={false}
            paginationPageSizeSelector={[100, 200, 500]}
            domLayout={events.length <5 ? 'autoHeight': 'normal'}
          />
        </div>
      </Modal>
    </div>
  );
};
