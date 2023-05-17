/**
 * All helper function realted to array
 */

/**
 * compare both array of type T ,return true if both array contain similar elements in same order
 * @param src
 * @param target
 */
export const isSameArray = <T>(src: Array<T>, target: Array<T>) => {
  try {
    if (src.length !== target.length) return false;

    const sortedArr1 = src.slice().sort();
    const sortedArr2 = target.slice().sort();

    for (let i = 0; i < sortedArr1.length; i++) {
      if (sortedArr1[i] !== sortedArr2[i]) {
        return false;
      }
    }

    return true;
  } catch (err) {
    return false;
  }
};
