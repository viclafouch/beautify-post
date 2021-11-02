// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function compose<R>(fn1: (a: R) => R, ...fns: Array<(a: R) => R>) {
  return fns.reduce(
    (prevFn, nextFn) =>
      (value): R =>
        prevFn(nextFn(value)),
    fn1
  )
}
