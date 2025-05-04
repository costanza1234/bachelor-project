import { ActionIcon } from '@mantine/core';
import { IconDownload } from '@tabler/icons-react';
import tracker from '../utils/tracker';

export default function DownloadButton() {
    const handleDownload = () => {
        const password = window.prompt('Enter password to download the data');

        if (password !== 'log') {
            alert('Incorrect password');
            return;
        }

        const data = tracker.exportData();
        const blob = new Blob([ JSON.stringify(data) ], { type: 'application/json' });
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

