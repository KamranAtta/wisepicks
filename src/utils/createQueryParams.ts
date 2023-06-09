export function createQueryParams(obj: Record<string, any>): string {
  const queryParams = Object.entries(obj)
    .map(([key, value]) => {
      if (key === 'searchQuery') {
        key = 'name';
      }
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .join('&');

  return queryParams;
}
