// groupEngine.js

const NEXT_COL_MAP = {
  col_a: 'col_b',
  col_b: 'col_c',
  col_c: 'col_d',
  col_d: null,
};

export function buildGroupedRows(data, groupKeys) {
  if (!data || data.length === 0) return [];
  if (!groupKeys || groupKeys.length === 0) return data;

  const sample = data[0];
  const aggFields = Object.keys(sample).filter(
    k => k.startsWith('mm_') || k.startsWith('ww_'),
  );

  const sorted = [...data].sort((a, b) => {
    for (const key of groupKeys) {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
    }
    return 0;
  });

  const result = [];

  function addGroup(groupData, depth = 0) {
    if (depth === groupKeys.length) {
      groupData.forEach(r => result.push(r));
      return;
    }

    const key = groupKeys[depth];
    const groups = {};

    groupData.forEach(row => {
      const v = row[key];
      if (!groups[v]) groups[v] = [];
      groups[v].push(row);
    });

    for (const groupValue of Object.keys(groups)) {
      const rows = groups[groupValue];

      // 하위 그룹 재귀
      addGroup(rows, depth + 1);

      const subtotal = { ...rows[0] };
      subtotal.__isTotal = true;
      subtotal.__groupKey = key;
      subtotal[key] = groupValue;

      const neighbor = NEXT_COL_MAP[key];
      if (neighbor) {
        subtotal[neighbor] = `Total ${key}`;
      }

      aggFields.forEach(f => {
        subtotal[f] = rows.reduce((sum, r) => sum + (r[f] ?? 0), 0);
      });

      result.push(subtotal);
    }
  }

  addGroup(sorted, 0);
  return result;
}
