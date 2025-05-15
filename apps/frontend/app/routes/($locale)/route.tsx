import type { MetaFunction } from 'react-router';
import { Link, Outlet } from 'react-router';

import { useIsAuthorized } from '@features/auth';

export const meta: MetaFunction = () => {
  return [{ title: 'New Remix App' }, { content: 'Welcome to Remix!', name: 'description' }];
};

export default function Index() {
  const { isAuthorized, status } = useIsAuthorized();

  return (
    <div>
      <div>
        {status === 'pending' ? (
          <span>Loading...</span>
        ) : status === 'success' ? (
          isAuthorized ? (
            <button type="button">logout</button>
          ) : (
            <Link to="/sign-in">sign in</Link>
          )
        ) : null}
      </div>
      Index page
      <Outlet />
    </div>
  );
}
