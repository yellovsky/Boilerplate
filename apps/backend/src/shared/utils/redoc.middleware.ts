import type { NestExpressApplication } from '@nestjs/platform-express';
import type { Response } from 'express';

export const setupRedoc = (app: NestExpressApplication) => {
  app.use('/redoc', (_: unknown, res: Response) => {
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>API Docs</title>
          <meta charset="utf-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <link rel="icon" href="data:,">
        </head>
        <body>
          <redoc spec-url='/swagger-json'></redoc>
          <script src="https://cdn.jsdelivr.net/npm/redoc@next/bundles/redoc.standalone.js"></script>
        </body>
      </html>
    `);
  });
};
