import { Anchor, Button, Divider, Group, PasswordInput, Text, TextInput } from '@mantine/core';
import { useAtom } from 'jotai';
import type { FC } from 'react';
import { Controller, type SubmitHandler, useForm as useReactHookForm, type Validate } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as zod from 'zod';

import { failedResponseSchema, type LoginWithEmailBody, type LoginWithEmailResponse } from '@repo/api-models';

import { signInMutationAtom } from '../model/sign-in-atom';
import { AuthForm } from './AuthForm';

interface SignInFormProps {
  onSuccess?: (response: LoginWithEmailResponse) => void;
  onForgotPassword?: () => void;
  onSignUpClick?: () => void;
}

export const SignInForm: FC<SignInFormProps> = ({ onSuccess, onForgotPassword, onSignUpClick }) => {
  const [{ mutateAsync, status }] = useAtom(signInMutationAtom);

  const isLoading = status === 'pending';

  const { t } = useTranslation();
  const { t: tAuth } = useTranslation('auth');

  const {
    handleSubmit,
    control,
    setError,

    formState: { errors },
  } = useReactHookForm<LoginWithEmailBody>({
    defaultValues: { email: '', password: '' },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const onSubmit: SubmitHandler<LoginWithEmailBody> = async (data) => {
    try {
      const response = await await mutateAsync(data);
      onSuccess?.(response);
    } catch (err) {
      const { data } = await failedResponseSchema.safeParseAsync(err);

      if (!data) return t('error.unknown_error.text');
      setError('root', { message: data.error.message });
    }
  };

  const validateEmail: Validate<string, LoginWithEmailBody> = (value) => {
    if (!value) return t('error.field_is_required.text');
    if (!zod.string().email().safeParse(value).success) return t('error.invalid_email.text');
    return undefined;
  };

  const validatePassword: Validate<string, LoginWithEmailBody> = (value) => {
    if (!value) return t('error.field_is_required.text');
    return undefined;
  };

  return (
    <AuthForm
      description="Please sign in to continue"
      footer={
        <Group justify="center" mt="md">
          <Text size="sm">
            Don't have an account?{' '}
            <Anchor component="button" onClick={onSignUpClick}>
              Create account
            </Anchor>
          </Text>
        </Group>
      }
      title="Welcome back!"
    >
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <TextInput
              aria-label={tAuth('sign_in_form.username_input.aria-label')}
              disabled={isLoading}
              error={errors.email?.message}
              label={tAuth('sign_in_form.username_input.label')}
              placeholder={tAuth('sign_in_form.username_input.placeholder')}
              required
              {...field}
            />
          )}
          rules={{ validate: validateEmail }}
        />

        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <PasswordInput
              aria-label={tAuth('sign_in_form.password_input.aria-label')}
              disabled={isLoading}
              error={errors.password?.message}
              label={tAuth('sign_in_form.password_input.label')}
              mt="md"
              placeholder={tAuth('sign_in_form.password_input.placeholder')}
              required
              {...field}
            />
          )}
          rules={{ validate: validatePassword }}
        />

        {errors.root && (
          <Text className="invalid-text" mt="md" size="sm">
            {errors.root.message}
          </Text>
        )}

        <Divider mt="md" />

        <Button fullWidth loaderProps={{ type: 'dots' }} loading={isLoading} mt="md" type="submit">
          Sign in
        </Button>

        <div className="text-end">
          <Anchor component="button" mt="md" onClick={onForgotPassword} size="sm">
            Forgot password?
          </Anchor>
        </div>
      </form>
    </AuthForm>
  );
};
