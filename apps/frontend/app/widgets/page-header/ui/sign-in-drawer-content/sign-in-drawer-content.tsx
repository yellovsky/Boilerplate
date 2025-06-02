import { Input } from '@mantine/core';
import type { ComponentProps, FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Icon } from '@shared/ui/icon';

const TextFieldIcon: FC<ComponentProps<typeof Icon>> = (props) => (
  <Icon {...props} aria-hidden="true" fill="none" focusable="false" height="1rem" role="presentation" width="1rem" />
);

export const SignInDrawerContent: FC = () => {
  const { t: tAuth } = useTranslation('auth');

  return (
    <>
      <Input.Wrapper id="email" label={tAuth('sign_in_form.username_input.label')} required>
        <Input
          aria-label={tAuth('sign_in_form.username_input.aria-label')}
          id="email"
          leftSection={<TextFieldIcon name="envelop" />}
          placeholder={tAuth('sign_in_form.username_input.placeholder')}
        />
      </Input.Wrapper>

      <Input.Wrapper error="Input error" id="password" label={tAuth('sign_in_form.password_input.label')} required>
        <Input
          aria-label={tAuth('sign_in_form.password_input.aria-label')}
          id="password"
          leftSection={<TextFieldIcon name="lock" />}
          placeholder={tAuth('sign_in_form.password_input.placeholder')}
          type="password"
        />
      </Input.Wrapper>
    </>
  );
};
