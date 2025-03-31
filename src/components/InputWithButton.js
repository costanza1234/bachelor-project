import React from 'react';
import { IconSearch, IconArrowRight, IconArrowUp } from '@tabler/icons-react';

import { performSearch, generateResponse } from '../utils/helpers';

export function InputWithButton({ isAI, value, onChange, onSubmit }) {
  const handleSubmit = async () => {
    const result = isAI
      ? await generateResponse(value)
      : await performSearch(value);

    onSubmit(result); // Send result to parent (Question)
  };

  console.log('InputWithButton', isAI, value);

  return (
    <div className="input-wrapper">
      {!isAI && (
        <span className="icon search-icon">
          <IconSearch size={18} stroke={1.5} />
        </span>
      )}
      <input
        type="text"
        className="text-input"
        placeholder={isAI ? "Come posso aiutarti?" : "Cerca con Google..."}
        value={value}
        onChange={onChange}
      />
      <button
        className={`submit-button ${isAI ? 'ai-button' : ''}`}
        onClick={handleSubmit}
      >
        {isAI ? (
          <IconArrowUp size={18} stroke={1.5} color="white" />
        ) : (
          <IconArrowRight size={18} stroke={1.5} />
        )}
      </button>
    </div>
  );
}
