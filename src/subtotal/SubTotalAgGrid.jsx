// App.js
import React, { useMemo, useState, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './SubTotalAgGrid.css';

import { dummyData } from './dummyData';
import { buildGroupedRows } from './groupEngine';
import RowSpanColoredRenderer from './RowSpanColoredRenderer';

const ROW_HEIGHT = 28;

const GROUP_COLOR = {
  col_a: '#FFF4C2',
  col_b: '#E9F7FF',
  col_c: '#F5E6FF',
  col_d: '#FFE6E6',
};

const ROWSPAN_COLUMNS = ['col_a', 'col_b', 'col_c', 'col_d'];
const ALL_GROUP_KEYS = [...ROWSPAN_COLUMNS];

export default function SubTotalAgGrid() {
  const [groupKeys, setGroupKeys] = useState([]);
  const [expanded, setExpanded] = useState({
    '01': false,
    '02': false,
    '03': false,
  });

  const onChangeGroup = key => {
    setGroupKeys(prev => {
      const set = new Set(prev);
      if (set.has(key)) set.delete(key);
      else set.add(key);
      // col_a -> col_b -> col_c -> col_d 순으로 정렬 유지
      return ALL_GROUP_KEYS.filter(k => set.has(k));
    });
  };

  const toggleExpand = useCallback(mm => {
    setExpanded(prev => ({ ...prev, [mm]: !prev[mm] }));
  }, []);

  // rowSpan 계산
  const rowSpanFunc = params => {
    const field = params.colDef.field;
    const d = params.data;
    if (!ROWSPAN_COLUMNS.includes(field)) return 1;
    if (!d || d.__isTotal) return 1;

    const value = d[field];
    let span = 1;
    let idx = params.node.rowIndex;

    while (true) {
      const next = params.api.getDisplayedRowAtIndex(idx + span);
      if (!next || !next.data) break;
      if (next.data.__isTotal) break;
      if (next.data[field] !== value) break;
      span++;
    }
    return span;
  };

  // 컬럼 정의
  const buildColumns = () => {
    const cols = [];

    // 1) rowSpan + 색칠 대상 컬럼들
    ROWSPAN_COLUMNS.forEach(field => {
      cols.push({
        headerName: field,
        field,
        rowSpan: rowSpanFunc,
        cellRenderer: RowSpanColoredRenderer,
        cellRendererParams: {
          groupKeys,
          groupColor: GROUP_COLOR,
        },
      });
    });

    // 2) mm / ww 컬럼
    ['01', '02', '03'].forEach(mm => {
      const mmField = `mm_${mm}`;

      cols.push({
        headerName: mmField,
        field: mmField,
        onCellClicked: () => toggleExpand(mm),
      });

      if (expanded[mm]) {
        for (let i = 1; i <= 5; i++) {
          const f = `ww_${mm}_${String(i).padStart(2, '0')}`;
          cols.push({
            headerName: f,
            field: f,
          });
        }
      }
    });

    return cols;
  };

  const columnDefs = useMemo(buildColumns, [expanded, groupKeys]);

  const rowData = useMemo(
    () => buildGroupedRows(dummyData, groupKeys),
    [groupKeys],
  );

  // subtotal 행은 전체 row 배경색 (col_a/b/c/d 컬러와 동일)
  const getRowStyle = params => {
    const d = params.data;
    if (d && d.__isTotal) {
      return {
        background: GROUP_COLOR[d.__groupKey],
        fontWeight: 'bold',
      };
    }
    return null;
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>집계 그리드 (React + AG-Grid)</h2>

      {/* 집계 기준 체크박스 */}
      <div style={{ marginBottom: 10 }}>
        {ALL_GROUP_KEYS.map(key => (
          <label key={key} style={{ marginRight: 20 }}>
            <input
              type="checkbox"
              checked={groupKeys.includes(key)}
              onChange={() => onChangeGroup(key)}
            />
            {key}
          </label>
        ))}
      </div>

      <div className="ag-theme-alpine" style={{ height: 650 }}>
        <AgGridReact
          rowHeight={ROW_HEIGHT}
          rowData={rowData}
          columnDefs={columnDefs}
          getRowStyle={getRowStyle}
          defaultColDef={{
            flex: 1,
            resizable: true,
            sortable: true,
          }}
        />
      </div>
    </div>
  );
}
