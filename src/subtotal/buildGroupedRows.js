// buildGroupedRows.js

export function buildGroupedRows(rows, groupKeys) {
  if (!groupKeys?.length) return rows;

  const groupMap = {};

  rows.forEach(row => {
    let key = groupKeys.map(g => row[g]).join('||');
    if (!groupMap[key]) groupMap[key] = [];
    groupMap[key].push(row);
  });

  const result = [];

  Object.entries(groupMap).forEach(([key, groupRows]) => {
    groupRows.forEach(r => result.push(r));

    const subtotal = { __isTotal: true };

    groupKeys.forEach((g, idx) => {
      subtotal[g] = idx === groupKeys.length - 1 ? `Total col_${g}` : '';
    });

    groupRows.forEach(r => {
      Object.keys(r).forEach(col => {
        if (!subtotal[col] && typeof r[col] === 'number') {
          subtotal[col] = (subtotal[col] || 0) + r[col];
        }
      });
    });

    //
    // subtotal 라벨 오른쪽으로 색이 가도록 라벨 기준 컬럼 저장
    //
    subtotal.__totalLabel = groupKeys[groupKeys.length - 1];

    result.push(subtotal);
  });

  return result;
}
