import { AuthInvalidEmailOrPasswordError } from './auth-invalid-email-or-password.error';

export class AuthPwdIsNotSetError extends AuthInvalidEmailOrPasswordError {}
