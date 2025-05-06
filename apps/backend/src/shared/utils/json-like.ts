export type JSONLike<TVal> = TVal extends Date
  ? string
  : TVal extends (infer R)[]
    ? JSONLike<R>[]
    : TVal extends object
      ? {
          [K in keyof TVal]: JSONLike<TVal[K]>;
        }
      : TVal | { toJSON(): TVal };
