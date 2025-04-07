import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Flex, Box } from '@mantine/core';

export default function Layout({ children }) {
    return (
        <Flex
            direction="column"
            style={{ minHeight: '100%', height: '100vh' }}
        >
            <Header />
            <Box style={{ flexGrow: 1, width: '100%' }}>
                {children}
            </Box>
            <Footer />
        </Flex>
    );
}
