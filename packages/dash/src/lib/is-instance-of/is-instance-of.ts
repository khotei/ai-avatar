export const isInstanceOf = <T>(
  value: unknown,
  constructor: new (...args: any[]) => T
): value is T =>
  typeof constructor === "function" &&
  value instanceof constructor