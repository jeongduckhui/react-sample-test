// ======================================================
// 3) AG Grid 컬럼 정의
// ======================================================

export function buildColumnDefs(toggleExpandState) {
  return [
    { field: 'col_a', headerName: 'col_a', rowGroup: false },
    { field: 'col_b', headerName: 'col_b', rowGroup: false },
    { field: 'col_c', headerName: 'col_c', rowGroup: false },
    { field: 'col_d', headerName: 'col_d', rowGroup: false },

    // --- MM 01 ---
    {
      headerName: 'mm_01',
      field: 'mm_01',
      colId: 'mm_01',
      onCellClicked: () => toggleExpandState('01'),
    },
    ...Array.from({ length: 5 }, (_, i) => ({
      headerName: `ww_01_0${i + 1}`,
      field: `ww_01_0${i + 1}`,
      hide: true, // 처음에는 숨김
      parent: 'mm_01',
    })),

    // --- MM 02 ---
    {
      headerName: 'mm_02',
      field: 'mm_02',
      colId: 'mm_02',
      onCellClicked: () => toggleExpandState('02'),
    },
    ...Array.from({ length: 5 }, (_, i) => ({
      headerName: `ww_02_0${i + 1}`,
      field: `ww_02_0${i + 1}`,
      hide: true,
      parent: 'mm_02',
    })),

    // --- MM 03 ---
    {
      headerName: 'mm_03',
      field: 'mm_03',
      colId: 'mm_03',
      onCellClicked: () => toggleExpandState('03'),
    },
    ...Array.from({ length: 5 }, (_, i) => ({
      headerName: `ww_03_0${i + 1}`,
      field: `ww_03_0${i + 1}`,
      hide: true,
      parent: 'mm_03',
    })),
  ];
}
