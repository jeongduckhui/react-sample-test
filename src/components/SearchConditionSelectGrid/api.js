import axios from 'axios';

// api/api.js
// 🔥 공통코드 조회 (단일/멀티 동일 구조)
export const fetchCommonCode = async ({ code, usedYn, extraParam }) => {
  const { data } = await axios.get('/api/common-code', {
    params: { code, usedYn, extraParam },
  });
  return data;
};

// 🔥 Grid 조회
export const fetchGridData = async filters => {
  const { data } = await axios.post('/api/grid-data', filters);
  return data;
};
