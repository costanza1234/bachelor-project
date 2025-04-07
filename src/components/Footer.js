import React from 'react';
import BackButton from './BackButton';
import { Grid } from '@mantine/core';
import DownloadButton from './DownloadButton';

export default function Footer() {

    return (
        <div className="footer">
            <Grid align="center">
                <Grid.Col span={3}>
                    <BackButton />
                </Grid.Col>

                <Grid.Col span={8}>
                </Grid.Col>

                <Grid.Col span={1}>
                    <DownloadButton />
                </Grid.Col>
            </Grid>
        </div>

    );
}
