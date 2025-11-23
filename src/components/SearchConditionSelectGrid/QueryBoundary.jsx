import React from 'react';

// Suspense + ErrorBoundary
export function QueryError({ error }) {
  return <div style={{ color: 'red' }}>에러 발생: {error.message}</div>;
}

export default function QueryBoundary({ children }) {
  return (
    <React.Suspense fallback={<div>로딩중...</div>}>{children}</React.Suspense>
  );
}
