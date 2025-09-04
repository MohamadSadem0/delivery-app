export function log(ns: string, ...args: unknown[]) {
  // eslint-disable-next-line no-console
  console.log(`[${ns}]`, ...args);
}
export function warn(ns: string, ...args: unknown[]) {
  // eslint-disable-next-line no-console
  console.warn(`[${ns}]`, ...args);
}
export function error(ns: string, ...args: unknown[]) {
  // eslint-disable-next-line no-console
  console.error(`[${ns}]`, ...args);
}

