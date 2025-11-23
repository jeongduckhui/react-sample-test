import React, { useEffect, useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useQuery } from '@tanstack/react-query';
import { fetchGridData } from './api';
import debounce from 'lodash.debounce';

export default function GridView({ filters, manualTrigger }) {
  const [debouncedFilters, setDebouncedFilters] = useState(filters);
  const [toast, setToast] = useState(null);

  // debounce 필터 변경
  const debouncedSet = useMemo(
    () =>
      debounce(f => {
        setDebouncedFilters(f);
      }, 500),
    [],
  );

  useEffect(() => {
    debouncedSet(filters);
  }, [filters, debouncedSet]);

  // useQuery에서 inline 함수 사용
  const { data, isLoading, isFetching, refetch, isError } = useQuery(
    ['gridData', JSON.stringify(debouncedFilters)], // 안정적인 key
    () => fetchGridData(debouncedFilters),
    {
      staleTime: 1000 * 60 * 2,
      cacheTime: 1000 * 60 * 10,
      keepPreviousData: true,
    },
  );

  useEffect(() => {
    if (manualTrigger) refetch();
  }, [manualTrigger, refetch]);

  // 토스트
  // Error: Calling setState synchronously within an effect can trigger cascading renders
  // 위 에러는 개발 StrictMode에서만 나는 에러로 production에서는 문제없음. 필수 수정사항 아님
  useEffect(() => {
    if (isError) setToast({ message: '조회 실패', type: 'error' });
    else if (!isLoading && !isError)
      setToast({ message: '조회 완료', type: 'success' });

    const timer = setTimeout(() => setToast(null), 2000);
    return () => clearTimeout(timer);
  }, [isLoading, isError]);

  const columnDefs = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'name', headerName: '이름', width: 150 },
    { field: 'age', headerName: '나이', width: 100 },
  ];

  return (
    <div style={{ position: 'relative' }}>
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

      {isFetching && !isLoading && (
        <div
          style={{
            position: 'absolute',
            top: 30,
            right: 0,
            padding: '4px 8px',
            background: '#ffffcc',
            zIndex: 10,
            borderRadius: 4,
          }}
        >
          백그라운드 조회 중...
        </div>
      )}

      <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
        <AgGridReact
          columnDefs={columnDefs}
          rowData={data || []}
          animateRows={true}
          overlayLoadingTemplate={isLoading ? '<span>조회중...</span>' : ''}
          overlayNoRowsTemplate={
            !isLoading && data?.length === 0
              ? '<span>조회 결과가 없습니다</span>'
              : ''
          }
        />
      </div>
    </div>
  );
}
