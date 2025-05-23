import Header from './Header';
import Footer from './Footer';

import { Box } from '@mantine/core';

/**
 * Layout component that provides a consistent page structure with a header, main content area, and footer.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - The content to be rendered within the layout.
 * @returns {JSX.Element} The rendered layout with header, main content, and footer.
 */
export default function Layout({ children }) {

    return (
        // Main container div for the layout
        <div className="mainContainer">

            {/* Render the Header at the top */}
            <Header />

            {/* Box component to wrap the main content and allow it to grow */}
            <Box style={{ flexGrow: 1, width: '100%' }}>

                {/* Render any child components passed to Layout */}
                {children}
            </Box>

            {/* Render the Footer at the bottom */}
            <Footer />
        </div>
    );
}
