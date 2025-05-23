import { IconSearch, IconArrowRight, IconArrowUp } from '@tabler/icons-react';
import { performSearch, generateResponse } from '../utils/helpers';
import languages from '../data/languages'
import { useGameState } from '../utils/GameStateContext';

/**
 * QueryInput component renders an input field with a submit button, supporting both AI and non-AI modes.
 * Displays a loading state when processing, and adapts placeholder and button icon based on the mode.
 *
 * @param {Object} props - Component props.
 * @param {boolean} props.isAI - Determines if the input is in AI mode.
 * @param {string} props.value - The current value of the input field.
 * @param {function} props.onChange - Callback for input value changes.
 * @param {function} props.onSubmit - Callback when the submit button is clicked. Receives a Promise as argument.
 * @param {boolean} props.isLoading - Indicates if a loading state should be shown.
 * @returns {JSX.Element} The rendered QueryInput component.
 */

export function QueryInput({ isAI, value, onChange, onSubmit, isLoading }) {

  const { gameState } = useGameState();
  const { gameLanguage } = gameState;
  const gameText = languages[ gameLanguage ];

  // Function to handle the click event
  // If isAI is true, it generates a response using the generateResponse function
  // Otherwise, it performs a search using the performSearch function
  // The result is passed to the onSubmit function
  const handleClick = () => {
    const resultPromise = isAI ? generateResponse(value) : performSearch(value);
    onSubmit(resultPromise);
  };

  return (
    <div className="input-wrapper">
      {isLoading ?
        (
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
