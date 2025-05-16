import { ActionIcon } from '@mantine/core';
import { IconDownload } from '@tabler/icons-react';
import { useGameState } from '../utils/GameStateContext';


export default function DownloadButton() {

    const { exportData } = useGameState();

    const handleDownload = () => {

        const password = window.prompt('Enter password to download the data.');

        if (password !== 'log') {
            alert('Incorrect password');
            return;
        }

        console.log('exporting data...');
        const data = exportData();

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

