import { useLocation } from 'react-router-dom';
import BackButton from './BackButton';
import { Grid } from '@mantine/core';
import DownloadButton from './DownloadButton';

export default function Footer() {
    const location = useLocation();
    const isFinishPage = location.pathname === '/FinishPage';

    return (
        <div className="footer">
            <Grid align="center">
                <Grid.Col span={3}>
                    {!isFinishPage && <BackButton />}
                </Grid.Col>

                <Grid.Col span={8} />

                <Grid.Col span={1}>
                    <DownloadButton />
                </Grid.Col>
            </Grid>
        </div>
    );
}
