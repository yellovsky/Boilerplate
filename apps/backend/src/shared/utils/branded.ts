declare const __brand: unique symbol;
type Brand<B> = { [__brand]: B };
type Branded<T, B> = T & Brand<B>;

declare const __association: unique symbol;
type BrandAssociation<B, A> = Branded<{ [__association]: A }, B>;
export type BrandAssociated<T, B, A> = T & BrandAssociation<B, A>;
