export function getLocalStorage(key: string) {
  try {
    const itemStr = localStorage.getItem(key);

    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr);
    // const now = new Date();

    // if (now.getTime() > item.expiry) {
    //   localStorage.removeItem(key);
    //   return null;
    // }
    return item.access_token;
  } catch (error) {
    return '';
  }
}

export function removeLocalStorageItem(key: string) {
  return localStorage.removeItem(key);
}
