import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function Filters({ conditions, setConditions, onSearch }) {
  const [tempChildren, setTempChildren] = useState([]);
  const [tempGrand, setTempGrand] = useState([]);

  const fetchParents = async () => {
    const res = await axios.get('http://localhost:8000/parents');
    return res.data;
  };

  const fetchChildren = async () => {
    if (!conditions.parent) return [];
    const res = await axios.get('http://localhost:8000/children', {
      params: { parentId: conditions.parent },
    });
    return res.data;
  };

  const fetchGrandChildren = async () => {
    if (!conditions.parent || conditions.children.length === 0) return [];
    const res = await axios.get('http://localhost:8000/grandChildren', {
      params: { parentId: conditions.parent, childIds: conditions.children },
    });
    return res.data;
  };

  const parentQuery = useQuery({
    queryKey: ['parents'],
    queryFn: fetchParents,
  });
  const childrenQuery = useQuery({
    queryKey: ['children', conditions.parent],
    queryFn: fetchChildren,
    enabled: !!conditions.parent,
  });

  const grandQuery = useQuery({
    queryKey: ['grandChildren', conditions.parent, conditions.children],
    queryFn: fetchGrandChildren,
    enabled: !!conditions.parent && conditions.children.length > 0,
  });

  const applyChildren = () => {
    setConditions(draft => {
      draft.children = tempChildren;
      draft.grandChildren = [];
    });
    setTempGrand([]);
  };

  const applyGrand = () => {
    setConditions(draft => {
      draft.grandChildren = tempGrand;
    });
  };

  return (
    <div style={{ border: '1px solid #888', padding: 16 }}>
      <div>
        <label>부모 선택 : </label>
        <select
          value={conditions.parent}
          onChange={e => {
            setConditions(draft => {
              draft.parent = e.target.value;
              draft.children = [];
              draft.grandChildren = [];
            });
            setTempChildren([]);
            setTempGrand([]);
          }}
        >
          <option value="">== 선택 ==</option>
          {parentQuery.data?.map(p => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      {/* 자식 */}
      <div>
        <label>자식 선택 :</label>
        {childrenQuery.data?.map(c => (
          <div key={c.id}>
            <input
              type="checkbox"
              checked={tempChildren.includes(c.id)}
              onChange={e => {
                if (e.target.checked) setTempChildren(prev => [...prev, c.id]);
                else setTempChildren(prev => prev.filter(x => x !== c.id));
              }}
            />
            {c.name}
          </div>
        ))}
        <button onClick={applyChildren}>자식 적용하기</button>
      </div>

      {/* 손자 */}
      <div>
        <label>손자 선택 :</label>
        {grandQuery.data?.map(g => (
          <div key={g.id}>
            <input
              type="checkbox"
              checked={tempGrand.includes(g.id)}
              onChange={e => {
                if (e.target.checked) setTempGrand(prev => [...prev, g.id]);
                else setTempGrand(prev => prev.filter(x => x !== g.id));
              }}
            />
            {g.name}
          </div>
        ))}
        <button onClick={applyGrand}>손자 적용하기</button>
      </div>

      {/* 사용여부 */}
      <div>
        <label>사용여부 :</label>
        <select
          value={conditions.useYn}
          onChange={e =>
            setConditions(draft => {
              draft.useYn = e.target.value;
            })
          }
        >
          <option value="">전체</option>
          <option value="Y">Y</option>
          <option value="N">N</option>
        </select>
      </div>

      <button onClick={onSearch}>조회</button>
    </div>
  );
}
