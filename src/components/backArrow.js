import { IconChevronLeft, IconHeart } from '@tabler/icons-react';
import { Tooltip, ActionIcon } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export default function BackArrow() {
    const navigate = useNavigate();

    return (
        <div>
            <Tooltip label="Torna alla mappa" withArrow>
                <ActionIcon
                    onClick={() => navigate(-1)}
                    size="xl"
                    variant="transparent"
                    radius="xl"
                    style={{ color: 'black' }}
                >
                    <IconChevronLeft size={40} stroke={2} />
                </ActionIcon>
            </Tooltip>
        </div>
    );
}
