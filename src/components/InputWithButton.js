import React from 'react';
import { IconSearch, IconArrowRight } from '@tabler/icons-react';

export function InputWithButton({ value, onChange, onSubmit }) {
  return (
    <div className="input-wrapper">
      <span className="icon search-icon">
        <IconSearch size={18} stroke={1.5} />
      </span>
      <input
        type="text"
        className="text-input"
        placeholder="Scrivi quello che vuoi cercare..."
        value={value}
        onChange={onChange}
      />
      <button className="submit-button" onClick={onSubmit}>
        <IconArrowRight size={18} stroke={1.5} />
      </button>
    </div>
  );
}