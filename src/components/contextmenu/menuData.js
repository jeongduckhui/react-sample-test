export const menuData = {
  id: 'root',
  label: 'root',
  children: [
    {
      id: 'btn1',
      label: '버튼 1',
      action: () => {
        alert('메뉴데이터 action: 버튼 1');
      },
    },
    {
      id: 'btn2',
      label: '버튼 2',
      children: [
        {
          id: 'btn2_1',
          label: '버튼 2-1',
          action: () => {
            console.log('메뉴데이터 action: 버튼 2-1');
          },
        },
        {
          id: 'btn2_2',
          label: '버튼 2-2',
          // 외부 actions 로 처리될 수 있음
        },
      ],
    },
    {
      id: 'btn3',
      label: '버튼 3',
      // action 없음
      children: [
        {
          id: 'btn3_1',
          label: '버튼 3-1',
          children: [
            { id: 'btn3_1_1', label: '버튼 3-1-1' },
            { id: 'btn3_1_2', label: '버튼 3-1-2' },
          ],
        },
        {
          id: 'btn3_2',
          label: '버튼 3-2',
          children: [
            { id: 'btn3_2_1', label: '버튼 3-2-1' },
            { id: 'btn3_2_2', label: '버튼 3-2-2' },
          ],
        },
      ],
    },
    {
      id: 'btn4',
      label: '버튼 4',
      action: () => {
        alert('메뉴데이터 action: 버튼 4');
      },
      children: [
        {
          id: 'btn4_1',
          label: '버튼 4-1',
          children: [
            { id: 'btn4_1_1', label: '버튼 4-1-1' },
            { id: 'btn4_1_2', label: '버튼 4-1-2' },
          ],
        },
        {
          id: 'btn4_2',
          label: '버튼 4-2',
          children: [
            { id: 'btn4_2_1', label: '버튼 4-2-1' },
            { id: 'btn4_2_2', label: '버튼 4-2-2' },
          ],
        },
      ],
    },
    {
      id: 'btn5',
      label: '버튼 5',
      // action 없음
      children: [
        {
          id: 'btn5_1',
          label: '버튼 5-1',
          children: [
            { id: 'btn5_1_1', label: '버튼 5-1-1' },
            { id: 'btn5_1_2', label: '버튼 5-1-2' },
          ],
        },
        {
          id: 'btn5_2',
          label: '버튼 5-2',
          children: [
            { id: 'btn5_2_1', label: '버튼 5-2-1' },
            { id: 'btn5_2_2', label: '버튼 5-2-2' },
          ],
        },
      ],
    },
    {
      id: 'btn6',
      label: '버튼 6',
      // action 없음
      children: [
        {
          id: 'btn6_1',
          label: '버튼 6-1',
          children: [
            { id: 'btn6_1_1', label: '버튼 6-1-1' },
            { id: 'btn6_1_2', label: '버튼 6-1-2' },
          ],
        },
        {
          id: 'btn6_2',
          label: '버튼 6-2',
          children: [
            { id: 'btn6_2_1', label: '버튼 6-2-1' },
            { id: 'btn6_2_2', label: '버튼 6-2-2' },
          ],
        },
      ],
    },
    {
      id: 'btn7',
      label: '버튼 7',
      action: () => {
        alert('메뉴데이터 action: 버튼 7');
      },
      children: [
        {
          id: 'btn7_1',
          label: '버튼 7-1',
          children: [
            { id: 'btn7_1_1', label: '버튼 7-1-1' },
            { id: 'btn7_1_2', label: '버튼 7-1-2' },
          ],
        },
        {
          id: 'btn7_2',
          label: '버튼 7-2',
          children: [
            { id: 'btn7_2_1', label: '버튼 7-2-1' },
            { id: 'btn7_2_2', label: '버튼 7-2-2' },
          ],
        },
      ],
    },
    {
      id: 'btn8',
      label: '버튼 8',
      action: () => {
        alert('메뉴데이터 action: 버튼 7');
      },
      children: [
        {
          id: 'btn8_1',
          label: '버튼 8-1',
          children: [
            { id: 'btn8_1_1', label: '버튼 8-1-1' },
            { id: 'btn8_1_2', label: '버튼 8-1-2' },
          ],
        },
        {
          id: 'btn8_2',
          label: '버튼 8-2',
          children: [
            { id: 'btn8_2_1', label: '버튼 8-2-1' },
            { id: 'btn8_2_2', label: '버튼 8-2-2' },
          ],
        },
      ],
    },
    {
      id: 'btn9',
      label: '버튼 9',
      action: () => {
        alert('메뉴데이터 action: 버튼 7');
      },
      children: [
        {
          id: 'btn9_1',
          label: '버튼 9-1',
          children: [
            { id: 'btn9_1_1', label: '버튼 9-1-1' },
            { id: 'btn9_1_2', label: '버튼 9-1-2' },
          ],
        },
        {
          id: 'btn9_2',
          label: '버튼 9-2',
          children: [
            { id: 'btn9_2_1', label: '버튼 9-2-1' },
            { id: 'btn9_2_2', label: '버튼 9-2-2' },
          ],
        },
      ],
    },
    {
      id: 'btn10',
      label: '버튼 10',
      action: () => {
        alert('메뉴데이터 action: 버튼 7');
      },
      children: [
        {
          id: 'btn10_1',
          label: '버튼 10-1',
          children: [
            { id: 'btn10_1_1', label: '버튼 10-1-1' },
            { id: 'btn10_1_2', label: '버튼 10-1-2' },
          ],
        },
        {
          id: 'btn10_2',
          label: '버튼 10-2',
          children: [
            { id: 'btn10_2_1', label: '버튼 10-2-1' },
            {
              id: 'btn10_2_2',
              label: '버튼 10-2-2',
              action: () => {
                alert('btn 10에 action 추가');
              },
            },
          ],
        },
      ],
    },
  ],
};
