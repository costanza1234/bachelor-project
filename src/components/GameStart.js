import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, TextInput, Button, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useGameState } from '../utils/GameStateContext';
import languages from '../data/languages.js';

/**
 * GameStart component renders the landing page for the game, including a welcome message,
 * a start button, and a modal for user code input. Handles game initialization logic such as
 * validating the user code, updating the game context, shuffling islands, and navigating to the map page.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered GameStart component.
 *
 * @example
 * <GameStart />
 *
 * @remarks
 * - Uses Mantine UI components for modal, button, group, and text input.
 * - Relies on game state context for managing game data and navigation.
 * - Validates that the user code is at least 3 digits.
 */
export default function GameStart() {

    // Hook for navigation
    const navigate = useNavigate();

    // State for user code input
    const [ userCode, setUserCode ] = useState("");

    // Mantine hook for modal open/close state
    const [ opened, { open, close } ] = useDisclosure(false);

    // Destructure game state context methods and values
    const {
        gameState,
        update,
        setStartTime,
        shuffleIslandImages,
        getIslands,
        initializeIslands
    } = useGameState();

    const { gameLanguage } = gameState;

    // Get language-specific text
    const gameText = languages[ gameLanguage ];

    // Handler for Start button click: open the modal
    const handleStart = () => {
        open();
    };

    // Handler for submitting the code
    const handleCodeSubmit = () => {

        // Validate code
        if (!isValidCode(userCode)) return;

        // Update context with user code
        update({ userCode });

        // Set game start time
        setStartTime(new Date());

        // Shuffle islands and initialize them in context
        shuffleIslandImages();
        const islands = getIslands().map((name) => {
            const match = name.match(/\d+/);
            return match ? parseInt(match[ 0 ], 10) : null;
        });
        initializeIslands(islands);

        // Navigate to the map page
        navigate("/MapPage");
    };

    // Validate that code is at least 3 digits
    const isValidCode = (code) => /^\d{3,}$/.test(code.trim());

    return (
        <div className="landing">

            {/* Welcome message */}
            <p className="welcomeMessage">
                {gameText.WelcomeMessage}
            </p>

            {/* Start button */}
            <Group justify="center">
                <Button
                    className="startButton"
                    radius="lg"
                    size="xl"
                    variant="filled"
                    color="rgb(34, 194, 218)"
                    onClick={handleStart}
                >
                    {gameText.StartButton}
                </Button>
            </Group>

            {/* Modal for code input */}
            <Modal
                opened={opened}
                onClose={close}
                title={gameText.CodeInputTitle}
                centered
                size="sm"
                radius="md"
                overlayProps={{ blur: 4, backgroundOpacity: 0.55 }}
            >
                {/* Code input field */}
                <TextInput
                    label={gameText.CodeInputLabel}
                    placeholder={gameText.CodeInputPlaceholder}
                    value={userCode}
                    onChange={(e) => setUserCode(e.currentTarget.value)}
                    withAsterisk
                    error={
                        userCode && !isValidCode(userCode)
                            ? gameText.CodeInputError
                            : null
                    }
                />

                {/* Modal action buttons */}
                <Group justify="center" mt="md">
                    <Button
                        onClick={handleCodeSubmit}
                        disabled={!isValidCode(userCode)}
                        color="rgb(71, 159, 203)"
                    >
                        {gameText.CodeInputButton}
                    </Button>
                    <Button variant="default" onClick={close}>
                        {gameText.CodeInputClear}
                    </Button>
                </Group>
            </Modal>
        </div>
    );
}
