import type { FC, PropsWithChildren } from 'react';
import { Links, Meta, Scripts, ScrollRestoration } from '@remix-run/react';

export interface AppData {
  env: Record<`REMIX_PUBLIC_${string}`, string>;
}

interface AppProps extends PropsWithChildren, AppData {}

export const App: FC<AppProps> = props => {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />

        <Meta />

        <script
          dangerouslySetInnerHTML={{
            __html: `window.process = { env: ${JSON.stringify(props.env)}}`,
          }}
        />

        <Links />
      </head>
      <body>
        {props.children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
};
