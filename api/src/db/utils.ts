export const getDrizzleSingleResult = <T>(
  result: Array<T> | T,
): T | undefined => {
  return Array.isArray(result) ? result[0] : undefined;
};
