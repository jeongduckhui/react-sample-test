import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useCallback, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import ContextMenu from './ContextMenu';
import { menuData } from './menuData';

ModuleRegistry.registerModules([AllCommunityModule]);

function AgGridContextMenuTestView() {
  const [contextPos, setContextPos] = useState(null);

  const actions = {
    btn2_2: () => alert('외부 action: 버튼 2-2 클릭'),
    btn6: () => alert('외부 action: 버튼 6 클릭'),
    btn3: () => console.log('외부 action: 버튼 3 클릭'),
    btn7_2_2: () => alert('btn7_2_2 에 action 외부 추가'),
  };

  const onCellContextMenu = useCallback(params => {
    // 웹브라우저의 우클릭 동작을 막기 위해 preventDefault 함수를 작성함.
    // 좌클릭인 경우, preventDefault 함수를 작성할 필요 없음. 우클릭일 때만 작성함.
    params.event.preventDefault();
    setContextPos({ x: params.event.clientX, y: params.event.clientY });
  }, []);

  const closeMenu = () => {
    setContextPos(null);
  };

  const rowData = [
    { id: 1, name: '홍길동', age: 20 },
    { id: 2, name: '김철수', age: 25 },
    { id: 3, name: '이영희', age: 30 },
  ];
  const columnDefs = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'name', headerName: '이름', width: 150 },
    { field: 'age', headerName: '나이', width: 100 },
  ];

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <div
        className="ag-theme-alpine"
        style={{ height: '100%', width: '100%' }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          onCellContextMenu={onCellContextMenu}
          theme="legacy"
        />
      </div>

      {contextPos && (
        <ContextMenu
          position={contextPos}
          onClose={closeMenu}
          menuData={menuData}
          actions={actions}
          maxPerRow={5} // 한 줄에 최대 5개 표시
        />
      )}
    </div>
  );
}

export default AgGridContextMenuTestView;
