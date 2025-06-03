import { atom, useAtomValue } from 'jotai';
import { atomWithQuery } from 'jotai-tanstack-query';

import { getIsAuthorized } from '../api/check-is-authorized';

export const IS_AUTHORIZED_QUERY_KEY = ['auth', 'check'] as const;

const isAuthorizedQueryAtom = atomWithQuery(() => ({
  queryFn: getIsAuthorized,
  queryKey: IS_AUTHORIZED_QUERY_KEY,
}));

const authorizationStatusAtom = atom((get) => {
  const query = get(isAuthorizedQueryAtom);
  return { isAuthorized: !!query.data?.data.isAuthorized, status: query.status };
});

export const useIsAuthorized = () => useAtomValue(authorizationStatusAtom);
