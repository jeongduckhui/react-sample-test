import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import useFilters from './hooks/useFilters';
import Filters from './components/Filters';
import GridView from './components/GridView';
import QueryBoundary from './components/QueryBoundary';
import AutoFetchToggle from './components/AutoFetchToggle';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { suspense: true },
  },
});

export default function App() {
  const [filters, setFilter, resetFilters] = useFilters();
  const [manualTrigger, setManualTrigger] = useState(0);
  const [loading, setLoading] = useState(false);
  const [autoFetch, setAutoFetch] = useState(true);

  const onSearch = () => {
    setLoading(true);
    setManualTrigger(c => c + 1);
    setTimeout(() => setLoading(false), 150);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ padding: 20 }}>
        <h2>조회 조건</h2>

        <Filters
          filters={filters}
          setFilter={setFilter}
          resetFilters={resetFilters}
          onSearch={onSearch}
          loading={loading}
        />

        <AutoFetchToggle autoFetch={autoFetch} setAutoFetch={setAutoFetch} />

        <h2 style={{ marginTop: 20 }}>Grid</h2>

        <QueryBoundary>
          <GridView
            filters={filters}
            manualTrigger={manualTrigger}
            autoFetch={autoFetch}
          />
        </QueryBoundary>
      </div>
    </QueryClientProvider>
  );
}
