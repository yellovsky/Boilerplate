import { atom } from 'jotai';
import type { AuthState } from './types';

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const authAtom = atom<AuthState>(initialState);

// For MVP, we'll use static data
export const mockUser = {
  id: '1',
  email: 'test@example.com',
  isVerified: true,
};

// Helper atoms for specific state slices
export const isAuthenticatedAtom = atom(
  (get) => get(authAtom).isAuthenticated
);

export const userAtom = atom(
  (get) => get(authAtom).user
);

export const authErrorAtom = atom(
  (get) => get(authAtom).error
);

export const isLoadingAtom = atom(
  (get) => get(authAtom).isLoading
);