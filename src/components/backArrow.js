import { IconChevronLeft } from '@tabler/icons-react';
import { Tooltip, ActionIcon } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export default function BackArrow() {
    const navigate = useNavigate();

    return (
        <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '9vw' }}>
            <Tooltip label="Torna alla mappa" withArrow>
                <ActionIcon
                    onClick={() => navigate(-1)}
                    size="xl"
                    variant="transparent"
                    aria-label="Go back"
                >
                    <IconChevronLeft size={60} />
                </ActionIcon>
            </Tooltip>
        </div>
    );
}
