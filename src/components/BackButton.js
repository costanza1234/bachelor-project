import { Button } from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

export default function BackArrow() {
    const navigate = useNavigate();

    return (
        <Button
            onClick={() => navigate(-1)}
            radius="xl"
            size="md"
            variant="subtle"
            color='#6f6f6f'
        >
            <IconChevronLeft size={18} stroke={2} />
            <span>Torna indietro</span>
        </Button>
    );
}
