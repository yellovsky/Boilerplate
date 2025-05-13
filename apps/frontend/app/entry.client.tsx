import { hydrateRoot } from 'react-dom/client';
import { RemixBrowser } from '@remix-run/react';
import { startTransition } from 'react';

startTransition(() => {
  hydrateRoot(document, <RemixBrowser />);
});
