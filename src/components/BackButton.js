import { Button } from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useGameState } from '../utils/GameStateContext';
import languages from '../data/languages.js';

/**
 * BackArrow component renders a button that navigates the user to the previous page.
 * It uses the `useNavigate` hook from react-router-dom for navigation and
 * retrieves the current game language from the game state context to display
 * the localized "Back" text.
 *
 * @function
 * @returns {JSX.Element} A button with a left chevron icon and localized back text.
 */
export default function BackArrow() {

    // navigate is a hook from react-router-dom that allows us to programmatically navigate
    const navigate = useNavigate();

    // useGameState is a custom hook that provides access to the game state context
    const { gameState } = useGameState();

    // gameLanguage is a property of the gameState that indicates the current language
    const { gameLanguage } = gameState;

    // languages is an object that contains strings for different languages
    const gameText = languages[ gameLanguage ];

    return (
        <Button
            onClick={() => navigate(-1)}
            radius="xl"
            size="md"
            variant="subtle"
            color='#6f6f6f'
        >
            <IconChevronLeft size={18} stroke={2} />
            <span>{gameText.BackButton}</span>
        </Button>
    );
}
