export const columnsSort = (a: any, b: any) =>
  a?.trim()?.localeCompare(b?.trim(), undefined, { sensitivity: 'base' });
