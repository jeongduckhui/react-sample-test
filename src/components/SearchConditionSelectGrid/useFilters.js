import { useImmer } from 'use-immer';
import { useCallback } from 'react';

// 조회조건 상태 관리
export default function useFilters() {
  const [filters, updateFilters] = useImmer({
    select1: '',
    select2: '',
    select3: '',
    select4: '',
    select5: '',
    dateFrom: null,
    dateTo: null,
    check: false,
    radio: 'A',
  });

  const setFilter = useCallback(
    (key, value) => {
      updateFilters(draft => {
        draft[key] = value;
      });
    },
    [updateFilters],
  );

  const resetFilters = useCallback(() => {
    updateFilters(draft => {
      draft.select1 = '';
      draft.select2 = '';
      draft.select3 = '';
      draft.select4 = '';
      draft.select5 = '';
      draft.dateFrom = null;
      draft.dateTo = null;
      draft.check = false;
      draft.radio = 'A';
    });
  }, [updateFilters]);

  return [filters, setFilter, resetFilters];
}
