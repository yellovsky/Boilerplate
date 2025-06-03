import { Box, Container } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { SignInForm } from '../ui/SignInForm';

export default function SignInPage() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const handleSuccess = () => {
    navigate(`/${i18n.language}`);
  };

  const handleForgotPassword = () => {
    navigate(`/${i18n.language}/auth/forgot-password`);
  };

  const handleSignUpClick = () => {
    navigate(`/${i18n.language}/auth/sign-up`);
  };

  return (
    <Container size="xs">
      <Box py="xl">
        <SignInForm
          onForgotPassword={handleForgotPassword}
          onSignUpClick={handleSignUpClick}
          onSuccess={handleSuccess}
        />
      </Box>
    </Container>
  );
}
