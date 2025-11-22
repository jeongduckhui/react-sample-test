import { useState, useRef, useEffect } from 'react';
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

  const handleMouseEnter = id => {
    setOpenMenus(prev => ({ ...prev, [id]: true }));
  };
  const handleMouseLeave = id => {
    setOpenMenus(prev => ({ ...prev, [id]: false }));
  };

  const NestedMenu = ({ menu }) => {
    const { id, label, children, action } = menu;
    const hasChildren = Array.isArray(children) && children.length > 0;
    const isOpen = !!openMenus[id];
    const nodeRef = useRef(null);
    const [submenuPos, setSubmenuPos] = useState({ left: 0, top: 0 });

    useEffect(() => {
      if (isOpen && nodeRef.current && hasChildren) {
        const rect = nodeRef.current.getBoundingClientRect();
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        const submenuWidth = nodeRef.current.offsetWidth || 150;
        const submenuHeight =
          children.length * (nodeRef.current.offsetHeight || 30);

        let left = 0;
        let top = rect.height;

        if (rect.left + submenuWidth > vw) {
          left = rect.width - submenuWidth;
        }
        if (rect.top + rect.height + submenuHeight > vh) {
          top = -submenuHeight;
        }

        setSubmenuPos({ left, top });
      }
    }, [isOpen, hasChildren, children]);

    const handleClick = e => {
      e.stopPropagation();
      if (typeof action === 'function') {
        action();
      } else if (actions[id]) {
        actions[id]();
      }
    };

    return (
      <div
        ref={nodeRef}
        style={{
          position: 'relative', // stacking context 최소화
          display: 'inline-block',
          margin: '4px',
          background: 'white',
          flex: `0 0 calc(100% / ${maxPerRow})`,
          boxSizing: 'border-box',
          // 부모 항목은 낮은 z-index로 설정하거나 auto
          zIndex: 'auto',
        }}
        onMouseEnter={() => handleMouseEnter(id)}
        onMouseLeave={() => handleMouseLeave(id)}
        onClick={handleClick}
      >
        <div
          style={{
            padding: '6px 10px',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            background: isOpen ? '#e0ffe0' : 'white',
          }}
        >
          {label}
        </div>

        {hasChildren && isOpen && (
          <div
            style={{
              position: 'absolute',
              left: submenuPos.left,
              top: submenuPos.top,
              background: 'white',
              border: '1px solid #1e40af',
              boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
              whiteSpace: 'nowrap',
              zIndex: 10000, // 매우 높게 줘서 다른 메뉴보다 위에 표시
            }}
          >
            {children.map(child => (
              <NestedMenu key={child.id} menu={child} />
            ))}
          </div>
        )}
      </div>
    );
  };

  const [adjustedPos, setAdjustedPos] = useState({ x: initX, y: initY });
  useEffect(() => {
    if (wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      let newX = initX;
      let newY = initY;

      if (rect.left + rect.width > vw) {
        newX = vw - rect.width - 8;
      }
      if (rect.top + rect.height > vh) {
        newY = vh - rect.height - 8;
      }

      setAdjustedPos({ x: newX, y: newY });
    }
  }, [initX, initY, menuData]);

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
          zIndex: 9999, // wrapper 전체 stacking context
          padding: 4,
          whiteSpace: 'nowrap',
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        {menuData.children.map(menu => (
          <NestedMenu key={menu.id} menu={menu} />
        ))}
      </div>
    </>
  );
}
