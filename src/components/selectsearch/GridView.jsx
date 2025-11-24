import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

export function GridView({ searchTrigger, conditions }) {
  const fetchGridData = async () => {
    const res = await axios.get('http://localhost:8000/gridData', {
      params: conditions,
    });
    return res.data;
  };

  const gridQuery = useQuery({
    queryKey: ['gridData', searchTrigger],
    queryFn: fetchGridData,
    enabled: searchTrigger > 0,
  });

  const columnDefs = [
    { headerName: 'ID', field: 'id', width: 100 },
    { headerName: 'Value', field: 'value', flex: 1 },
  ];

  return (
    <div style={{ marginTop: 20 }}>
      <h3>조회결과</h3>

      {gridQuery.isLoading && <div>Loading...</div>}

      <div className="ag-theme-alpine" style={{ height: 400 }}>
        <AgGridReact
          rowData={gridQuery.data || []}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={20}
        />
      </div>
    </div>
  );
}
