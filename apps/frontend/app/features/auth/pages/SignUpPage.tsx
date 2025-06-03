import { Box, Container } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { SignUpForm } from '../ui/SignUpForm';

export default function SignUpPage() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const handleSuccess = () => {
    navigate(`/${i18n.language}`);
  };

  const handleSignInClick = () => {
    navigate(`/${i18n.language}/auth/sign-in`);
  };

  return (
    <Container size="xs">
      <Box py="xl">
        <SignUpForm onSignInClick={handleSignInClick} onSuccess={handleSuccess} />
      </Box>
    </Container>
  );
}
