import { Anchor, Button, Group, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

import type { ResetPasswordFormData } from '../types';
import { AuthForm } from './AuthForm';

interface ForgotPasswordFormProps {
  onSuccess?: () => void;
  onBackToSignIn?: () => void;
}

export function ForgotPasswordForm({ onBackToSignIn }: ForgotPasswordFormProps) {
  const form = useForm<ResetPasswordFormData>({
    initialValues: {
      email: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const handleSubmit = async (_values: ResetPasswordFormData) => {
    //  TODO: Implement forgot password
  };

  return (
    <AuthForm
      description="Enter your email address and we'll send you a link to reset your password"
      footer={
        <Group justify="center" mt="md">
          <Text size="sm">
            Remember your password?{' '}
            <Anchor component="button" onClick={onBackToSignIn}>
              Back to sign in
            </Anchor>
          </Text>
        </Group>
      }
      title="Reset your password"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput label="Email" placeholder="your@email.com" required {...form.getInputProps('email')} />

        <Button fullWidth mt="xl" type="submit">
          Send reset link
        </Button>
      </form>
    </AuthForm>
  );
}
