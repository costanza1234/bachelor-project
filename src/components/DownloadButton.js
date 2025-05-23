import { ActionIcon } from '@mantine/core';
import { IconDownload } from '@tabler/icons-react';
import { useGameState } from '../utils/GameStateContext';

/**
 * DownloadButton component renders a button that allows users to download exported game data as a JSON file.
 * 
 * When clicked, the button prompts the user for a password. If the correct password ('log') is entered,
 * it exports the current game state data, converts it to JSON, and triggers a download of the data as a file.
 * 
 * @component
 * @returns {JSX.Element} The rendered download button with an icon.
 * 
 * @example
 * <DownloadButton />
 */
export default function DownloadButton() {

    // Get the exportData function from the game state context
    const { exportData } = useGameState();

    // Handles the download process when the button is clicked
    const handleDownload = () => {

        // Prompt the user for a password before allowing download
        const password = window.prompt('Enter password to download the data.');

        // Check if the entered password is correct
        if (password !== 'log') {
            alert('Incorrect password');
            return;
        }

        // Export the data using the provided function
        console.log('exporting data...');
        const data = exportData();

        // Convert the exported data to a JSON string
        console.log('data exported');
        const jsonData = JSON.stringify(data);

        // Create a Blob from the JSON data
        console.log('making blob');
        const blob = new Blob([ jsonData ], { type: 'application/json' });

        // Log the blob size in MB for debugging
        console.log('blob size in MB:', blob.size / 1024 / 1024);

        // Create a temporary URL for the blob and trigger a download
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'interaction-data.json';
        a.click();
        URL.revokeObjectURL(url); // Clean up the URL object
    };

    // Render the download button with an icon
    return (
        <ActionIcon
            variant="filled"
            aria-label="Download data"
            color='gray'
            onClick={handleDownload}>
            <IconDownload size={14} />
        </ActionIcon>
    );
}
