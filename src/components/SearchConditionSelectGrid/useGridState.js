import { useEffect } from 'react';

// hooks/useGridState.js
// 그리드 컬럼 상태/정렬/localStorage 저장
export default function useGridState(api, gridId = 'grid-state') {
  useEffect(() => {
    if (!api) return;

    // load
    const saved = localStorage.getItem(gridId);
    if (saved) {
      const parsed = JSON.parse(saved);
      api.setColumnState(parsed.columnState || []);
      api.setSortModel(parsed.sortModel || []);
    }

    const saveState = () => {
      const state = {
        columnState: api.getColumnState(),
        sortModel: api.getSortModel(),
      };
      localStorage.setItem(gridId, JSON.stringify(state));
    };

    api.addEventListener('columnMoved', saveState);
    api.addEventListener('columnResized', saveState);
    api.addEventListener('sortChanged', saveState);

    return () => {
      api.removeEventListener('columnMoved', saveState);
      api.removeEventListener('columnResized', saveState);
      api.removeEventListener('sortChanged', saveState);
    };
  }, [api, gridId]);
}
