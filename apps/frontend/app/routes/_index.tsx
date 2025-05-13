import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [{ title: 'New Remix App' }, { content: 'Welcome to Remix!', name: 'description' }];
};

export default function Index() {
  return <div>Index page</div>;
}
