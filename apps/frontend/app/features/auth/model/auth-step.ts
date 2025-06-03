const AUTH_STEP = ['sign-in', 'sign-up', 'forgot-password'] as const;
export type AuthStep = (typeof AUTH_STEP)[number];
export const isAuthStep = (val: string | null): val is AuthStep => AUTH_STEP.some((v) => v === val);
