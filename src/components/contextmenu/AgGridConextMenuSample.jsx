import React, { useCallback, useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
ModuleRegistry.registerModules([AllCommunityModule]);

export default function AgGridContextMenu() {
  const [contextPos, setContextPos] = useState(null);
  const [openMenus, setOpenMenus] = useState({});
  const wrapperRef = useRef(null);

  const menuData = {
    label: 'root',
    children: [
      {
        label: '버튼 1',
        children: [
          {
            label: '버튼 1-1',
            children: [
              {
                label: '버튼 1-1-1',
                children: [
                  {
                    label: '버튼 1-1-1-1',
                    action: () => alert('클릭: 버튼 1-1-1-1'),
                  },
                  {
                    label: '버튼 1-1-1-2',
                    action: () => alert('클릭: 버튼 1-1-1-2'),
                  },
                ],
              },
              { label: '버튼 1-1-2', action: () => alert('클릭: 버튼 1-1-2') },
              { label: '버튼 1-1-3', action: () => alert('클릭: 버튼 1-1-3') },
            ],
          },
          {
            label: '버튼 1-2',
            children: [
              { label: '버튼 1-2-1', action: () => alert('클릭: 버튼 1-2-1') },
              { label: '버튼 1-2-2', action: () => alert('클릭: 버튼 1-2-2') },
            ],
          },
        ],
      },
      {
        label: '버튼 2',
        children: [
          {
            label: '버튼 2-1',
            children: [
              {
                label: '버튼 2-1-1',
                children: [
                  {
                    label: '버튼 2-1-1-1',
                    action: () => alert('클릭: 버튼 2-1-1-1'),
                  },
                  {
                    label: '버튼 2-1-1-2',
                    action: () => alert('클릭: 버튼 2-1-1-2'),
                  },
                ],
              },
              { label: '버튼 2-1-2', action: () => alert('클릭: 버튼 2-1-2') },
            ],
          },
        ],
      },
      {
        label: '버튼 3',
        children: [
          {
            label: '버튼 3-1',
            children: [
              { label: '버튼 3-1-1', action: () => alert('클릭: 버튼 3-1-1') },
              { label: '버튼 3-1-2', action: () => alert('클릭: 버튼 3-1-2') },
            ],
          },
        ],
      },
      {
        label: '버튼 4',
        children: [
          {
            label: '버튼 4-1',
            children: [
              { label: '버튼 4-1-1', action: () => alert('클릭: 버튼 4-1-1') },
              { label: '버튼 4-1-2', action: () => alert('클릭: 버튼 4-1-2') },
            ],
          },
        ],
      },
      {
        label: '버튼 5',
        children: [
          {
            label: '버튼 5-1',
            children: [
              { label: '버튼 5-1-1', action: () => alert('클릭: 버튼 5-1-1') },
              { label: '버튼 5-1-2', action: () => alert('클릭: 버튼 5-1-2') },
            ],
          },
        ],
      },
    ],
  };

  const handleMouseEnter = path => {
    setOpenMenus(prev => ({ ...prev, [path]: true }));
  };
  const handleMouseLeave = path => {
    setOpenMenus(prev => ({ ...prev, [path]: false }));
  };

  const NestedMenu = ({ menu, path }) => {
    const hasChildren = !!menu.children;
    const isOpen = !!openMenus[path];
    const nodeRef = useRef(null);
    const [submenuPosition, setSubmenuPosition] = useState({
      left: 0,
      top: '100%',
    });

    // 자식 메뉴 위치 조정: 부모 바로 아래 + 화면 경계 체크
    useEffect(() => {
      if (isOpen && nodeRef.current && hasChildren) {
        const rect = nodeRef.current.getBoundingClientRect();
        const submenuWidth = 200; // 예상 너비
        const submenuHeight = (menu.children?.length || 0) * 30;
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        let left = 0;
        let top = rect.height;

        // 오른쪽으로 넘치면 왼쪽으로 정렬
        if (rect.left + submenuWidth > vw) {
          left = rect.width - submenuWidth;
        }

        // 아래쪽으로 넘치면 위로 올리기
        if (rect.top + rect.height + submenuHeight > vh) {
          top = -submenuHeight;
        }

        setSubmenuPosition({ left, top });
      }
    }, [isOpen, menu.children]);

    return (
      <div
        ref={nodeRef}
        style={{
          position: 'relative',
          display: 'inline-block',
          marginRight: 4,
          background: 'white',
          zIndex: 1000,
        }}
        onMouseEnter={() => handleMouseEnter(path)}
        onMouseLeave={() => handleMouseLeave(path)}
        onClick={e => {
          e.stopPropagation();
          if (menu.action) menu.action();
        }}
      >
        <div
          style={{
            padding: '6px 10px',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            background: isOpen ? '#e0ffe0' : 'white',
          }}
        >
          {menu.label}
        </div>

        {hasChildren && isOpen && (
          <div
            style={{
              position: 'absolute',
              left: submenuPosition.left, // submenuPosition이 자식 위치에 관련있는 값임
              top: submenuPosition.top,
              // left: '100%',
              // top: 0,
              background: 'white',
              border: '1px solid #1e40af',
              boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
              whiteSpace: 'nowrap',
              zIndex: 2000,
            }}
          >
            {menu.children.map((child, i) => (
              <NestedMenu key={i} menu={child} path={`${path}-${i}`} />
            ))}
          </div>
        )}
      </div>
    );
  };

  const ContextMenuWrapper_ = ({ position, onClose }) => {
    const wrapperStyle = {
      position: 'fixed',
      top: position.y,
      left: position.x,
      background: 'white',
      border: '1px solid #1e40af',
      zIndex: 9999,
      padding: 4,
      whiteSpace: 'nowrap',
      display: 'flex',
    };

    const [adjustedPos, setAdjustedPos] = useState(position);

    useEffect(() => {
      if (wrapperRef.current) {
        const rect = wrapperRef.current.getBoundingClientRect();
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        let newX = position.x;
        let newY = position.y;

        if (rect.left + rect.width > vw) {
          newX = vw - rect.width - 8;
        }
        if (rect.top + rect.height > vh) {
          newY = vh - rect.height - 8;
        }

        setAdjustedPos({ x: newX, y: newY });
      }
    }, [position]);

    return (
      <>
        <div
          className="fixed inset-0"
          style={{ zIndex: 9990, background: 'transparent' }}
          onClick={onClose}
        />
        <div
          ref={wrapperRef}
          style={{ ...wrapperStyle, top: adjustedPos.y, left: adjustedPos.x }}
        >
          {menuData.children.map((menu, i) => (
            <NestedMenu key={i} menu={menu} path={`${i}`} />
          ))}
        </div>
      </>
    );
  };

  const ContextMenuWrapper = ({ position, onClose }) => (
    <>
      <div
        className="fixed inset-0"
        style={{ zIndex: 99990 }}
        onClick={onClose}
      />

      <div
        style={{
          position: 'fixed',
          top: position.y,
          left: position.x,
          zIndex: 99999,
          border: '1px solid #1e40af',
          background: 'white',
        }}
      >
        {menuData.children.map((menu, i) => (
          <NestedMenu key={i} menu={menu} path={String(i)} />
        ))}
      </div>
    </>
  );

  const onCellContextMenu = useCallback(params => {
    params.event.preventDefault();
    setContextPos({ x: params.event.clientX, y: params.event.clientY });
  }, []);

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
        <ContextMenuWrapper
          position={contextPos}
          onClose={() => {
            setOpenMenus({});
            setContextPos(null);
          }}
        />
      )}
    </div>
  );
}
