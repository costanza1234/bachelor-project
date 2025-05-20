import { IconSearch, IconArrowRight, IconArrowUp } from '@tabler/icons-react';
import { performSearch, generateResponse } from '../utils/helpers';
import languages from '../data/languages'
import { useGameState } from '../utils/GameStateContext';

export function QueryInput({ isAI, value, onChange, onSubmit, isLoading }) {

  const { gameState } = useGameState();
  const { gameLanguage } = gameState;
  const gameText = languages[ gameLanguage ];

  const handleClick = () => {
    const resultPromise = isAI ? generateResponse(value) : performSearch(value);
    onSubmit(resultPromise);
  };

  return (
    <div className="input-wrapper">
      {isLoading ? (
        <div className="loading-placeholder">
          <span className="loader" />
          <span className="loading-text">
            {isAI ? gameText.loadingTextPlaceholder : ""}
          </span>
        </div>
      ) : (
        <>
          {!isAI && (
            <span className="icon search-icon">
              <IconSearch size={18} stroke={1.5} />
            </span>
          )}
          <input
            type="text"
            className="text-input"
            placeholder={isAI ? gameText.AIPlaceholder : gameText.GooglePlaceholder}
            value={value}
            onChange={onChange}
            disabled={isLoading}
          />
          <button
            className={`submit-button ${isAI ? 'ai-button' : ''}`}
            onClick={handleClick}
            disabled={isLoading}
          >
            {isAI ? (
              <IconArrowUp size={18} stroke={1.5} color="white" />
            ) : (
              <IconArrowRight size={18} stroke={1.5} />
            )}
          </button>
        </>
      )}
    </div>
  );
}
