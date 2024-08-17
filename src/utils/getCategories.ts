import { talkCategories } from './constant';

export function getCategoriesForTitle(title: string) {
    const categoryData = talkCategories.find(item => item.title === title);
    return categoryData ? categoryData.categories : [];
}