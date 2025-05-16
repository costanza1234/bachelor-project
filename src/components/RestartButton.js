import { ActionIcon } from '@mantine/core';
import { IconHome } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';


export default function HomeButton() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/')
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

