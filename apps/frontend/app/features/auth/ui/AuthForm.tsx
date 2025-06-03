import { Box, Paper, Stack, Text, Title } from '@mantine/core';
import type { ReactNode } from 'react';

interface AuthFormProps {
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function AuthForm({ title, description, children, footer }: AuthFormProps) {
  return (
    <Paper p="xl" radius="md" withBorder>
      <Title mb={50} mt="md" order={2} ta="center">
        {title}
      </Title>

      {description && (
        <Text c="dimmed" mb="xl" size="sm" ta="center">
          {description}
        </Text>
      )}

      <Stack gap="md">{children}</Stack>

      {footer && (
        <Box mt="xl" ta="center">
          {footer}
        </Box>
      )}
    </Paper>
  );
}
