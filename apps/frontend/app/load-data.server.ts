import { AppData } from './app/app';
import { GetLoaderData } from './shared/lib/loader';

const getPublicVariables = (): Record<`REMIX_PUBLIC_${string}`, string> =>
  Object.entries(process.env)
    .filter(([key]) => key.startsWith('REMIX_PUBLIC_'))
    .reduce((accum, [key, val]) => ({ ...accum, [key]: val }), {});

export type RootLoaderData = AppData;

export const getRootLoaderData: GetLoaderData<RootLoaderData> = async (
  _apiClient,
  _queryClient,
  //   { request },
) => {
  const publicVariables = getPublicVariables();
  return {
    env: publicVariables,
  } satisfies RootLoaderData;
};
