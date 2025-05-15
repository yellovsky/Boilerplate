import * as zod from 'zod';

const envSchema = zod.object({
  APP_ENV: zod
    .enum(['development', 'staging', 'production'])
    .default('development')
    .describe('Application environment. Turn some debug info on or add debug panels when turned on'),
  NODE_ENV: zod.enum(['development', 'production', 'test']).default('development').describe('Just a useful NODE_ENV'),
  REMIX_PUBLIC_API_HOST: zod.string().url().describe('API address'),
  REMIX_PUBLIC_CLIENT_HOST: zod.string().url().describe('Client address to build meta tags like canonicals'),
});

type ServerEnv = zod.infer<typeof envSchema>;
let env: ServerEnv;

/**
 * Initializes and parses given environment variables using zod
 * @returns Initialized env vars
 */
function initEnv() {
  // biome-ignore lint/style/noProcessEnv: parse server process env
  const envData = envSchema.safeParse(process.env);

  if (!envData.success) {
    console.error('❌ Invalid environment variables:', envData.error.flatten().fieldErrors);
    throw new Error('Invalid environment variables');
  }

  env = envData.data;
  Object.freeze(env);

  // Do not log the message when running tests
  if (env.NODE_ENV !== 'test') {
    // biome-ignore lint/suspicious/noConsole: noConsole
    console.log('✅ Environment variables loaded successfully');
  }
  return env;
}

export function getServerEnv() {
  if (env) return env;
  return initEnv();
}

/**
 * Helper function which returns a subset of the environment vars which are safe expose to the client.
 * Dont expose any secrets or sensitive data here.
 * Otherwise you would expose your server vars to the client if you returned them from here as this is
 * directly sent in the root to the client and set on the window.env
 * @returns Subset of the whole process.env to be passed to the client and used there
 */
export function getClientEnv() {
  const serverEnv = getServerEnv();
  return {
    APP_ENV: serverEnv.APP_ENV,
    REMIX_PUBLIC_API_HOST: serverEnv.REMIX_PUBLIC_API_HOST,
    REMIX_PUBLIC_CLIENT_HOST: serverEnv.REMIX_PUBLIC_CLIENT_HOST,
  };
}

type ClientEnvVars = ReturnType<typeof getClientEnv>;

declare global {
  interface Window {
    env: ClientEnvVars;
  }
}
