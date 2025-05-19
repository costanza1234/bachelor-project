import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, TextInput, Button, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useGameState } from '../utils/GameStateContext';
import languages from '../data/languages.js';

export default function GameStart() {
    const navigate = useNavigate();
    const [ userCode, setUserCode ] = useState("");
    const [ opened, { open, close } ] = useDisclosure(false);

    const {
        gameState,
        update,
        setStartTime,
        shuffleIslandImages,
        getIslands,
        initializeIslands,
        resetGameState,
    } = useGameState();

    const gameLanguage = gameState.gameLanguage;
    const gameText = languages[ gameLanguage ];
    console.log("Game language:", gameLanguage);
    console.log("Game text:", gameText);

    const handleStart = () => {
        open();
    };

    const handleCodeSubmit = () => {
        if (!isValidCode(userCode)) return;

        resetGameState();
        update({ userCode });
        setStartTime(new Date());

        // Shuffle and get islands using context methods
        shuffleIslandImages();
        const islands = getIslands().map((name) => {
            const match = name.match(/\d+/);
            return match ? parseInt(match[ 0 ], 10) : null;
        });

        initializeIslands(islands);

        console.log("Game state initialized and updated.");
        navigate("/MapPage");
    };

    const isValidCode = (code) => /^\d{3,}$/.test(code.trim());

    return (
        <div className="landing">
            <p className="welcomeMessage">
                {gameText.WelcomeMessage}
            </p>

            <Group justify="center">
                <Button
                    className="answer-submit-button"
                    radius="lg"
                    size="xl"
                    variant="filled"
                    color="#6f6f6f"
                    onClick={handleStart}
                >
                    {gameText.StartButton}
                </Button>
            </Group>

            <Modal
                opened={opened}
                onClose={close}
                title={gameText.CodeInputTitle}
                centered
                size="sm"
                radius="md"
                overlayProps={{ blur: 4, backgroundOpacity: 0.55 }}
            >
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
