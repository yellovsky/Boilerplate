import { Button, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import type { ComponentProps, FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Icon } from '@shared/ui/icon';

import styles from './sign-in-drawer-content.module.css';

const TextFieldIcon: FC<ComponentProps<typeof Icon>> = (props) => (
  <Icon {...props} aria-hidden="true" fill="none" focusable="false" height="1rem" role="presentation" width="1rem" />
);

export const SignInDrawerContent: FC = () => {
  const { t: tAuth } = useTranslation('auth');

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    mode: 'uncontrolled',

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  return (
    <form className={styles.holder}>
      <Title className="text-center" order={2}>
        {tAuth('sign_in_form.form_title')}
      </Title>

      <TextInput
        {...form.getInputProps('email')}
        aria-label={tAuth('sign_in_form.username_input.aria-label')}
        data-autofocus
        label={tAuth('sign_in_form.username_input.label')}
        leftSection={<TextFieldIcon name="envelop" />}
        mt="md"
        placeholder={tAuth('sign_in_form.username_input.placeholder')}
      />

      <TextInput
        {...form.getInputProps('password')}
        aria-label={tAuth('sign_in_form.password_input.aria-label')}
        label={tAuth('sign_in_form.password_input.label')}
        leftSection={<TextFieldIcon name="envelop" />}
        mt="md"
        placeholder={tAuth('sign_in_form.password_input.placeholder')}
      />

      <Button mt="md" type="submit">
        {tAuth('sign_in_form.submit_button.text')}
      </Button>
    </form>
  );
};
