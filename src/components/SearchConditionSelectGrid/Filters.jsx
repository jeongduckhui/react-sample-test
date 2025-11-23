import { useQuery } from '@tanstack/react-query';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { fetchCommonCode } from './api';

// 조회조건 + 버튼 + UI 잠금
export default function Filters({
  filters,
  setFilter,
  resetFilters,
  onSearch,
  loading,
}) {
  // 각 select에 대해 개별 useQuery
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

  const selectQueries = [
    select1Query,
    select2Query,
    select3Query,
    select4Query,
    select5Query,
  ];

  const selectInfo = [
    { key: 'select1' },
    { key: 'select2' },
    { key: 'select3' },
    { key: 'select4' },
    { key: 'select5' },
  ];

  return (
    <div
      style={{
        display: 'flex',
        gap: 10,
        marginBottom: 10,
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      {selectInfo.map((info, idx) => (
        <select
          key={info.key}
          value={filters[info.key]}
          onChange={e => setFilter(info.key, e.target.value)}
          disabled={loading}
        >
          <option value="">선택</option>
          {selectQueries[idx].data?.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ))}

      <DatePicker
        selected={filters.dateFrom}
        onChange={date => setFilter('dateFrom', date)}
        placeholderText="From"
        disabled={loading}
      />
      <DatePicker
        selected={filters.dateTo}
        onChange={date => setFilter('dateTo', date)}
        placeholderText="To"
        disabled={loading}
      />

      <label>
        <input
          type="checkbox"
          checked={filters.check}
          onChange={e => setFilter('check', e.target.checked)}
          disabled={loading}
        />
        체크
      </label>

      <div>
        <label>
          <input
            type="radio"
            name="radio"
            value="A"
            checked={filters.radio === 'A'}
            onChange={e => setFilter('radio', e.target.value)}
            disabled={loading}
          />
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
          />
          B
        </label>
      </div>

      <button
        onClick={onSearch}
        disabled={loading}
        style={{ padding: '4px 10px' }}
      >
        조회
      </button>
      <button
        onClick={resetFilters}
        disabled={loading}
        style={{ padding: '4px 10px' }}
      >
        초기화
      </button>
    </div>
  );
}
