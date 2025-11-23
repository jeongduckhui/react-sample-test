import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useFilters from './useFilters';
import Filters from './Filters';
import GridView from './GridView';

const queryClient = new QueryClient();

// 전체 화면
export default function App() {
  const [filters, setFilter, resetFilters] = useFilters();
  const [manualTrigger, setManualTrigger] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSearch = () => {
    setLoading(true);
    setManualTrigger(prev => !prev);
    setTimeout(() => setLoading(false), 100); // debounce 처리 후 UI 잠금 해제
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ padding: 20 }}>
        <Filters
          filters={filters}
          setFilter={setFilter}
          resetFilters={resetFilters}
          onSearch={onSearch}
          loading={loading}
        />
        <GridView filters={filters} manualTrigger={manualTrigger} />
      </div>
    </QueryClientProvider>
  );
}
