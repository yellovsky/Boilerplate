export const getGlobal = (key: keyof (typeof window)['env']): string => {
  const val =
    typeof window === 'undefined'
      ? // biome-ignore lint/style/noProcessEnv: it's temporary, I hope
        process.env[key]
      : window.env[key];

  if (!val) throw new Error(`Global env "${key}" must be provided`);

  return val;
};
