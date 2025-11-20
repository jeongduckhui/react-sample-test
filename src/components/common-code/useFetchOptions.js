// hooks/useFetchOptions.js
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useFetchOptions(url, params = {}) {
  const [options, setOptions] = useState([]);

  // params 변화를 감지하기 위해 문자열 변환
  // 객체일 경우 값은 같은데 참조값이 다르면 재호출됨.
  // lodash 로 비교해도 될 것 같은데 테스트라 그냥 문자열로만 변환
  const paramsKey = JSON.stringify(params);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const res = await axios.get(url, { params });
        setOptions(res.data || []);
      } catch (err) {
        console.error('옵션 조회 실패:', err);
      }
    };

    fetchOptions();
  }, [url, paramsKey]);

  return { options };
}
