import React, { useEffect, useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import { useQuery } from '@tanstack/react-query';
import { fetchGridData } from '../api/api';
import debounce from 'lodash.debounce';

import usePrevious from '../hooks/usePrevious';
import useRowHighlight from '../hooks/useRowHighlight';
import useGridState from '../hooks/useGridState';

// 👇 Suspense 적용
// 👇 자동조회/수동조회
// 👇 debounce
// 👇 변경된 행 강조
// 👇 localStorage grid state
// 👇 keepPreviousData
// 👇 백그라운드 조회

// 깊은 비교
function isEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

export default function GridView({
  filters,
  manualTrigger = 0,
  autoFetch = true,
}) {
  const [debouncedFilters, setDebouncedFilters] = useState(filters);
  const prevFilters = usePrevious(filters);

  const debouncedSet = useMemo(
    () => debounce(f => setDebouncedFilters(f), 500),
    [],
  );

  // 자동조회 모드에서만 debounce + 변경 체크
  useEffect(() => {
    if (!autoFetch) return;

    if (prevFilters && isEqual(prevFilters, filters)) return;

    debouncedSet(filters);
    return () => debouncedSet.cancel();
  }, [filters, prevFilters, autoFetch, debouncedSet]);

  // queryKey
  const queryKey = useMemo(
    () => ['gridData', JSON.stringify(debouncedFilters)],
    [debouncedFilters],
  );

  // React-query Suspense
  const {
    data = [],
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useQuery(queryKey, () => fetchGridData(debouncedFilters), {
    staleTime: 1000 * 60 * 2,
    cacheTime: 1000 * 60 * 10,
    keepPreviousData: true,
    enabled: autoFetch,
    suspense: true,
  });

  // 수동 조회
  useEffect(() => {
    if (manualTrigger > 0) refetch();
  }, [manualTrigger, refetch]);

  // 변경된 행 강조
  const highlight = useRowHighlight(data);

  // 토스트
  const [toast, setToast] = useState(null);
  useEffect(() => {
    if (isError) setToast({ message: '조회 실패', type: 'error' });
    else if (!isLoading && !isError)
      setToast({ message: '조회 완료', type: 'success' });

    const t = setTimeout(() => setToast(null), 1500);
    return () => clearTimeout(t);
  }, [isLoading, isError]);

  const [gridApi, setGridApi] = useState(null);
  useGridState(gridApi, 'main-grid');

  const columnDefs = useMemo(
    () => [
      {
        field: 'id',
        headerName: 'ID',
        width: 80,
        cellStyle: params =>
          highlight.has(params.data?.id) ? { background: '#fff2cc' } : null,
      },
      {
        field: 'name',
        headerName: '이름',
        width: 150,
        cellStyle: params =>
          highlight.has(params.data?.id) ? { background: '#fff2cc' } : null,
      },
      {
        field: 'age',
        headerName: '나이',
        width: 100,
        cellStyle: params =>
          highlight.has(params.data?.id) ? { background: '#fff2cc' } : null,
      },
    ],
    [highlight],
  );

  return (
    <div style={{ position: 'relative' }}>
      {/* 토스트 */}
      {toast && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '6px 12px',
            background: toast.type === 'error' ? '#ff6666' : '#66cc66',
            color: 'white',
            borderRadius: 4,
            zIndex: 10,
          }}
        >
          {toast.message}
        </div>
      )}

      {/* 백그라운드 조회 */}
      {isFetching && !isLoading && (
        <div
          style={{
            position: 'absolute',
            top: 30,
            right: 0,
            padding: '4px 8px',
            background: '#ffffcc',
            borderRadius: 4,
            zIndex: 10,
          }}
        >
          백그라운드 조회중...
        </div>
      )}

      <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
        <AgGridReact
          onGridReady={p => setGridApi(p.api)}
          columnDefs={columnDefs}
          rowData={data}
          animateRows={true}
          overlayLoadingTemplate={isLoading ? '<span>조회중...</span>' : ''}
          overlayNoRowsTemplate={
            !isLoading && data.length === 0
              ? '<span>조회 결과가 없습니다</span>'
              : ''
          }
        />
      </div>
    </div>
  );
}
