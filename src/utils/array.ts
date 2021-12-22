export const groupBy = <T, K extends keyof any>(array: T[], key: (item: T) => K) => {
  return array.reduce((prev, curr) => {
    const groupKey = key(curr);
    (prev[groupKey] = prev[groupKey] || []).push(curr);
    return prev;
  }, {} as Record<K, T[]>);
};
