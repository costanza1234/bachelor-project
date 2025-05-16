import { useLocation } from 'react-router-dom';
import BackButton from './BackButton';
import { Grid } from '@mantine/core';
import DownloadButton from './DownloadButton';
import RestartButton from './RestartButton';

export default function Footer() {
    const location = useLocation();
    const isFinishPage = location.pathname === '/FinishPage';

    return (
        <div className="footer">
            <Grid align="center">
                <Grid.Col span={3}>
                    {isFinishPage ? <RestartButton /> : <BackButton />}
                </Grid.Col>

                <Grid.Col span={8} />

                <Grid.Col span={1}>
                    <DownloadButton />
                </Grid.Col>
            </Grid>
        </div>
    );
}
