import React, { useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

/*
readonly:
적용 대상: 주로 텍스트 입력 관련 요소(input type="text", textarea, input type="password", input type="search", input type="url", input type="tel")에만 적용됩니다.
기능: 사용자가 키보드로 내용을 수정할 수 없게 만듭니다. 하지만 여전히 포커스를 받을 수 있고, 선택할 수 있으며, 폼 제출 시 데이터가 전송됩니다.

disabled:
적용 대상: 폼의 거의 모든 대화형 요소(input의 모든 타입: text, checkbox, radio, button 등, select, textarea, button 요소, fieldset 등)에 적용할 수 있습니다. 
기능: 해당 요소를 완전히 비활성화합니다. 사용자와의 상호작용(클릭, 포커스, 키보드 입력 등)이 모두 차단되며, 폼 제출 시 데이터가 전송되지 않습니다. 
*/

export default function AllReadonlyDisabledToggle() {
  const [formData, setFormData] = useState({
    text: '',
    select: '',
    date: '',
    checkbox: false,
    range: 50,
    radio: 'A',
    file: null,
  });

  const [readonly, setReadonly] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const onChange = e => {
    const { name, value, type, checked, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : files ? files[0] : value,
    }));
  };

  const toggleReadonly = () => setReadonly(p => !p);
  const toggleDisabled = () => setDisabled(p => !p);

  const columnDefs = useMemo(
    () => [
      { field: 'id', headerName: 'ID' },
      { field: 'name', headerName: 'Name', editable: !readonly && !disabled },
      { field: 'value', headerName: 'Value', editable: !readonly && !disabled },
    ],
    [readonly, disabled],
  );

  const rowData = useMemo(
    () => [
      { id: 1, name: 'AAA', value: 100 },
      { id: 2, name: 'BBB', value: 200 },
      { id: 3, name: 'CCC', value: 300 },
    ],
    [],
  );

  return (
    <div className="w-full p-4 flex flex-col gap-4">
      {/* 조회조건 */}
      <div className="p-4 border rounded-lg flex flex-col gap-4 bg-gray-50">
        <div className="grid grid-cols-3 gap-4">
          <input
            name="text"
            placeholder="Text"
            value={formData.text}
            readOnly={readonly}
            disabled={disabled}
            onChange={onChange}
            className="border p-2"
          />

          <select
            name="select"
            value={formData.select}
            readOnly={readonly}
            disabled={disabled}
            onChange={onChange}
            className="border p-2"
          >
            <option value="">선택</option>
            <option value="A">A</option>
            <option value="B">B</option>
          </select>

          <input
            type="date"
            name="date"
            value={formData.date}
            readOnly={readonly}
            disabled={disabled}
            onChange={onChange}
            className="border p-2"
          />

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="checkbox"
              checked={formData.checkbox}
              readOnly={readonly}
              disabled={disabled}
              onChange={onChange}
            />
            체크박스
          </label>

          <input
            type="range"
            name="range"
            value={formData.range}
            readOnly={readonly}
            disabled={disabled}
            onChange={onChange}
          />

          <div className="flex gap-2 items-center">
            <label>
              <input
                type="radio"
                name="radio"
                value="A"
                checked={formData.radio === 'A'}
                readOnly={readonly}
                disabled={disabled}
                onChange={onChange}
              />
              A
            </label>
            <label>
              <input
                type="radio"
                name="radio"
                value="B"
                checked={formData.radio === 'B'}
                readOnly={readonly}
                disabled={disabled}
                onChange={onChange}
              />
              B
            </label>
          </div>

          <input
            type="file"
            name="file"
            disabled={disabled}
            readOnly={readonly}
            onChange={onChange}
          />
        </div>

        <button
          onClick={() => alert('조회 실행')}
          disabled={disabled}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          조회
        </button>
      </div>

      {/* 토글 버튼 */}
      <div className="flex gap-4">
        <button
          onClick={toggleReadonly}
          className={`px-4 py-2 rounded text-white ${readonly ? 'bg-gray-700' : 'bg-gray-400'}`}
        >
          READONLY {readonly ? 'ON' : 'OFF'}
        </button>
        <button
          onClick={toggleDisabled}
          className={`px-4 py-2 rounded text-white ${disabled ? 'bg-red-700' : 'bg-red-400'}`}
        >
          DISABLED {disabled ? 'ON' : 'OFF'}
        </button>
      </div>

      {/* AG Grid */}
      <div className="ag-theme-alpine" style={{ height: 400 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          suppressClickEdit={readonly || disabled}
          readOnlyEdit={readonly}
        />
      </div>
    </div>
  );
}
