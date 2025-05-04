import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, TextInput, Button, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { shuffleIslands } from "../utils/islandState";
import tracker from "../utils/tracker";

export default function GameStart() {
    const navigate = useNavigate();
    const [ userCode, setUserCode ] = useState("");
    const [ opened, { open, close } ] = useDisclosure(false);

    const handleStart = () => {
        open();
    };

    const handleCodeSubmit = () => {

        if (!isValidCode(userCode)) return;

        tracker.userCode = userCode;
        tracker.startTime = new Date().toISOString();

        // Reset game state
        console.log("Resetting game state...");
        localStorage.removeItem("shuffledIslands");
        // localStorage.removeItem("activeIslandIdx");
        // setActiveIdx(0);

        // Shuffle and store new order
        shuffleIslands();

        const islands = JSON.parse(localStorage.getItem("shuffledIslands")).map((name) => {
            const match = name.match(/\d+/); // Extract the integer part
            return match ? parseInt(match[ 0 ], 10) : null; // Parse to integer
        });

        tracker.initializeIslands(islands);

        // log to check the tracker update
        console.log("tracker updated:", tracker);

        navigate("/MapPage");
    };

    const isValidCode = (code) => {
        return /^\d{3,}$/.test(code.trim()); // at least 3 digits
    };

    return (
        <div className="landing">
            <p className="welcomeMessage">
                Ciao! <br />
                Aspetta che la maestra ti dica di iniziare prima di cliccare sul bottone 😉
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
                    INIZIA A GIOCARE
                </Button>
            </Group>

            <Modal
                opened={opened}
                onClose={close}
                title="Inserisci il tuo codice"
                centered
                size="sm"
                radius="md"
                overlayProps={{ blur: 4, backgroundOpacity: 0.55 }}
            >
                <TextInput
                    label="Codice"
                    placeholder="Inserisci codice (minimo 3 cifre)"
                    value={userCode}
                    onChange={(e) => setUserCode(e.currentTarget.value)}
                    withAsterisk
                    error={userCode && !isValidCode(userCode) ? "Attenzione: Il codice deve avere almeno 3 cifre" : null}
                />

                <Group justify="center" mt="md">
                    <Button onClick={handleCodeSubmit} disabled={!isValidCode(userCode)} color="rgb(71, 159, 203)">
                        Gioca!
                    </Button>
                    <Button variant="default" onClick={close}>
                        Annulla
                    </Button>
                </Group>
            </Modal>
        </div>
    );
}
