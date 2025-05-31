export const when = <T, R, F>(
  value: null | T | undefined,
  onDefined: (value: T) => R,
  onNil?: () => F
) => (value ? onDefined(value) : onNil?.())
