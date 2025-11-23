import { useState, useRef, useEffect } from 'react';

export default function NestedMenu({
  menu,
  openMenus,
  openMenu,
  closeMenu,
  actions,
  maxPerRow,
}) {
  const { id, label, children, action } = menu;
  const hasChildren = Array.isArray(children) && children.length > 0;
  const isOpen = !!openMenus[id];
  const nodeRef = useRef(null);
  const [submenuPos, setSubmenuPos] = useState({ left: 0, top: 0 });

  const handleClick = e => {
    e.stopPropagation();
    if (typeof action === 'function') action();
    else if (actions[id]) actions[id]();
  };

  // 매번 handleMouseEnter/Leave 넘기지 않도록 최적화
  const onEnter = () => openMenu(id);
  const onLeave = () => closeMenu(id);

  // 서브메뉴 위치 계산
  useEffect(() => {
    if (!isOpen || !nodeRef.current || !hasChildren) return;

    const rect = nodeRef.current.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const submenuWidth = nodeRef.current.offsetWidth || 150;
    const submenuHeight =
      children.length * (nodeRef.current.offsetHeight || 30);

    let left = 0;
    let top = rect.height;

    if (rect.left + submenuWidth > vw) left = rect.width - submenuWidth;
    if (rect.top + rect.height + submenuHeight > vh) top = -submenuHeight;

    // Error: Calling setState synchronously within an effect can trigger ~~
    // 위 에러는 로컬 StrictMode에서만 발생하고 프로덕션에서는 문제 없음.
    // 에러를 없애고 싶으면 useEffect -> useLayoutEffect로 변경하면 됨.
    setSubmenuPos({ left, top });
  }, [isOpen, hasChildren, children]);

  return (
    <div
      ref={nodeRef}
      style={{
        position: 'relative',
        display: 'inline-block',
        margin: '4px',
        background: 'white',
        flex: `0 0 calc(100% / ${maxPerRow})`,
        boxSizing: 'border-box',
        zIndex: 'auto',
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
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
            zIndex: 10000,
          }}
        >
          {children.map(child => (
            <NestedMenu
              key={child.id}
              menu={child}
              openMenus={openMenus}
              openMenu={openMenu}
              closeMenu={closeMenu}
              actions={actions}
              maxPerRow={maxPerRow}
            />
          ))}
        </div>
      )}
    </div>
  );
}
