import { categoryNames } from './constant';

export function getPathName(url: string){
    for (let i = 0; i < categoryNames.length; i++) {
        if (url.includes(categoryNames[i])) {
          return i;
        }
      }
    return -1; 
}