import React, { useState } from 'react';
import axios from 'axios';
import useFetchOptions from '../components/common-code/useFetchOptions';
import SelectBox from '../components/common-code/SelectBox';

export default function SearchPage() {
  // 조회조건 상태
  const [filters, setFilters] = useState({
    cond1: '',
    cond2: '',
    cond3: '',
    cond4: '',
    cond5: '',
  });

  // 공통코드 훅 호출
  const cond1 = useFetchOptions('http://localhost:8000/COND1');
  const cond2 = useFetchOptions('http://localhost:8000/COND2');
  const cond3 = useFetchOptions('http://localhost:8000/COND3');
  const cond4 = useFetchOptions('http://localhost:8000/COND4');
  const cond5 = useFetchOptions('http://localhost:8000/COND5');

  const [resultData, setResultData] = useState([]);

  // 조회조건 변경
  const handleChange = e => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // 조회 버튼
  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:8000/search', {
        params: filters,
      });

      setResultData(response.data);
    } catch (err) {
      console.error('조회 실패:', err);
      alert('조회 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <h2>조회 화면</h2>

      <div>
        <SelectBox
          name="cond1"
          label="조건 1"
          value={filters.cond1}
          onChange={handleChange}
          hookData={cond1}
        />

        <SelectBox
          name="cond2"
          label="조건 2"
          value={filters.cond2}
          onChange={handleChange}
          hookData={cond2}
        />

        <SelectBox
          name="cond3"
          label="조건 3"
          value={filters.cond3}
          onChange={handleChange}
          hookData={cond3}
        />

        <SelectBox
          name="cond4"
          label="조건 4"
          value={filters.cond4}
          onChange={handleChange}
          hookData={cond4}
        />

        <SelectBox
          name="cond5"
          label="조건 5"
          value={filters.cond5}
          onChange={handleChange}
          hookData={cond5}
        />

        <button onClick={handleSearch}>조회</button>
      </div>

      {/* 조회 결과 */}
      <h3>조회 결과</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>이름</th>
            <th>값</th>
          </tr>
        </thead>
        <tbody>
          {resultData.length === 0 ? (
            <tr>
              <td colSpan="3" style={{ textAlign: 'center' }}>
                데이터 없음
              </td>
            </tr>
          ) : (
            resultData.map(row => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>{row.value}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
