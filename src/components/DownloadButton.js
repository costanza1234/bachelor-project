import { ActionIcon } from '@mantine/core';
import { IconDownload } from '@tabler/icons-react';
import gameState from '../utils/gameState';

export default function DownloadButton() {

    const handleDownload = () => {
        const password = window.prompt('Enter password to download the data. Once this is done, the game will be reset and no further changes will be saved. After you are done, go to the home page to start a new game. ');

        if (password !== 'log') {
            alert('Incorrect password');
            return;
        }

        console.log('exporting data...');
        const data = gameState.exportData();

        console.log('data exported');
        const jsonData = JSON.stringify(data);

        console.log('making blob');
        const blob = new Blob([ jsonData ], { type: 'application/json' });

        console.log('blob size in MB:', blob.size / 1024 / 1024);

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'interaction-data.json';
        a.click();
        URL.revokeObjectURL(url);

        localStorage.removeItem('gameState');
        console.log('gameState removed from localStorage');
    };

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

