import React from 'react';
import { IconArrowRight, IconSearch } from '@tabler/icons-react';
import {
  ActionIcon,
  TextInput,
  TextInputProps,
  useMantineTheme,
} from '@mantine/core';

export function InputWithButton(TextInputProps) {
  const theme = useMantineTheme();

  return (
    <TextInput
      radius='xl'
      size='md'
      placeholder='Scrivi quello che vuoi cercare...'
      rightSectionWidth={42}
      leftSection={<IconSearch size={18} stroke={1.5} />}
      rightSection={
        <ActionIcon
          size={32}
          radius='xl'
          color={theme.primaryColor}
          variant='filled'
        >
          <IconArrowRight size={18} stroke={1.5} />
        </ActionIcon>
      }
      {...TextInputProps}
    />
  );
}
