import { useState, useRef, useEffect, useCallback } from 'react';
import NestedMenu from './NestedMenu';
import { menuData as defaultMenuData } from './menuData';

export default function ContextMenu({
  position,
  onClose,
  menuData = defaultMenuData,
  actions = {},
  maxPerRow = 6,
}) {
  const [openMenus, setOpenMenus] = useState({});
  const wrapperRef = useRef(null);
  const { x: initX, y: initY } = position;

  // open/close 핸들러 메모이제이션
  const openMenu = useCallback(
    id => setOpenMenus(prev => ({ ...prev, [id]: true })),
    [],
  );
  const closeMenu = useCallback(
    id => setOpenMenus(prev => ({ ...prev, [id]: false })),
    [],
  );

  const [adjustedPos, setAdjustedPos] = useState({ x: initX, y: initY });

  // 위치 조정 로직
  useEffect(() => {
    if (!wrapperRef.current) return;

    const rect = wrapperRef.current.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    let newX = initX;
    let newY = initY;

    if (rect.left + rect.width > vw) newX = vw - rect.width - 8;
    if (rect.top + rect.height > vh) newY = vh - rect.height - 8;

    // Error: Calling setState synchronously within an effect can trigger ~~
    // 위 에러는 로컬 StrictMode에서만 발생하고 프로덕션에서는 문제 없음.
    // 에러를 없애고 싶으면 useEffect -> useLayoutEffect로 변경하면 됨.
    setAdjustedPos({ x: newX, y: newY });
  }, [initX, initY, menuData]);

  const sharedProps = {
    openMenus,
    openMenu,
    closeMenu,
    actions,
    maxPerRow,
  };

  return (
    <>
      <div
        className="fixed inset-0"
        style={{ zIndex: 9990, background: 'transparent' }}
        onClick={onClose}
      />

      <div
        ref={wrapperRef}
        style={{
          position: 'fixed',
          top: adjustedPos.y,
          left: adjustedPos.x,
          background: 'white',
          border: '1px solid #1e40af',
          zIndex: 9999,
          padding: 4,
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        {menuData.children.map(menu => (
          <NestedMenu key={menu.id} menu={menu} {...sharedProps} />
        ))}
      </div>
    </>
  );
}
