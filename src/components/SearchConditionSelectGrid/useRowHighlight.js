import { useEffect, useRef, useState } from 'react';

// hooks/useRowHighlight.js
// 행 변경된 부분 강조용
export default function useRowHighlight(rows) {
  const prev = useRef([]);
  const [highlight, setHighlight] = useState(new Set());

  useEffect(() => {
    const changed = new Set();
    rows?.forEach((row, i) => {
      const prevRow = prev.current[i];
      if (JSON.stringify(prevRow) !== JSON.stringify(row)) {
        changed.add(row.id);
      }
    });

    setHighlight(changed);
    prev.current = rows || [];
  }, [rows]);

  return highlight; // highlight.has(row.id) 로 체크
}
