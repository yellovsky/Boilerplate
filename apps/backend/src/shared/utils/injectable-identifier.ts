import type { BrandAssociated } from './branded';

export type InjectableIdentifier<TValue> = BrandAssociated<string, 'injectable_identifier', TValue>;
export type IdentifierOf<TIdentifier> = TIdentifier extends InjectableIdentifier<infer TValue> ? TValue : never;
