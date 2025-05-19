import Header from './Header';
import Footer from './Footer';
import { Box } from '@mantine/core';

export default function Layout({ children }) {
    return (
        <div className="mainContainer"
        >
            <Header />
            <Box style={{ flexGrow: 1, width: '100%' }}>
                {children}
            </Box>
            <Footer />
        </div>
    );
}
