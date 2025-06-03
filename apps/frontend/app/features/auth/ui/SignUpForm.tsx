import { Anchor, Button, Checkbox, Group, PasswordInput, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

import type { SignUpFormData } from '../types';
import { AuthForm } from './AuthForm';

interface SignUpFormProps {
  onSuccess?: () => void;
  onSignInClick?: () => void;
}

export function SignUpForm({ onSignInClick }: SignUpFormProps) {
  const form = useForm<SignUpFormData>({
    initialValues: {
      acceptTerms: false,
      confirmPassword: '',
      email: '',
      password: '',
    },
    validate: {
      acceptTerms: (value) => (!value ? 'You must accept the terms and conditions' : null),
      confirmPassword: (value, values) => (value !== values.password ? 'Passwords do not match' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length < 6 ? 'Password should be at least 6 characters' : null),
    },
  });

  const handleSubmit = async (_values: SignUpFormData) => {
    // TODO: Implement sign up
  };

  return (
    <AuthForm
      description="Please fill in your details to create an account"
      footer={
        <Group justify="center" mt="md">
          <Text size="sm">
            Already have an account?{' '}
            <Anchor component="button" onClick={onSignInClick}>
              Sign in
            </Anchor>
          </Text>
        </Group>
      }
      title="Create an account"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput label="Email" placeholder="your@email.com" required {...form.getInputProps('email')} />

        <PasswordInput
          label="Password"
          mt="md"
          placeholder="Your password"
          required
          {...form.getInputProps('password')}
        />

        <PasswordInput
          label="Confirm Password"
          mt="md"
          placeholder="Confirm your password"
          required
          {...form.getInputProps('confirmPassword')}
        />

        <Checkbox
          label={
            <Text size="sm">
              I accept the{' '}
              <Anchor href="#" target="_blank">
                terms and conditions
              </Anchor>
            </Text>
          }
          mt="xl"
          {...form.getInputProps('acceptTerms', { type: 'checkbox' })}
        />

        <Button fullWidth mt="xl" type="submit">
          Create account
        </Button>
      </form>
    </AuthForm>
  );
}
