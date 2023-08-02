export const uniqueBy = (list: string[]): string[] => {
  return list.reduce((acc, val) => {
    if (!acc.includes(val)) {
      acc.push(val);
    }
    return acc;
  }, [] as string[]);
};
