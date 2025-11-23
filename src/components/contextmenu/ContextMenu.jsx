import { useState, useRef, useLayoutEffect, useCallback } from 'react';
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
  const [adjustedPos, setAdjustedPos] = useState({ x: initX, y: initY });

  const openMenu = useCallback(
    id => setOpenMenus(prev => ({ ...prev, [id]: true })),
    [],
  );
  const closeMenu = useCallback(
    id => setOpenMenus(prev => ({ ...prev, [id]: false })),
    [],
  );

  useLayoutEffect(() => {
    if (!wrapperRef.current) return;

    const rect = wrapperRef.current.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    let newX = initX;
    let newY = initY;

    if (rect.left + rect.width > vw) newX = vw - rect.width - 8;
    if (rect.top + rect.height > vh) newY = vh - rect.height - 8;

    setAdjustedPos({ x: newX, y: newY });
  }, [initX, initY]);

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
        style={{ zIndex: 9990 }}
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
          gap: 4,
        }}
      >
        {menuData.children.map(menu => (
          <NestedMenu key={menu.id} menu={menu} {...sharedProps} />
        ))}
      </div>
    </>
  );
}
