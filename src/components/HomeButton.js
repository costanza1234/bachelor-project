import { ActionIcon } from '@mantine/core';
import { IconHome } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

/**
 * HomeButton component renders a button that navigates the user to the home page when clicked.
 *
 * Utilizes the `useNavigate` hook from React Router for navigation.
 * The button is styled using the `ActionIcon` component and displays a home icon.
 *
 * @component
 * @returns {JSX.Element} The rendered home button component.
 */

export default function HomeButton() {
    // Hook for navigation
    const navigate = useNavigate();

    // navigate to the home page when the button is clicked
    const handleClick = () => {
        navigate('/');
    };

    return (
        <ActionIcon
            variant="filled"
            aria-label="Home"
            color='gray'
            onClick={handleClick}>
            <IconHome size={14} />
        </ActionIcon>
    );
}

