// dummyData.js

const colAValues = ['aaa', 'bbb', 'ccc'];
const colBValues = ['ddd', 'eee', 'fff'];
const colCValues = ['ggg', 'hhh', 'iii'];
const colDValues = ['jjj', 'kkk', 'lll'];

function createMmWwFields() {
  const obj = {};

  for (let mm = 1; mm <= 3; mm++) {
    const mmKey = `mm_${String(mm).padStart(2, '0')}`;
    obj[mmKey] = Math.floor(Math.random() * 900) + 100;

    for (let ww = 1; ww <= 5; ww++) {
      const wwKey = `ww_${String(mm).padStart(2, '0')}_${String(ww).padStart(2, '0')}`;
      obj[wwKey] = Math.floor(Math.random() * 90) + 10;
    }
  }

  return obj;
}

export const dummyData = Array.from({ length: 100 }, (_, idx) => ({
  id: idx + 1,
  col_a: colAValues[Math.floor(Math.random() * colAValues.length)],
  col_b: colBValues[Math.floor(Math.random() * colBValues.length)],
  col_c: colCValues[Math.floor(Math.random() * colCValues.length)],
  col_d: colDValues[Math.floor(Math.random() * colDValues.length)],
  ...createMmWwFields(),
}));
