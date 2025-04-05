import { Button } from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

export default function BackArrow() {
    const navigate = useNavigate();

    return (
        <div className="back-button">
            <Button
                onClick={() => navigate(-1)}
                radius="xl"
                size="md"
                className="back-arrow-button"
            >
                <div className="back-content">
                    <IconChevronLeft size={18} stroke={2} />
                    <span>Torna indietro</span>
                </div>
            </Button>
        </div>
    );
}
