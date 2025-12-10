import React from 'react';

export default function RowSpanColoredRenderer(props) {
  const { value, colDef } = props;
  const field = colDef.field;
  const { groupKeys, groupColor } = props;

  const isGroupedCol = groupKeys.includes(field);

  // subtotal 이더라도 컬럼별 색으로 칠함
  const bg = isGroupedCol ? groupColor[field] : undefined;

  const style = {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 4,
    fontWeight: isGroupedCol ? 'bold' : 'normal',
    backgroundColor: bg,
  };

  return <div style={style}>{value}</div>;
}
