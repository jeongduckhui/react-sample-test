import { useQuery } from '@tanstack/react-query';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { fetchCommonCode } from '../api/api';

// components/Filters.jsx
// Suspense-friendly
export default function Filters({
  filters,
  setFilter,
  resetFilters,
  onSearch,
  loading,
}) {
  const select1Query = useQuery(
    ['commonCode', 'CODE1', 'Y', 'P1'],
    () => fetchCommonCode({ code: 'CODE1', usedYn: 'Y', extraParam: 'P1' }),
    { staleTime: 1000 * 60 * 5, cacheTime: 1000 * 60 * 30 },
  );

  const select2Query = useQuery(
    ['commonCode', 'CODE2', 'Y', 'P2'],
    () => fetchCommonCode({ code: 'CODE2', usedYn: 'Y', extraParam: 'P2' }),
    { staleTime: 1000 * 60 * 5, cacheTime: 1000 * 60 * 30 },
  );

  const select3Query = useQuery(
    ['commonCode', 'CODE3', 'Y', 'P3'],
    () => fetchCommonCode({ code: 'CODE3', usedYn: 'Y', extraParam: 'P3' }),
    { staleTime: 1000 * 60 * 5, cacheTime: 1000 * 60 * 30 },
  );

  const select4Query = useQuery(
    ['commonCode', 'CODE4', 'Y', 'P4'],
    () => fetchCommonCode({ code: 'CODE4', usedYn: 'Y', extraParam: 'P4' }),
    { staleTime: 1000 * 60 * 5, cacheTime: 1000 * 60 * 30 },
  );

  const select5Query = useQuery(
    ['commonCode', 'CODE5', 'Y', 'P5'],
    () => fetchCommonCode({ code: 'CODE5', usedYn: 'Y', extraParam: 'P5' }),
    { staleTime: 1000 * 60 * 5, cacheTime: 1000 * 60 * 30 },
  );

  return (
    <div
      style={{ display: 'flex', gap: 10, marginBottom: 10, flexWrap: 'wrap' }}
    >
      {/* Selects */}
      <select
        value={filters.select1}
        onChange={e => setFilter('select1', e.target.value)}
        disabled={loading}
      >
        <option value="">선택</option>
        {select1Query.data?.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <select
        value={filters.select2}
        onChange={e => setFilter('select2', e.target.value)}
        disabled={loading}
      >
        <option value="">선택</option>
        {select2Query.data?.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <select
        value={filters.select3}
        onChange={e => setFilter('select3', e.target.value)}
        disabled={loading}
      >
        <option value="">선택</option>
        {select3Query.data?.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* multi */}
      <select
        multiple
        value={filters.select4}
        onChange={e =>
          setFilter(
            'select4',
            Array.from(e.target.selectedOptions, o => o.value),
          )
        }
        disabled={loading}
        style={{ minWidth: 120, height: 80 }}
      >
        {select4Query.data?.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <select
        multiple
        value={filters.select5}
        onChange={e =>
          setFilter(
            'select5',
            Array.from(e.target.selectedOptions, o => o.value),
          )
        }
        disabled={loading}
        style={{ minWidth: 120, height: 80 }}
      >
        {select5Query.data?.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* 날짜 */}
      <DatePicker
        selected={filters.dateFrom}
        onChange={d => setFilter('dateFrom', d)}
        placeholderText="From"
        disabled={loading}
      />
      <DatePicker
        selected={filters.dateTo}
        onChange={d => setFilter('dateTo', d)}
        placeholderText="To"
        disabled={loading}
      />

      {/* 체크 */}
      <label>
        <input
          type="checkbox"
          checked={filters.check}
          onChange={e => setFilter('check', e.target.checked)}
          disabled={loading}
        />{' '}
        체크
      </label>

      {/* 라디오 */}
      <label>
        <input
          type="radio"
          name="radio"
          value="A"
          checked={filters.radio === 'A'}
          onChange={e => setFilter('radio', e.target.value)}
          disabled={loading}
        />{' '}
        A
      </label>
      <label>
        <input
          type="radio"
          name="radio"
          value="B"
          checked={filters.radio === 'B'}
          onChange={e => setFilter('radio', e.target.value)}
          disabled={loading}
        />{' '}
        B
      </label>

      <button onClick={onSearch} disabled={loading}>
        조회
      </button>
      <button onClick={resetFilters} disabled={loading}>
        초기화
      </button>
    </div>
  );
}
