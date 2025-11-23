import { useState, useRef, useLayoutEffect } from 'react';

export default function NestedMenu({
  menu,
  openMenus,
  openMenu,
  closeMenu,
  actions,
  maxPerRow,
}) {
  const isOpen = openMenus[menu.id];
  const nodeRef = useRef(null);
  const wrapperRef = useRef(null);

  const hasChildren = menu.children && menu.children.length > 0;

  const runAction = () => {
    if (menu.action) {
      if (typeof menu.action === 'function') menu.action();
      else if (actions[menu.action]) actions[menu.action]();
    }
  };

  const onEnter = () => openMenu(menu.id);
  const onLeave = () => closeMenu(menu.id);

  const [submenuPos, setSubmenuPos] = useState({ left: 0, top: 0 });

  useLayoutEffect(() => {
    if (!isOpen || !wrapperRef.current || !nodeRef.current) return;

    const parentRect = nodeRef.current.getBoundingClientRect();
    const submenuRect = wrapperRef.current.getBoundingClientRect();

    let left = parentRect.left;
    let top = parentRect.bottom + 2;

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    if (left + submenuRect.width > vw) left = vw - submenuRect.width - 6;
    if (top + submenuRect.height > vh)
      top = parentRect.top - submenuRect.height - 2;

    setSubmenuPos({ left, top });
  }, [isOpen]);

  return (
    <div
      ref={nodeRef}
      style={{
        position: 'relative',
        background: 'white',
        border: '1px solid #ccc',
        borderRadius: 4,
        height: 32,
        lineHeight: '32px',
        padding: '0 10px',
        cursor: 'pointer',
        boxSizing: 'border-box',
        flex: `0 0 calc((100% - ${4 * (maxPerRow - 1)}px) / ${maxPerRow})`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={runAction}
    >
      {menu.label}

      {hasChildren && isOpen && (
        <div
          ref={wrapperRef}
          style={{
            position: 'fixed',
            top: submenuPos.top,
            left: submenuPos.left,
            background: 'white',
            border: '1px solid #1e40af',
            zIndex: 99999,
            padding: 4,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 4,
            minWidth: 'unset', // 부모 버튼 크기와 동일하게 만들기 위해 제거
            width: 'auto', // 자식 버튼이 부모 버튼의 flex 너비를 그대로 적용받음
          }}
        >
          {menu.children.map(child => (
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
