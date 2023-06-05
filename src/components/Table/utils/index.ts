export const columnsSort = (a: string, b: string) =>
  a?.trim()?.localeCompare(b?.trim(), undefined, { sensitivity: 'base' });
