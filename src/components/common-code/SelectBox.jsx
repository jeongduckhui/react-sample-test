import React from 'react';

function SelectBox({ name, label, value, onChange, hookData }) {
  const { options } = hookData;

  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      disabled={options.length === 0}
    >
      <option value="">{label}</option>
      {options.map(item => {
        return (
          <option key={item.code} value={item.code}>
            {item.name}
          </option>
        );
      })}
    </select>
  );
}

export default SelectBox;
