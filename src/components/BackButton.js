import { Button } from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useGameState } from '../utils/GameStateContext';
import languages from '../data/languages.js';

export default function BackArrow() {
    const navigate = useNavigate();
    const { gameState } = useGameState();
    const gameLanguage = gameState.gameLanguage;
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
