import { useLocation } from 'react-router-dom';
import BackButton from './BackButton';
import { Grid } from '@mantine/core';
import DownloadButton from './DownloadButton';
import HomeButton from './HomeButton';

/**
 * Footer component that displays navigation and download buttons.
 *
 * - Shows a `HomeButton` if the current route is `/FinishPage`, otherwise shows a `BackButton`.
 * - Always displays a `DownloadButton` on the right.
 * - Uses Mantine's `Grid` for layout.
 *
 * @component
 * @returns {JSX.Element} The rendered footer component.
 */
export default function Footer() {

    // Get the current location object from react-router
    const location = useLocation();

    // Check if the current path is '/FinishPage'
    const isFinishPage = location.pathname === '/FinishPage';

    return (
        <div className="footer">

            {/* Use Mantine's Grid for layout */}
            <Grid align="center">

                {/* First column: Show HomeButton on FinishPage, otherwise show BackButton */}
                <Grid.Col span={3}>
                    {isFinishPage ? <HomeButton /> : <BackButton />}
                </Grid.Col>

                {/* Spacer column */}
                <Grid.Col span={8} />

                {/* Last column: Always show DownloadButton */}
                <Grid.Col span={1}>
                    <DownloadButton />
                </Grid.Col>
            </Grid>
        </div>
    );
}
