import axios from 'axios';

// axios 호출
export const fetchCommonCode = async ({ code, usedYn, extraParam }) => {
  const { data } = await axios.get('/api/common-code', {
    params: { code, usedYn, extraParam },
  });
  return data;
};

export const fetchGridData = async filters => {
  const { data } = await axios.post('/api/grid-data', filters);
  return data;
};
