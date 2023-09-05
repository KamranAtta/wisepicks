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

export function setUndefinedValuesToNull(obj: any): void {
  for (const key in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        setUndefinedValuesToNull(obj[key]); // Recursively traverse nested objects
      } else if (obj[key] === undefined) {
        obj[key] = null;
      }
    }
  }
  return obj;
}
