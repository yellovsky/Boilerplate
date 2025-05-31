import { useTranslation } from 'react-i18next';

export const handle = {
  i18n: 'auth',
};

export default function SignInRoute() {
  const { t: tAuth } = useTranslation('auth');

  return (
    <div>
      <h1>{tAuth('sign_in_form.form_title')}</h1>

      <label htmlFor="username">{tAuth('sign_in_form.username_input.label')}</label>
      <input
        aria-label={tAuth('sign_in_form.username_input.aria-label')}
        id="username"
        placeholder={tAuth('sign_in_form.username_input.placeholder')}
        title={tAuth('sign_in_form.username_input.title')}
      />
    </div>
  );
}
