import { atom, useAtomValue } from 'jotai';
import { atomWithQuery } from 'jotai-tanstack-query';

import { getIsAuthorized } from '../api/check-is-authorized';

const isAuthorizedQueryAtom = atomWithQuery(() => ({
  queryFn: getIsAuthorized,
  queryKey: ['auth', 'check'],
}));

const authorizationStatusAtom = atom((get) => {
  const query = get(isAuthorizedQueryAtom);
  return { isAuthorized: !!query.data?.data.isAuthorized, status: query.status };
});

export const useIsAuthorized = () => useAtomValue(authorizationStatusAtom);
